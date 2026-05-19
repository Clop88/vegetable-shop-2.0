import { ScrollArea, Text, Image, Button, Divider, } from "@mantine/core";
import { IconMinus, IconPlus } from '@tabler/icons-react';
import type { CartState } from "../../types";


interface CartPopupProps {
    cart: CartState;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveFromCart: (id: number) => void;
    onClose: () => void;
}


function CartPopup({ cart, onUpdateQuantity, onRemoveFromCart, onClose }: CartPopupProps) {
    
        if (cart.items.length === 0) {
        return (
            <div style={{ 
                width: 444, 
                minHeight: 248,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '8px'
            }}>
                <Text c='dimmed' mb={16}>Корзина пуста</Text>
                <Button variant="light" onClick={onClose} c="green">
                    Продолжить покупки
                </Button>
            </div>
        );
    }

    const handleDecrement = (item: CartState['items'][0]) => {
        if (item.quantity <= 1) {
            onRemoveFromCart(item.id);
        } else {
            onUpdateQuantity(item.id, item.quantity - 1);
        }
    };

    return (
        <div style={{ 
            width: 444, 
            minHeight: 120,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>

<ScrollArea style={{ minHeight: 80, padding: '12px' }} type="always">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {cart.items.map((item, index) => (
                        <div key={item.id}>
                            <div style={{ 
                                width: '100%',
                                height: 80,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '8px',
                                backgroundColor: 'white'
                            }}>
                                <Image
                                    src={item.image}
                                    width={64}
                                    height={64}
                                    radius="sm"
                                    fit="cover"
                                    alt={item.name}
                                    style={{
                                        objectFit: 'cover',
                                        flexShrink: 0
                                    }}
                                />

                                <div style={{
                                    flex: 1,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <div>
                                        <Text size="sm" fw={500} lineClamp={1}>
                                            {item.name}
                                        </Text>
                                    </div>

                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        width: '100%',
                                        marginTop: 'auto'
                                    }}>
                                        <Text fw={600} size="sm" c="black">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </Text>

                                        <div style={{ 
                                            display: 'flex',
                                            gap: '4px',
                                            alignItems: 'center'
                                        }}>
                                            <button
                                                onClick={() => handleDecrement(item)}
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: item.quantity <= 1 ? '#f1f3f5' : '#DEE2E6',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    opacity: item.quantity <= 1 ? 0.5 : 1,
                                                    color: '#212529',
                                                    padding: 0
                                                }}>
                                                <IconMinus size={12} />
                                            </button>

                                            <Text size="sm" fw={500} style={{ minWidth: '24px', textAlign: 'center' }}>
                                                {item.quantity}
                                            </Text>

                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                disabled={item.quantity >= 99}
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: item.quantity >= 99 ? '#f1f3f5' : '#DEE2E6',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: item.quantity >= 99 ? 'not-allowed' : 'pointer',
                                                    opacity: item.quantity >= 99 ? 0.5 : 1,
                                                    color: '#212529',
                                                    padding: 0
                                                }}>
                                                <IconPlus size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           {index < cart.items.length - 1 && (
                                <Divider 
                                    style={{ 
                                        margin: '8px 0',
                                        backgroundColor: '#e9ecef'
                                    }} 
                                />
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>
            

            <Divider style={{ flexShrink: 0 }} />

            <div style={{ 
                padding: '0 16px',
                height: '40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                flexShrink: 0,
                borderTop: '1px solid #e9ecef'
            }}>
                <Text fw={600}>Total:</Text>
                <Text fw={700} c="#000000">
                    ${cart.totalPrice.toFixed(2)}
                </Text>
            </div>
        </div>
    );
};

export default CartPopup;                      