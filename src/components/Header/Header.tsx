import { useState } from 'react';
import { Container, Group, ActionIcon, Badge, Text, Popover, Image } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import CartPopup from '../CartPopup/CartPopup';
import type { CartState } from '../../types';
import logo from '../../assets/logo.png';


interface HeaderProps {
    cart: CartState;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveFromCart: (id: number) => void;
}

function Header({ cart, onUpdateQuantity, onRemoveFromCart }: HeaderProps) {
    const [cartOpened, setCartOpened] = useState(false);
    return (

        <div style={{
            height: '60px', 
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '8px'
        }}>
        
            <Container size='xl' style={{ width: '100%', height: '100%'}}>

            <Group style={{ width: '100%'}}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: '600px'
                   
                    }}>

                        <Image
                            src={logo} 
                            alt="Vegetable Shop"
                            width='200px'
                            height='30px'
                            style={{
                                objectFit: 'contain',
                                alignItems: 'center',
                                marginLeft: '80px'
                            }}
                        />
                </div>
           
             <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Popover
                    opened={cartOpened}
                    onClose={() => setCartOpened(false)}
                    position='bottom-end'
                    withArrow
                    width={400}
                    offset={10}
                >

                <Popover.Target>
                    <ActionIcon
                    c='white'
                    onClick={() => setCartOpened(prev => !prev)}
                    style={{ position: 'relative', width:'174px', height: '44px', left: '300px', backgroundColor: '#54B46A' }}
                    >
                        <Text style={{ alignItems: 'center', paddingLeft: '15px' }}
                        >Cart</Text>
                    <IconShoppingCart size={24} style={{ position: 'relative', left: '20px' }}/>

                    {cart.totalQuantity > 0 && (
                        <Badge
                            c='#212529'
                            size='xs'
                            style={{
                                position: 'absolute',
                                top: 12,
                                right: 125,
                                minWidth: 20,
                                height: 20,
                                padding: '0 5px',
                                backgroundColor:'white'
                            }}
                        >

                        {cart.totalQuantity}
                        </Badge>
                    )}
                    </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown style={{ padding: 0 }}>
                    <CartPopup
                        cart={cart}
                        onUpdateQuantity={onUpdateQuantity}
                        onRemoveFromCart={onRemoveFromCart}
                        onClose={() => setCartOpened(false)}
                    />
                </Popover.Dropdown>
                </Popover>
        </div>
    </Group>
   </Container>
 </div>
);
}

export default Header;