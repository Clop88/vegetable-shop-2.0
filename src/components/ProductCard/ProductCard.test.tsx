import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import ProductCard from './ProductCard';
import { describe, it, expect, vi } from 'vitest';

const mockProduct = {
  id: 1,
  name: 'Broccoli 1 kg',
  price: 120,
  currency: '$',
  image: 'test-image.jpg',
  category: 'vegetables',
  inStock: true
};

describe('Компонент "ProductCard"', () => {
  const renderWithProvider = (component: React.ReactNode) => {
    return render(
      <MantineProvider>
        {component}
      </MantineProvider>
    );
  };

  it('имеет корректное отображение инфлормации о продукте', () => {
    renderWithProvider(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={() => {}} 
      />
    );

    expect(screen.getByText('Broccoli')).toBeInTheDocument();
    expect(screen.getByText('1 kg')).toBeInTheDocument();


   const priceElement = screen.getByText((content) => {
      return content.includes('$120') || content.includes('$120.00');
    });
    expect(priceElement).toBeInTheDocument();
    expect(screen.getByText('Add to cart')).toBeInTheDocument();
  });


   it('увеличивает количество товара при нажатии кнопку "плюс"', () => {
    renderWithProvider(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={() => {}} 
      />
    );

    const buttons = screen.getAllByRole('button');
    const plusButton = buttons[1];
    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.click(plusButton);
    expect(screen.getByText('2')).toBeInTheDocument();
    
    fireEvent.click(plusButton);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('уменьшает количество товара при нажатии кнопку "минус"', () => {
    renderWithProvider(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={() => {}} 
      />
    );

    const buttons = screen.getAllByRole('button');
    const plusButton = buttons[1];
    const minusButton = buttons[0];
    
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    expect(screen.getByText('3')).toBeInTheDocument();

    fireEvent.click(minusButton);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('не уменьшает количество товара при нажатии кнопку "минус", если товар 1', () => {
    renderWithProvider(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={() => {}} 
      />
    );
    
    const buttons = screen.getAllByRole('button');
    const minusButton = buttons[0];

    fireEvent.click(minusButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('передает нужный товар и его количество при добавлении его в корзину', () => {
    const mockAddToCart = vi.fn();
    
    renderWithProvider(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart} 
      />
    );
    
    const buttons = screen.getAllByRole('button');
    const plusButton = buttons[1];
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    
    const addButton = screen.getByText('Add to cart');
    fireEvent.click(addButton);
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 3);
  });
});
