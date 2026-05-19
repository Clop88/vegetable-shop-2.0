export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    currency: string;
    image: string;
    description?: string;
    inStock?: boolean;
    quantity?: number;
    bestseller?: boolean;
    featured?: boolean;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
    currency: string;
}

export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

export type ApiResponse = Product[];