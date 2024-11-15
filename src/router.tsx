import { createBrowserRouter } from "react-router-dom";
import { CreateOrJoinRoomLayout } from "./layouts/create-or-join-room-layout";
import { CreateOrJoinRoom } from "./pages/CreateOrJoinRoom/create-or-join-room";
import { CreateRoom } from "./pages/CreateOrJoinRoom/create-room";
import { RoomLayout } from "./layouts/room";

export const AppRoutes = createBrowserRouter([
    { 
        path: '/', 
        element: <CreateOrJoinRoomLayout />,
        children: [
            { path: '/', element: <CreateOrJoinRoom /> },
            { path: '/create-room', element: <CreateRoom /> },
        ]
    },
    {
        path: '/room/:id',
        element: <RoomLayout />,
    }
])