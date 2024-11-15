import { Box, Text, Image } from "@chakra-ui/react";
import conversationBubblesImg from '../../images/conversation-bubbles.svg'
import { Question } from "../../components/question";
import { UserContext } from "../../contexts/user-context";

export function AdminRoomPage() {
    const { question } = UserContext()

    return (
        <Box 
          display='flex' 
          flexDir='column' 
          gap='1rem' 
          w={{ sm: '90vw', md: '80vw', lg: '60vw' }}
        >
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
                    <Text color='gray.300'>Envie o código desta sala para seus amigos e comece a responder perguntas!</Text>
                </Box>
            )}
            {question.length !== 0 && question.map(({ author, content, questionId, isAnswered, isHighlighted, likes }) => (
                <Question 
                  question={content} 
                  userImage={author.avatar} 
                  userName={author.name} 
                  key={questionId} 
                  questionId={questionId}
                  isAnswered={isAnswered}
                  isHighlighted={isHighlighted}
                  likes={likes}
                />
            ))}
        </Box>
    )
}