import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './router'
import { ChakraProvider } from '@chakra-ui/react'
import { customLightTheme } from './themes/light-theme'
import { UserContextProvider } from './contexts/user-context'
import { Toaster } from 'sonner'

export function App() {
  return (
    <UserContextProvider>
      <Toaster richColors />
      <ChakraProvider theme={customLightTheme}>
        <RouterProvider router={AppRoutes} />
      </ChakraProvider>
    </UserContextProvider>
  )
}
