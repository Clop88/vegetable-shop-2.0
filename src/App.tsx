import { useEffect } from 'react';
import { AppShell, Container } from '@mantine/core';
import Header from './components/Header/Header';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchProducts, addToCart, updateQuantity, removeFromCart } from './store/vegetablesSlice';
import './styles/global.css';
import type { Product } from './types';

function App() {
  const dispatch = useAppDispatch();
  const { products, loading, error, cart } = useAppSelector((state) => state.vegetables);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product, quantity: number) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      currency: product.currency
    };
    dispatch(addToCart({ item: cartItem, quantity }));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleRetry = () => {
    dispatch(fetchProducts());
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
    >
      <AppShell.Header>
        <Header
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
        />
      </AppShell.Header>
      <AppShell.Main>
        <Container size="xl" pt={20}>
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            onAddToCart={handleAddToCart}
            onRetry={handleRetry}
          />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;