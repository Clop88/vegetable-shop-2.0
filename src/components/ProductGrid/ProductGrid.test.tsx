import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ProductGrid } from './ProductGrid';
import { describe, it, expect } from 'vitest';

const mockProducts = [
  {
    id: 1,
    name: 'Broccoli 1 kg',
    price: 120,
    currency: '$',
    image: 'test1.jpg',
    category: 'vegetables',
    inStock: true
  },
  {
    id: 2,
    name: 'Cauliflower 1 kg',
    price: 60,
    currency: '$',
    image: 'test2.jpg',
    category: 'vegetables',
    inStock: true
  }
];


describe('Компонент "ProductGrid"', () => {
  const renderWithProvider = (component: React.ReactNode) => {
    return render(
      <MantineProvider>
        {component}
      </MantineProvider>
    );
  };


  it('рендерит loader при загрузке', () => {
    renderWithProvider(
      <ProductGrid 
        products={[]}
        loading={true}
        error={null}
        onAddToCart={() => {}}
      />
    );
    
    expect(screen.getByText('Загрузка товаров...')).toBeInTheDocument();
    expect(screen.queryByText('Catalog')).not.toBeInTheDocument();
  });


  it('выводит сообщение об ошибке при возникновении ошибки', () => {
    renderWithProvider(
      <ProductGrid 
        products={[]}
        loading={false}
        error="Network error"
        onAddToCart={() => {}}
        onRetry={() => {}}
      />
    );
    
    expect(screen.getByText('Ошибка загрузки товаров')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
    expect(screen.getByText('Попробовать снова')).toBeInTheDocument();
  });
  
  
  it('продукты корректно рендерятся', () => {
    renderWithProvider(
      <ProductGrid 
        products={mockProducts}
        loading={false}
        error={null}
        onAddToCart={() => {}}
      />
    );
    
    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByText('Broccoli')).toBeInTheDocument();
    expect(screen.getByText('Cauliflower')).toBeInTheDocument();
    
    const addToCartButtons = screen.getAllByText('Add to cart');
    expect(addToCartButtons).toHaveLength(2);

    expect(screen.getByText(/\$120/)).toBeInTheDocument();
    expect(screen.getByText(/\$60/)).toBeInTheDocument();
  });
});
   
 