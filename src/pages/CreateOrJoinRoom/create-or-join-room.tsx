import { Button, Divider, Text, Box, Image } from "@chakra-ui/react";
import googleLogo from '../../images/googleLogo.png'
import { useNavigate } from "react-router-dom";
import { PurpleBgButton } from "./components/purpleBgButton";
import { InputComponent } from "./components/input";
import { SignIn } from "../../services/firebase";
import { UserContext } from "../../contexts/user-context";
import { CustomizedToast } from "../../components/customized-toast";
import { FormEvent, useState } from "react";
import { get, ref } from "firebase/database";
import { db } from "../../firebase.config";

export function CreateOrJoinRoom() {
  const { setUser, user } = UserContext()
  const [roomCode, setRoomCode] = useState('')
  const navigate = useNavigate()

    async function handleCreateRoom() {
      if (!user) {
        await SignIn(setUser)
        CustomizedToast({ text: 'Login efetuado com sucesso!', isSucess: true })
        navigate('/create-room')
      } else {
        navigate('/create-room')
      }
    }

    async function handleJoinRoom(e: FormEvent) {
      e.preventDefault()

      if (roomCode.trim() !== '') {
        const roomRef = await get(ref(db, `rooms/${roomCode}`))

        if (!roomRef.exists()) {
          CustomizedToast({ isSucess: false, text: 'Essa sala não existe, tente outro código.' })
        } else {
          navigate(`/room/${roomCode}`)
        }
      }
    }

    return (
        <>
          <Button 
            bg='transparent' 
            outline='1px solid'
            outlineColor='gray.200' 
            fontWeight='500' 
            display='flex' 
            gap='0.5rem'
            w='100%'
            p='1.4rem 1rem'
            _hover={{ outline: '2px solid', outlineColor: 'gray.200' }}
            onClick={() => handleCreateRoom()}
          >
            <Image src={googleLogo} alt="" w='20px' /> Crie sua sala com o Google
          </Button>
          <Box 
            m='0.6rem 0' 
            color='gray.200'
            display="flex"
            alignItems='center'
            w='100%'
          >
            <Divider flex='1' borderColor='gray.200' />
            <Text p='0 1rem'>ou entre em uma sala</Text>
            <Divider flex='1' borderColor='gray.200' />
          </Box>
          <Box 
            as='form' 
            w='100%' 
            display='flex' 
            flexDir='column' 
            gap='1rem'
            onSubmit={handleJoinRoom}
          >
            <InputComponent 
              text="Digite o código da sala"
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <PurpleBgButton hasIcon text="Entrar na sala" />
          </Box>
        </>
    )
}