import React from 'react'
import { Button as ButtonNativeBase, Text, IButtonProps } from "native-base";

interface ButtonProps extends IButtonProps {
    title: string;
    type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({ title, type = 'PRIMARY', ...rest }: ButtonProps) {
    return (
        <>
            <ButtonNativeBase 
                w="full"
                h="14"
                rounded="sm"
                fontSize="md"
                textTransform="uppercase"
                bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
                _pressed={{
                    bg: type === 'SECONDARY' ? 'red.600' : 'yellow.600'
                }}
                {...rest}
            >
                <Text
                    fontSize="sm"
                    fontFamily="heading"
                    color="type === 'SECONDARY' ? 'white' : 'black'"
                >
                    {title}
                </Text>
            </ButtonNativeBase>
            {/* <Text
                color="white"
                textAlign="center"
                mt="4"
            >
                Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
            </Text> */}
        </>
    )
}
