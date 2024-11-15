import { Input, InputProps } from "@chakra-ui/react";

interface InputComponentProps extends InputProps {
    text: string
}

export function InputComponent({ text, ...props }: InputComponentProps) {
    return (
        <Input
            placeholder={text}
            p='0.65rem 0.5rem' 
            variant='unstyled'
            outline='1px solid'
            outlineColor='gray.200'
            _focus={{ outline: '2px solid', outlineColor: 'gray.200' }} 
            required
            {...props}
        />
    )
}