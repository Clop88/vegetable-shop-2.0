import { useState } from "react";
import { Card, Image, Text, Group, Button, ActionIcon, Stack, Box, Divider } from "@mantine/core";
import { IconMinus, IconPlus, IconShoppingCart  } from '@tabler/icons-react';
import type { Product } from "../../types";

interface ProductCardProps { 
    product: Product;
    onAddToCart: (product: Product, quantity: number) =>void;
} 
    
function ProductCard ({ product, onAddToCart }: ProductCardProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const handleIncrement = () => {
        setQuantity(prev => Math.min(prev + 1, 99));
    };
   
    const handleAddToCart = () => {
        onAddToCart(product, quantity);
        setQuantity(1);
    };

    const handleDecrement = () => {
    if (quantity <= 1) {
        setQuantity(1);
       } else {
        setQuantity(prev => prev - 1);
    }
};

    const extractWeightFromName = (name: string): string => {
        const weightPatterns = [
            /\d+\s*(kg|г|g|кг)/i,
            /\d+\s*-\s*\d+\s*(kg|г|g|кг)/i,
        ];

        for (const pattern of weightPatterns) {
            const match = name.match(pattern);
            if (match) {
                return match[0];
            }
        }

        return '1 kg';
    };

    const getProductNameWithoutWeight = (name: string): string => {
    const weight = extractWeightFromName(name);
    return name.replace(weight, '').trim();
    };

    const productName = getProductNameWithoutWeight(product.name.split(' - ')[0]);
    const productWeight = extractWeightFromName(product.name);

    return (
        <Card
            shadow="sm"
            padding={0}
            radius="md"
            withBorder
            style={{
                
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
            }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
        <Box style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box style={{ 
                width: '276px', 
                height: '276px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
                marginBottom: '0'
                }}>
                <Image
                    src={product.image}
                    width={276}
                    height={276}
                    fit="cover"
                    alt={product.name}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'cover'
                }}
                />
            </Box>

            <Stack gap={8} style={{ flex: 1 }}>
             
                <Group justify="space-between" align="center" wrap="nowrap" style={{margin: '0', }}>
                    <Text fw={600} size="lg" style={{ minWidth: '80px'  }}>
                        {productName}
                    </Text>

                    <Text size="sm" c="dimmed" style={{ minWidth: '60px' }}>
                        {productWeight}
                    </Text>
 
                    <Group gap= '0' wrap="nowrap"
                        style={{
                            margin: '0',
                            textAlign: "right",
                        }}
                    >
                        <ActionIcon
                            size="md"
                            variant="outline"
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                        style={{ borderColor: '#ffffff',
                                     backgroundColor: '#DEE2E6',
                                     color:"black",
                             }}
                    >
                        <IconMinus size={14} />
                        </ActionIcon>
                        
                        <Box
                            style={{
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#ffffff',
                                borderRadius: '4px',
                                wrap: 'nowrap',

                            }}
                        >
                            <Text fw={500}>{quantity}</Text>
                        </Box>
                        <ActionIcon
                            size="md"
                            variant="outline"
                            onClick={handleIncrement}
                            disabled={quantity >= 99}
                            
                            style={{ borderColor: '#ffffff',
                                     backgroundColor: '#DEE2E6',
                                     color:"black",
                             }}
                        >
                            <IconPlus size={14} />
                        </ActionIcon>
                    </Group>
                </Group>
            <Divider my={4} />

            
            <Group justify="space-between" align="center">
            <div>
              <Text fw={700} size="xl" c="#212529">
                ${(product.price * quantity).toFixed(2)}
              </Text>
            </div>
            <Button
              leftSection={<IconShoppingCart size={18} />}
              variant="filled"
              c="#3B944E"
              onClick={handleAddToCart}
              style={{
                borderRadius: '5px',
                paddingLeft: '20px',
                paddingRight: '20px',
                backgroundColor: '#E7FAEB'
              }}
            >
              Add to cart
            </Button>
          </Group>
        </Stack>
      </Box>
    </Card>
  );
}

export default ProductCard;



             