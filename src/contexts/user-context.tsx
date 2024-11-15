import { UserInfo } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ThereIsAUserLoggedIn } from "../services/firebase";

export type QuestionsType = {
    content: string
    author: {
        name: string
        avatar: string
    }
    isHighlighted: boolean
    isAnswered: boolean
    questionId: string
    likes: object
    likeCount: number
}

export type RoomInfosType = {
    title: string
    adminId: string
    email: string
} | null

interface UserContextBody {
    user: UserInfo | null
    question: QuestionsType[]
    roomInfos: RoomInfosType
    setRoomInfos: React.Dispatch<React.SetStateAction<RoomInfosType>>
    setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>
    setQuestion: React.Dispatch<React.SetStateAction<QuestionsType[]>>
}

interface UserContextProviderProps {
    children: ReactNode
}

export const userContext = createContext({} as UserContextBody)

export function UserContextProvider({children}: UserContextProviderProps) {
    const [user, setUser] = useState<UserInfo | null>(null)
    const [question, setQuestion] = useState<QuestionsType[]>([])
    const [roomInfos, setRoomInfos] = useState<RoomInfosType>(null)

    useEffect(() => {
        const unsubscribe = ThereIsAUserLoggedIn(setUser)

        return () => unsubscribe()
    }, [])

    return (
        <userContext.Provider value={{ user, setUser, question, setQuestion, roomInfos, setRoomInfos }}>
            {children}
        </userContext.Provider>
    )
}

export const UserContext = () => useContext(userContext)