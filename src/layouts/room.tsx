import { Box, Button, Image, Skeleton, Text } from "@chakra-ui/react";
import logoImg from '../../public/logo.svg'
import { useParams } from "react-router-dom";
import { ModalComponent } from "../components/modal-component";
import { Copy } from "lucide-react";
import { CopyTextToClipboard } from "../utils/copy-to-clipboard";
import { UserContext } from "../contexts/user-context";
import { useEffect } from "react";
import { GetAddedQuestions, GetUpdatedQuestionStatus, GetRemovedQuestions, GetRoomInfos } from "../services/firebase";
import { AdminRoomPage } from "../pages/room/admin-room";
import { UserRoom } from "../pages/room/user-room";
import { SpinLoader } from "../components/loader";

export function RoomLayout () {
    const { question, setQuestion, roomInfos, setRoomInfos, user } = UserContext()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            const unsubscribeAdded = GetAddedQuestions(id, setQuestion)
            const unsubscribeRemoved = GetRemovedQuestions(id, setQuestion)
            const unsubscribeChanged = GetUpdatedQuestionStatus(id, setQuestion)
            GetRoomInfos(id, setRoomInfos)

            return () => {
                unsubscribeAdded()
                unsubscribeRemoved()
                unsubscribeChanged()
            }
        }
    }, [])

    return (
        <Box>
            <Box 
                as='header' 
                display='flex' 
                justifyContent='space-around' 
                p='1rem'
                borderBottom='2px solid'
                borderColor='gray.100'
            >
                <Image src={logoImg} alt="" w={{ sm: '5rem' , md: '6.3rem'}} />
                <Box display='flex' alignItems='center' gap='1rem'>
                    <Box 
                        display='flex' 
                        alignItems='center' 
                        border='1px solid' 
                        borderColor='purple' 
                        borderRadius='8px'
                        gap='0.5rem'
                        bg='white.details'
                        h={{ sm: '2rem', md: '2.75rem' }}
                        _hover={{ borderColor: 'hover.purple' }}
                    >
                        <Button 
                            variant='ghost' 
                            bg='purple' 
                            color='white.details'
                            borderRadius={{ sm: '6px', md: '6px 0 0 6px' }}
                            _hover={{ bg: 'hover.purple' }}
                            h='100%'
                            p={{ sm: '0', }}
                            onClick={() => CopyTextToClipboard(id)}
                        >
                            <Copy size={19} />
                        </Button>
                        <Box display={{ sm: 'none', md: 'flex', lg: 'flex' }}>
                            {!roomInfos
                                ? <Skeleton startColor="gray.100" endColor="bray.300" h='1rem' w='10rem' mr='0.5rem' /> 
                                : <Text pr='0.5rem'>Sala {id}</Text>
                            }
                        </Box>
                    </Box>
                    {roomInfos && roomInfos.email === user?.email && (
                        <ModalComponent 
                            buttonText="Encerrar sala" 
                            forSure='Tem certeza que deseja encerrar esta sala?' 
                            icon="x" 
                            title='Encerrar sala' 
                        />
                        )
                    }
                </Box>
            </Box>
            {roomInfos 
                ? <Box 
                    display='flex' 
                    flexDir='column' 
                    gap='1rem' 
                    w={{ sm: '95vw', md: '80vw', lg: '60vw' }}
                    margin='4rem auto'
                >
                    <Box display='flex' gap='1rem' alignItems='center' justifyContent={{ sm: 'space-between', md: 'left' }}>
                        <Text fontSize={{ sm: '1.2rem', md: '2rem' }} fontWeight='bold'>Sala {roomInfos.title}</Text>
                        {question.length !== 0 && <Box 
                        bg='pink.200' 
                        p='0.2rem 0.8rem' 
                        borderRadius='1000px'
                        color='white.details'
                        fontSize={{ sm: '0.75rem', md: '0.9rem' }}
                    >
                            {question.length} pergunta{question.length === 1 ? '' : 's'}
                        </Box>}
                    </Box>

                    {roomInfos.email === user?.email && <AdminRoomPage />}
                    {roomInfos.email !== user?.email && <UserRoom />}
                </Box> 
                : <SpinLoader />
            }
        </Box>
    )
}