import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAppDispatch } from "../../redux/hooks";
import { v4 } from "uuid";
import SocketMessages from "../../../../lib/socket-enums/src/socket-enums"
import useUserId from "../../hooks/useUserId";
import Vacation from "../../models/vacation/Vacation";
import { addVacation, removeVacation, toggleVacationFollow, updateVacation } from "../../redux/vacationSlice";

interface SocketContextInterface {
    xClientId: string
}

export const SocketContext = createContext<SocketContextInterface>({
    xClientId: ''
})

export default function Io(props: PropsWithChildren): JSX.Element {

    const { children } = props
    const [xClientId] = useState<string>(v4())
    const value = { xClientId }
    const currentUserId = useUserId()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const socket = io(import.meta.env.VITE_IO_SERVER_URL)

        socket.on('connect', () => {
            console.log('Connected to Socket.io server');
        });

        socket.on('connect_error', (error) => {
            console.error('Socket.io connection error:', error);
        });

        socket.onAny((eventName, payload) => {

            console.log(eventName, payload)


            switch (eventName) {
                case SocketMessages.NEW_VACATION: {
                    const newVacation = payload.data as Vacation
                    dispatch(addVacation(newVacation))
                    break;
                }
                case SocketMessages.UPDATE_VACATION: {
                    const updatedVacation = payload.data as Vacation
                    dispatch(updateVacation(updatedVacation))
                    break;
                }
                case SocketMessages.DELETE_VACATION: {
                    const { id } = payload.data
                    dispatch(removeVacation(id))
                    break;
                }
                case SocketMessages.FOLLOW: {
                    const vacationId = payload.data.vacationId
                    console.log('Received FOLLOW event for vacation:', vacationId);

                    const userId = payload.data.userId || "some-user-id";
                    console.log('Dispatching toggleVacationFollow with:', { vacationId: vacationId, userId });

                    dispatch(toggleVacationFollow({ vacationId, userId }))
                    break;
                }
                case SocketMessages.UNFOLLOW: {
                    const vacationId = payload.data.vacationId
                    console.log('Received UNFOLLOW event for vacation:', vacationId);

                    const userId = payload.data.userId || "some-user-id";
                    console.log('Dispatching toggleVacationUNFollow with:', { vacationId: vacationId, userId });

                    dispatch(toggleVacationFollow({ vacationId, userId }))
                    break;
                }
            }

        })

        return () => {
            socket.disconnect()
        }

    }, [dispatch, xClientId, currentUserId])

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )

}