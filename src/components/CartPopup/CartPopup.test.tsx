import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import CartPopup from './CartPopup';
import { describe, it, expect, vi } from 'vitest';


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
    },
    {
      id: 2,
      name: 'Cauliflower',
      price: 60,
      quantity: 1,
      image: 'test2.jpg',
      category: 'vegetables',
      currency: '$'
    }
  ],
  totalQuantity: 3,
  totalPrice: 300
};


describe('Компонент "CartPopup"', () => {
  const renderWithProvider = (component: React.ReactNode) => {
    return render(
      <MantineProvider>
        {component}
      </MantineProvider>
    );
  };


  it('корректно отображает товары в корзине', () => {
    renderWithProvider(
      <CartPopup 
        cart={mockCart}
        onUpdateQuantity={() => {}}
        onRemoveFromCart={() => {}}
        onClose={() => {}}
      />
    );
    
    expect(screen.getByText('Broccoli')).toBeInTheDocument();
    expect(screen.getByText('Cauliflower')).toBeInTheDocument();
    expect(screen.getByText('$240.00')).toBeInTheDocument();
    expect(screen.getByText('$60.00')).toBeInTheDocument();
    expect(screen.getByText('$300.00')).toBeInTheDocument();

    const quantityElements = screen.getAllByText(/^[0-9]+$/);
    expect(quantityElements).toHaveLength(2);
    expect(quantityElements[0]).toHaveTextContent('2');
    expect(quantityElements[1]).toHaveTextContent('1');
  });


  it('отображается сообщение о пустой корзине, когда корзина пуста', () => {
    const emptyCart = {
      items: [],
      totalQuantity: 0,
      totalPrice: 0
    };

    renderWithProvider(
      <CartPopup 
        cart={emptyCart}
        onUpdateQuantity={() => {}}
        onRemoveFromCart={() => {}}
        onClose={() => {}}
      />
    );
    
    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
  });


  it('вызывает onUpdateQuantity при нажатии кнопки "плюс"', () => {
    const mockUpdateQuantity = vi.fn();
    
    renderWithProvider(
      <CartPopup 
        cart={mockCart}
        onUpdateQuantity={mockUpdateQuantity}
        onRemoveFromCart={() => {}}
        onClose={() => {}}
      />
    );
    
    const plusButtons = document.querySelectorAll('button');
    const plusButton = Array.from(plusButtons).find(
      button => button.innerHTML.includes('plus') || button.querySelector('svg[data-icon="plus"]')
    );
    
    if (plusButton) {
      fireEvent.click(plusButton);
      expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
    }
  });


  it('вызывает функцию "onRemoveFromCart" при нажатии кнопки "минус" на товаре с количеством 1', () => {
    const mockRemoveFromCart = vi.fn();

     const cartWithSingleItem = {
    items: [
      {
        id: 2,
        name: 'Cauliflower',
        price: 60,
        quantity: 1, 
        image: 'test2.jpg',
        category: 'vegetables',
        currency: '$'
      }
    ],
    totalQuantity: 1,
    totalPrice: 60
  };
    
    renderWithProvider(
      <CartPopup 
        cart={cartWithSingleItem}
        onUpdateQuantity={() => {}}
        onRemoveFromCart={mockRemoveFromCart}
        onClose={() => {}}
      />
    );

  const buttons = screen.getAllByRole('button');
  const minusButton = buttons.find(button => 
    button.innerHTML.includes('minus') || 
    button.querySelector('svg[data-icon="minus"]') ||
    button.innerHTML.includes('IconMinus')
  );
  
  expect(minusButton).toBeDefined();
  fireEvent.click(minusButton!);
  
  expect(mockRemoveFromCart).toHaveBeenCalledWith(2);
});
});