'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

export function Provider(props) {
  return (
    <ChakraProvider resetCSS={false} value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
