import { Button, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { SignOut, TrashSimple } from "@phosphor-icons/react";
import { CircleX } from "lucide-react";
import { IconComponent } from "./icon";
import { DeleteQuestion, LeaveTheRoom } from "../services/firebase";
import { useParams } from "react-router-dom";

interface ModalComponentProps {
    icon: 'x' | 'trash'
    title: string
    forSure: string
    buttonText: string
    questionToRemove?: string
}

export function ModalComponent({buttonText, forSure, icon, title, questionToRemove}: ModalComponentProps) {
    const { onClose, onOpen, isOpen } = useDisclosure()
    const { id } = useParams()

    async function modalFn() {
        if (id) {
            if (icon === 'trash' && questionToRemove) {
                DeleteQuestion(id, questionToRemove)
            } else if (icon === 'x') {
                LeaveTheRoom(id)
            }
        }
        onClose()
    }

    return (
        <>
            {icon === 'x' && <Button 
                variant='ghost' 
                border='1px solid' 
                borderColor='purple'
                color='purple'
                p={{ sm: '0', md: '0 2rem' }}
                h={{ sm: '2rem', md: '2.75rem' }}
                _hover={{ borderColor: 'hover.purple', color: 'hover.purple' }}
                onClick={() => onOpen()}
            >
                <Text display={{ sm: 'none', md: 'flex', lg: 'flex' }}>Encerrar sala</Text>
                <Text display={{ sm: 'flex', md: 'none' }}><SignOut size={19} /></Text>
            </Button>}
            {icon === 'trash' && <IconComponent 
                color='black'
                hoverColor='hover.danger' 
                onClick={() => onOpen()}
            >
                    <TrashSimple />
                </IconComponent>}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay bg='#00000099' />
                <ModalContent bg='white.bg' p='3.5rem 0' display='flex' flexDir='column' alignItems='center' gap='1.5rem'>
                    <ModalBody display='flex' flexDir='column' alignItems='center' gap='1rem'>
                        {icon === 'x' && <Icon as={CircleX} color='danger' fontSize='2.3rem' />}
                        {icon === 'trash' && <Icon as={TrashSimple} color='danger' fontSize='2.3rem' />}
                        <Text fontSize='2rem' fontWeight='bold'>{title}</Text>
                        <Text color='gray.300'>{forSure}</Text>
                    </ModalBody>
                    <ModalFooter display='flex' gap='1rem'>
                        <Button 
                        bg='gray.100' 
                        color='gray.300' 
                        fontWeight='400' 
                        p='0 2rem'
                        _hover={{ bg: 'hover.gray100' }}
                        onClick={() => onClose()}
                        >
                            Cancelar
                        </Button>
                        <Button 
                        bg='danger' 
                        color='white.details' 
                        fontWeight='400' 
                        p='0 2rem'
                        _hover={{ bg: 'hover.danger' }}
                        onClick={() => modalFn()}
                        >
                            {buttonText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}