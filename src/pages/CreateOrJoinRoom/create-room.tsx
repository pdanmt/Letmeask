import { Box, Text } from "@chakra-ui/react";
import { PurpleBgButton } from "./components/purpleBgButton";
import { Link, useNavigate } from "react-router-dom";
import { InputComponent } from "./components/input";
import { FormEvent, useState } from "react";
import { db } from "../../firebase.config";
import { push, ref } from "firebase/database";
import { RoomInfosType, UserContext } from "../../contexts/user-context";
import { CustomizedToast } from "../../components/customized-toast";

export function CreateRoom () {
    const { user } = UserContext()
    const [newRoom, setNewRoom] = useState('')
    const navigate = useNavigate()

    async function handleCreateNewRoom(e: FormEvent) {
        e.preventDefault()

        if(newRoom.trim() === '') {
            return
        } else {
            const roomRef = ref(db, 'rooms')

             try {
                const firebaseRoom = await push(roomRef, { 
                    title: newRoom,
                    adminId: user?.uid,
                    email: user?.email
                } as RoomInfosType)
                
                CustomizedToast({ isSucess: true, text: 'A sala foi criada com sucesso!' })

                setNewRoom('')
                navigate(`/room/${firebaseRoom.key}`)
             } catch (error) {
                CustomizedToast({ isSucess: false, text: 'Algo deu errado, tente novamente' })
                console.error(`Erro na criação da sala. Erro: ${error}`)
             }
        }
    }

    return (
        <>
            <Text fontSize='2rem' fontWeight='bold'>Crie uma nova sala</Text>
            <Box 
              as='form' 
              w='100%' 
              display='flex' 
              flexDir='column' 
              gap='1rem'
              onSubmit={handleCreateNewRoom}
            >
                <InputComponent 
                  text='Nome da sala' 
                  onChange={(e) => setNewRoom(e.target.value)}
                  value={newRoom}
                />
                <PurpleBgButton text='Criar sala' />
            </Box>
            <Text color='gray.300'>
                Quer entrar em uma sala já existente?{' '}
                <Text 
                  as={Link} 
                  to='/'
                  color='pink.200' 
                  textDecor='underline'
                  _hover={{ color: 'pink.100' }}
                >
                    Clique aqui
                </Text>
            </Text>
        </>
    )
}