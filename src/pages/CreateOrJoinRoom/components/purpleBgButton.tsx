import { Button, ButtonProps } from "@chakra-ui/react";
import { SignIn } from "@phosphor-icons/react";

interface PurpleBgButtonProps extends ButtonProps {
    text: string
    hasIcon?: boolean
}

export function PurpleBgButton({ text, hasIcon, ...props }: PurpleBgButtonProps) {
    return (
      <Button 
        fontWeight='400' 
        w='100%' 
        bg='purple' 
        display='flex' 
        gap='0.5rem' 
        color='white.details'
        p='1.4rem 0'
        _hover={{ bg: 'hover.purple' }}
        type='submit'
        {...props}
      >
        {hasIcon && <SignIn size={21} />}
        {text}
      </Button>
    )
}