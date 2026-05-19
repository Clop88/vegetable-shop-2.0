import { Container, Title, Text, Alert, Button } from "@mantine/core";
import { IconAlertCircle } from '@tabler/icons-react';
import ProductCard from '../ProductCard/ProductCard';
import { Loader } from "../Loader/Loader";
import type { Product} from "../../types/";

interface ProductGridProps {
    products: Product[];
    loading: boolean;
    error: string | null;
    onAddToCart: (product: Product, quantity: number) => void;
    onRetry?: () => void;
}

export function ProductGrid({
    products,
    loading,
    error,
    onAddToCart,
    onRetry,
}: ProductGridProps) {
    if (loading) {
        return (
            <Container size='xl' py='xl'>
                <Loader />
            </Container>
        );
    }
    if (error) {
        return (
            <Container size='xl' py='xl'>
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    title='Ошибка загрузки товаров'
                    c='red'
                    variant="light"
                    mb='md'
                >
                <Text mb='md'>{error}</Text>
                {onRetry && (
                    <Button
                        onClick={onRetry}
                        variant="light"
                        c='green'
                    >Попробовать снова
                    </Button>
                    )}
                </Alert>
            </Container>
        );
    }
    if (products.length === 0) {
        return (
            <Container size='xl' py='xl'>
                <Alert
                    title='Товары не найдены'
                    c='yellow'
                    variant="light"
                    >
                        <Text>В данный момент товары отсутствуют в каталоге.</Text>
                    </Alert>
            </Container>
        );
    }

   return (
        
    <Container  size='100%'
                py="xl"
                 style={{ 
                    paddingLeft: 0, 
                    paddingRight: 0 
                }}
    >
        

        <Title order={1} mb="md" c="#000000"
            style={{
                    marginLeft: '80px',
                    marginBottom: '45px',
                    fontSize: '32px',
                    fontWeight: 600,
                    fontFamily: 'Inter',
                    fontStyle: 'SemiBold'
            }}>
        Catalog
        </Title>

        <div style={{
            marginLeft: '80px',
            marginRight: '80px',
        }}>
    
            <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 302px)',
            gap: '24px',
            justifyContent: 'flex-start',
            }}>
            {products.map(product => (
            <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            />
            ))}
        </div>
        </div>
    </Container>
);

}

export default ProductGrid;