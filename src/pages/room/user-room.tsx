import { Box, Button, Image, Text, Textarea } from "@chakra-ui/react";
import conversationBubblesImg from '../../images/conversation-bubbles.svg'
import { Question } from "../../components/question";
import { UserContext } from "../../contexts/user-context";
import { SignIn } from "../../services/firebase";
import { CustomizedToast } from "../../components/customized-toast";
import { FormEvent, useState } from "react";
import { push, ref } from "firebase/database";
import { db } from "../../firebase.config";
import { useParams } from "react-router-dom";
import { PaperPlaneRight } from "@phosphor-icons/react";
 
export function UserRoom() {
    const { user, setUser, question } = UserContext()
    const [newQuestion, setNewQuestion] = useState('')
    const { id } = useParams()

    async function handleSignIn() {
        await SignIn(setUser)
        CustomizedToast({ text: 'Login efetuado com sucesso', isSucess: true })
    }

    function handleAddNewQuestion(e: FormEvent) {
        e.preventDefault()
        if (user?.displayName && user.photoURL) {
            if (newQuestion.trim() !== '') {
                const author = { avatar: user.photoURL, name: user.displayName }
                const question = { 
                    author, 
                    content: newQuestion, 
                    isAnswered: false, 
                    isHighlighted: false,
                }
                
                push(ref(db, `/rooms/${id}/questions`), question)
                setNewQuestion('')
            }
        } else if (!user?.displayName || !user.photoURL) {
            CustomizedToast({ isSucess: false, text: 'Sua conta Google não tem todas as informações necessárias.' })
        } else if (!user) {
            CustomizedToast({ isSucess: false, text: 'Entre em uma conta para fazer comentários' })
            console.error('Usuário não logado')
            throw new Error('Usário não logado')
        }
    }

    return (
        <Box display='flex' flexDir='column' gap='1rem'>
            <Box 
              as='form' 
              display='flex' 
              flexDir='column' 
              gap='1rem' 
              onSubmit={handleAddNewQuestion}
            >
                <Textarea 
                    placeholder='O que você quer perguntar?' 
                    resize="none"  
                    variant='unstyled'
                    border='1px solid transparent'
                    p='1rem'
                    bg='white.details'
                    h='8rem'
                    _focus={{ borderColor: 'purple' }}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    value={newQuestion}
                    required
                />
                <Box display='flex' alignItems='center' justifyContent='space-between' pb='2rem'>
                    { user ? (
                        <Box display='flex' alignItems="center" gap='0.5rem'>
                            <Image src={user.photoURL || ''} alt='' w='40px' borderRadius='100%' />
                            <Text fontWeight='600'>{user.displayName}</Text>
                        </Box>
                    ) : (
                        <Text 
                        fontSize='0.9rem' 
                        color='gray.300'
                        >
                            Para enviar uma pergunta,{' '}
                            <Text 
                            color='purple' 
                            textDecor='underline' 
                            as='span' 
                            cursor='pointer' 
                            _hover={{ color: 'hover.purple' }}
                            onClick={() => handleSignIn()}
                            >
                                faça seu login.
                            </Text>
                        </Text>
                    ) }
                    <Button 
                        bg='purple' 
                        color='white.details' 
                        _hover={{ bg: 'hover.purple' }}
                        isDisabled={!user}
                        type='submit'
                    >
                        <Text display={{ sm: 'none', md: 'flex' }} p='1.5rem 2rem'>
                            Enviar pergunta
                        </Text>
                        <Text display={{ sm: 'flex', md: 'none' }}>
                            <PaperPlaneRight size={19} />
                        </Text>
                    </Button>
                </Box>
            </Box>
            {question.length === 0 && (
                <Box 
                  display='flex' 
                  flexDir='column' 
                  gap='0.5rem' 
                  alignItems='center'
                  textAlign='center'
                  m='15% auto'
                  maxW={{ sm: '80vw', md: '20rem', lg: '20rem' }}
                  margin='6rem auto'
                >
                    <Image src={conversationBubblesImg} alt='' w='13rem' h='9rem' />
                    <Text fontSize='1.4rem' fontWeight='700'>Nenhuma pergunta por aqui...</Text>
                    <Text color='gray.300'>Faça seu login e seja a primeira pessoa a fazer uma pergunta!</Text>
                </Box>
            )}
            {question.length !== 0 && question.map(({ content, author, questionId, isAnswered, isHighlighted, likes }) => (
                <Question 
                  question={content} 
                  userImage={author.avatar} 
                  userName={author.name} 
                  key={questionId} 
                  questionId={questionId} 
                  userPage
                  isAnswered={isAnswered}
                  isHighlighted={isHighlighted}
                  likes={likes}
                />
            ))}
        </Box>
    )
}