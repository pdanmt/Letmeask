import { browserLocalPersistence, GoogleAuthProvider, setPersistence, signInWithPopup, UserInfo } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { CustomizedToast } from "../components/customized-toast";
import { get, onChildAdded, onChildChanged, onChildRemoved, ref, remove, set, update } from "firebase/database";
import { QuestionsType, RoomInfosType } from "../contexts/user-context";

export async function SignIn(setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>) {
    const provider = new GoogleAuthProvider()

    await setPersistence(auth, browserLocalPersistence)

    await signInWithPopup(auth, provider).then((result) => {
        if (result.user) {
            if (!result.user.displayName || !result.user.photoURL) {
                CustomizedToast({ text: 'Algumas informações da sua conta estão faltando, tente usar outra.', isSucess: false})
                throw new Error('Missing informations from Google account.')
            } else {   
                setUser(result.user)
            }
        }
    }).catch((error) => {
        console.error(`Erro ao realizar login: ${error}`)
        CustomizedToast({ isSucess: false, text: 'Erro ao realizar login. Tente novamente!' })
    })
}

export function ThereIsAUserLoggedIn(
    setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>,
) {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            if (!user.displayName || !user.photoURL) {
                CustomizedToast({ text: 'Algumas informações da sua conta estão faltando, tente usar outra.', isSucess: false})
                throw new Error('Missing informations from Google account.')
            } else {   
                setUser(user)
            }
        } else if (!user && location.pathname === '/create-room')  {
            setTimeout(() => location.replace('/'), 0)
        }
    })

    return unsubscribe
}

export async function GetRoomInfos(roomId: string, setRoomInfos: React.Dispatch<React.SetStateAction<RoomInfosType>>) {
    const getRoomInfos = await get(ref(db, `/rooms/${roomId}`))

    if (!getRoomInfos.exists()) {
        location.replace('/')
    } else {
        setRoomInfos(getRoomInfos.val() as RoomInfosType)
    }
}

export function GetAddedQuestions(roomId: string, setQuestion: React.Dispatch<React.SetStateAction<QuestionsType[]>>) {
    const roomRef = ref(db, `/rooms/${roomId}/questions`)
    const unsubscribe = onChildAdded(roomRef, (data) => {
        setQuestion((prev) => {
            if (data && data.key) {
                const question = { ...data.val(), questionId: data.key }
                const likeCount = question.likes ? Object.keys(question.likes).length : 0
                question.likeCount = likeCount

                return [...prev, question].sort((a, b) => b.likeCount - a.likeCount)
            } else {
                return prev
            }
        })
    })

    return unsubscribe
}

export async function DeleteQuestion(roomId: string, questionId: string) {
    const questionRef = ref(db, `/rooms/${roomId}/questions/${questionId}`)

    try {
        await remove(questionRef)
        CustomizedToast({ isSucess: true, text: 'A pergunta foi removida!' })
    } catch (error) {
        console.error(`Erro ao remover pergunta. ${error}`)
        CustomizedToast({ isSucess: false, text: 'Erro ao remover pergunta.' })
    }
}

export function GetRemovedQuestions(roomId: string, setQuestion: React.Dispatch<React.SetStateAction<QuestionsType[]>>) {
    const roomRef = ref(db, `/rooms/${roomId}/questions`)
    const unsubscribe = onChildRemoved(roomRef, (data) => {
        if (data && data.key) {
            setQuestion((prev) => {
                return prev.filter((question) => question.questionId !== data.key)
            })
        }
    })

    return unsubscribe
}

export async function CheckQuestionAsAnswered(roomId: string, questionId: string, isAnswered: boolean) {
    const questionRef = ref(db, `/rooms/${roomId}/questions/${questionId}`)
    update(questionRef, { isAnswered: !isAnswered })
}

export async function CheckQuestionAsHighlight(roomId: string, questionId: string, isHighlighted: boolean) {
    const questionRef = ref(db, `/rooms/${roomId}/questions/${questionId}`)
    update(questionRef, { isHighlighted: !isHighlighted })
}

export async function LikeQuestion(roomId: string, questionId: string, likes: string[], userId: string) {
    const likeRef = ref(db, `/rooms/${roomId}/questions/${questionId}/likes/${userId}`)

    if(likes.find((uid) => uid === userId)) {
        await remove(likeRef)
    } else {
        await set(likeRef, userId)
    }
}

export function GetUpdatedQuestionStatus(roomId: string, setQuestion: React.Dispatch<React.SetStateAction<QuestionsType[]>>) {
    const roomRef = ref(db, `/rooms/${roomId}/questions`)
    const unsubscribe = onChildChanged(roomRef, (data) => {
        if (data && data.key) {
            setQuestion((prev) => {
                if (prev.find(({ questionId }) => questionId === data.key) && data.key) {
                    const dataVal = data.val() as QuestionsType
                    
                    if(dataVal.isHighlighted) {
                        return [{...dataVal, questionId: data.key}, ...prev.filter(({ questionId }) => questionId !== data.key)]
                    } else if (dataVal.isAnswered) {
                        return [...prev.filter(({ questionId }) => questionId !== data.key), {...dataVal, questionId: data.key}]
                    } else {
                        return [{...dataVal, questionId: data.key}, ...prev.filter(({ questionId }) => questionId !== data.key)]
                    }
                } else {
                    return prev
                }
            })
        }
    })

    return unsubscribe
}

export async function LeaveTheRoom(roomId: string) {
    try {
        await remove(ref(db, `/rooms/${roomId}`))
        location.replace('/')
    } catch (error) {
        console.error(`Erro ao encerrar sala: ${error}`)
        CustomizedToast({ isSucess: false, text: 'Erro ao encerrar sala. Tente novamente!' })
    }
}