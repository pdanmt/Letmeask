import { Box, Image, Text } from '@chakra-ui/react'
import illustrationImg from '../images/illustration.svg'
import logoImg from '../../public/logo.svg'
import { Outlet } from 'react-router-dom'

export function CreateOrJoinRoomLayout() {
  return (
    <Box 
      display={{ sm: 'flex', md: 'flex', lg: 'grid' }} 
      flexDir='column' 
      gridTemplateColumns="47% 53%" 
      minH="100vh"
    >
      <Box bg="purple" pl={{ lg:"5rem" }} p={{ sm: '1rem', md: '1.5rem' }}>
        <Box
          display="flex"
          gap="1rem"
          maxW="22.56rem"
          flexDir="column"
          justifyContent="center"
          h="100%"
          alignItems='center'
        >
          <Image 
            src={illustrationImg} 
            w={{ sm: '12rem', md: '15.5rem', lg: "19.56rem" }} 
            h={{ sm: '13rem', md: '16.5rem', lg: "25.16rem" }} 
            alt="" 
          />
          <Text
            color="white.details"
            fontSize={{ sm: '2rem', md: "2.5rem" }}
            fontWeight="700"
            letterSpacing="1px"
            lineHeight="2.65rem"
          >
            Toda pergunta tem uma resposta.
          </Text>
          <Text fontSize="1.2rem" color="gray.100" letterSpacing="1px">
            Aprenda e compartilhe conhecimento com outras pessoas
          </Text>
        </Box>
      </Box>
      <Box 
        p={{ sm: '1rem', md: '1.5rem' }} 
        display="flex"
        flexDir='column'
        alignItems='center' 
        justifyContent='center'
      >
      <Image src={logoImg} alt="" w='9.625rem' h='4.3125rem' mb='3.75rem' />
        <Box 
          display='flex'
          flexDir='column'
          alignItems='center' 
          m='0 auto'
          w={{ sm: 'auto', md: '400px', lg: '400px' }}
          gap='1rem'
          textAlign='center'
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
