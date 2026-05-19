import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import Header from './Header';
import { describe, it, expect } from 'vitest';

const mockCart = {
  items: [
    {
      id: 1,
      name: 'Broccoli',
      price: 120,
      quantity: 2,
      image: 'test.jpg',
      category: 'vegetables',
      currency: '$'
    }
  ],
  totalQuantity: 2,
  totalPrice: 240
};

describe('Компонент "Header"', () => {
  const renderWithProvider = (component: React.ReactNode) => {
    return render(
      <MantineProvider>
        {component}
      </MantineProvider>
    );
  };

  it('отображаеет бейдж с правильным количеством товаров', () => {
    renderWithProvider(
      <Header 
        cart={mockCart}
        onUpdateQuantity={() => {}}
        onRemoveFromCart={() => {}}
      />
    );
    
    const badge = screen.getByText('2');
    expect(badge).toBeInTheDocument();
  });


  it('при нажатии на кнопку корзины открывается popup', async () => {
    renderWithProvider(
      <Header 
        cart={mockCart}
        onUpdateQuantity={() => {}}
        onRemoveFromCart={() => {}}
      />
    );
    
    const cartButton = screen.getByRole('button', { name: /cart/i });
    fireEvent.click(cartButton);
    
    await waitFor(() => {
      expect(screen.getByText('Broccoli')).toBeInTheDocument();
         const prices = screen.getAllByText(/\$\d+\.\d{2}/);
      expect(prices.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });
  });


 
