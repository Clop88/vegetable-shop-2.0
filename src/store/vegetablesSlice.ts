import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, CartItem, CartState } from '../types';

const PRODUCTS_API_URL = 'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

interface VegetablesState {
  products: Product[];
  loading: boolean;
  error: string | null;
  cart: CartState;
}

const initialCartState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const loadCartFromLocalStorage = (): CartState => {
  const savedCart = localStorage.getItem('vegetable-cart');
  return savedCart ? JSON.parse(savedCart) : initialCartState;
};

const initialState: VegetablesState = {
  products: [],
  loading: false,
  error: null,
  cart: loadCartFromLocalStorage(),
};

export const fetchProducts = createAsyncThunk(
  'vegetables/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(PRODUCTS_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Product[] = await response.json();
      const processedProducts = data.map(product => ({
        ...product,
        inStock: true,
        description: product.description || `Свежие ${product.name.toLowerCase()}`
      }));
      return processedProducts;
    } catch (err) {
      const errorMessage = err instanceof Error
        ? `Ошибка загрузки товаров: ${err.message}`
        : 'Произошла неизвестная ошибка при загрузке товаров';
      return rejectWithValue(errorMessage);
    }
  }
);

const recalculateCartTotals = (items: CartItem[]): { totalQuantity: number; totalPrice: number } => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalQuantity, totalPrice };
};

const vegetablesSlice = createSlice({
  name: 'vegetables',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ item: Omit<CartItem, 'quantity'>; quantity: number }>) => {
      const { item, quantity } = action.payload;
      const existingItemIndex = state.cart.items.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        state.cart.items[existingItemIndex].quantity += quantity;
      } else {
        state.cart.items.push({
          ...item,
          quantity,
        });
      }
      
      const { totalQuantity, totalPrice } = recalculateCartTotals(state.cart.items);
      state.cart.totalQuantity = totalQuantity;
      state.cart.totalPrice = totalPrice;
      
      localStorage.setItem('vegetable-cart', JSON.stringify(state.cart));
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      if (quantity < 1) return;
      
      state.cart.items = state.cart.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      const { totalQuantity, totalPrice } = recalculateCartTotals(state.cart.items);
      state.cart.totalQuantity = totalQuantity;
      state.cart.totalPrice = totalPrice;
      
      localStorage.setItem('vegetable-cart', JSON.stringify(state.cart));
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart.items = state.cart.items.filter(item => item.id !== action.payload);
      
      const { totalQuantity, totalPrice } = recalculateCartTotals(state.cart.items);
      state.cart.totalQuantity = totalQuantity;
      state.cart.totalPrice = totalPrice;
      
      localStorage.setItem('vegetable-cart', JSON.stringify(state.cart));
    },
    
    clearCart: (state) => {
      state.cart = initialCartState;
      localStorage.setItem('vegetable-cart', JSON.stringify(initialCartState));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = vegetablesSlice.actions;


export default vegetablesSlice.reducer;