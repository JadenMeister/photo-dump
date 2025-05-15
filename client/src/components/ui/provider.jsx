import { ChakraProvider } from '@chakra-ui/react'
import { system } from "./theme.js";   // 또는 import { defaultSystem } from "@chakra-ui/react";


export function Provider({ children, resetCSS = true, ...rest }) {
    return (
        <ChakraProvider value={system}>
            {children}
        </ChakraProvider>
    )
}
