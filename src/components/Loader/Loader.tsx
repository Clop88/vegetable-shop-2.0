import { Flex, Loader as MantineLoader, Text } from "@mantine/core";

export function Loader() {
    return (
        <Flex
            direction='column'
            align='center'
            justify='center'
            style={{
                height: 300,
                width: '100%',
                padding: 40
            }}
        >
            <MantineLoader 
                size='xl'
                type="bars"
                c='green'
            />
            <Text mt='xl' size="lg" c='dimmed'>
                Загрузка товаров...
            </Text>
        </Flex>
        );
}

export default Loader;