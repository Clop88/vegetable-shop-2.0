import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { Loader } from './Loader';
import { describe, it, expect } from 'vitest';

describe('Компонент "Loader"', () => {
  const renderWithProvider = (component: React.ReactNode) => {
    return render(
      <MantineProvider>
        {component}
      </MantineProvider>
    );
  };

  it('отображается Loader с правильным текстом', () => {
    renderWithProvider(<Loader />);

    expect(screen.getByText('Загрузка товаров...')).toBeInTheDocument();

    const spinner = document.querySelector('.mantine-Loader-root');
    expect(spinner).toBeInTheDocument();
  });

 
});