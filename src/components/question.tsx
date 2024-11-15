import { Box, Button, Image, Text } from "@chakra-ui/react"
import { Chat, ThumbsUp } from "@phosphor-icons/react"
import { IconComponent } from "./icon"
import { ModalComponent } from "./modal-component"
import { CheckCircle } from "@phosphor-icons/react/dist/ssr"
import { useParams } from "react-router-dom"
import { CheckQuestionAsAnswered, CheckQuestionAsHighlight, LikeQuestion } from "../services/firebase"
import { UserContext } from "../contexts/user-context"

interface QuestionProps {
    question: string
    userName: string
    userImage: string
    questionId: string
    userPage?: boolean
    isHighlighted: boolean
    isAnswered: boolean
    likes: object
}

export function Question({
    question, 
    userName, 
    userImage, 
    userPage, 
    questionId, 
    isAnswered, 
    isHighlighted,
    likes,
}: QuestionProps) {
    const { user } = UserContext()
    const { id } = useParams()

    const arrayLikes: string[] = []
    if(likes) {
        Object.entries(likes).forEach(([_, userId]) => arrayLikes.push(userId))
    }

    async function handleCheckQuestionAsAnswered() {
        if (id) {
            await CheckQuestionAsAnswered(id, questionId, isAnswered)
        }
    }

    async function handleCheckQuestionAsHighlight() {
        if (id) {
            await CheckQuestionAsHighlight(id, questionId, isHighlighted)
        }
    }

    async function handleLikeQuestion() {
        if (id && user?.uid) {
            await LikeQuestion(id, questionId, arrayLikes, user.uid)
        }
    }

    return (
        <Box 
          w='100%' 
          display='flex' 
          flexDir='column' 
          p={{ sm: '0.7rem', md: '1rem 1.5rem' }}  
          borderRadius='8px' 
          minH='9.5rem'
          justifyContent='space-between'
          gap='0.5rem'
          bg={isAnswered && 'gray.100' || isHighlighted && 'purpleBg' || 'white.details'}
          color={isAnswered ? 'gray.300' : 'black'}
          border='1px solid'
          borderColor={isHighlighted ? 'purple' : 'transparent'}
          boxShadow={isHighlighted ? '0 0 10px #05020630' : 'none'}
        >
            <Text>{question}</Text>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Box display='flex' alignItems='center' gap='0.65rem'>
                    <Image 
                      src={userImage} 
                      w={{ sm: '25px', md: '40px' }} 
                      borderRadius='100%' 
                      opacity={isAnswered ? '0.5' : '1'} 
                      alt='' 
                    />
                    <Text color='gray.300'>{userName}</Text>
                </Box>
                <Box display='flex' gap='1rem'>
                    {userPage ? (
                        <Box 
                          display='flex' 
                          alignItems='center'
                          gap='0.5rem'
                          color={arrayLikes.find((userId) => userId === user?.uid) ? 'purple' : 'gray.300'}
                        >
                            <Text>{arrayLikes.length || 0}</Text>
                            <IconComponent 
                              hoverColor="hover.purple"
                              display={isAnswered ? 'none' : 'flex'}
                              onClick={() => handleLikeQuestion()}
                            >
                                <Button as={ThumbsUp} isDisabled={!user} variant='unstyled' fontSize={22} />
                            </IconComponent>
                        </Box>
                    ) : (
                        <>
                            <IconComponent 
                              hoverColor='hover.purple' 
                              onClick={() => handleCheckQuestionAsAnswered()}
                              color={isAnswered ? 'purple' : 'black'}
                              display={isHighlighted ? 'none' : 'flex'}
                            >
                                <CheckCircle />
                            </IconComponent>
                            <IconComponent 
                              hoverColor='hover.purple'
                              onClick={() => handleCheckQuestionAsHighlight()}
                              color={isHighlighted ? 'purple' : 'black'}
                              display={isAnswered ? 'none' : 'flex'}
                            >
                                <Chat />
                            </IconComponent>
                            <ModalComponent 
                              buttonText="Sim, exluir." 
                              title="Excluir pergunta" 
                              forSure="Tem certeza que você deseja excluir esta pergunta?" 
                              icon="trash"
                              questionToRemove={questionId}
                            />
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}