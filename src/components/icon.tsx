import { Icon, IconProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IconComponentProps extends IconProps {
    hoverColor: string
    children: ReactNode
}

export function IconComponent({ hoverColor, children, ...props }:IconComponentProps) {
    return (
        <Icon 
            _hover={{ color: hoverColor, transition: '0.2s' }} 
            fontSize={23} 
            cursor='pointer'
            {...props}
        >
            {children}
        </Icon>
    )
}