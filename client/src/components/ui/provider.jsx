import { ChakraProvider } from '@chakra-ui/react'
import defaultTheme from '@chakra-ui/theme'

export function Provider({ children, resetCSS = true, ...rest }) {
    return (
        <ChakraProvider
            theme={defaultTheme}
            resetCSS={resetCSS}
            {...rest}
        >
            {children}
        </ChakraProvider>
    )
}
