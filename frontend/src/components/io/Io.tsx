import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 } from "uuid";
import { AuthContext } from "../../components/auth/auth/Auth";
import { useAppDispatch } from "../../redux/hooks";
import { addVacation, removeVacation, toggleVacationFollow, updateVacation } from "../../redux/vacationSlice";
import SocketMessages from "socket-enums-vt-razdaniel";

interface SocketContextInterface {
    xClientId: string
}

// Simple context with just the client ID
export const SocketContext = createContext<SocketContextInterface>({
    xClientId: ""
});

export default function Io(props: PropsWithChildren): JSX.Element {

    const { children } = props;
    const [xClientId] = useState<string>(v4());
    const value = { xClientId }

    const { jwt } = useContext(AuthContext)!; //differ from shahar...
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        // Only connect if user is logged in
        if (!jwt) return;

        try {
            const socket = io(import.meta.env.VITE_IO_SERVER_URL);

            socket.on("connect", () => {
                console.log("Connected to Socket.io server");
            });

            // Handle events - only respond to events from other clients
            socket.onAny((eventName, payload) => {

                console.log(`eventName: ${eventName}, payload: ${payload}`)
                console.log(`xClientId: ${xClientId}`)
                console.log(`payload.from: ${payload}`)

                if (payload.from !== xClientId) {
                
                    switch (eventName) {

                        case SocketMessages.NEW_VACATION:
                            if (payload.data?.id) {
                                dispatch(addVacation(payload.data));
                            }
                            break;

                        case SocketMessages.UPDATE_VACATION:
                            if (payload.data?.id) {
                                dispatch(updateVacation(payload.data));
                            }
                            break;

                        case SocketMessages.DELETE_VACATION:
                            if (payload.data?.id) {
                                dispatch(removeVacation(payload.data.id));
                            }
                            break;

                        case SocketMessages.FOLLOW:

                            console.log(`Received ${eventName} full payload:`, payload);
                            console.log(`Payload data:`, payload.data);
                            // Extract the data we need
                            if (payload.data) {
                                const { vacationId, userId } = payload.data;

                                // Use the existing Redux action
                                if (vacationId && userId) {
                                    dispatch(toggleVacationFollow({ vacationId, userId }));
                                }
                            }
                            break;

                        case SocketMessages.UNFOLLOW:
                            console.log(`Received ${eventName} full payload:`, payload);
                            console.log(`Payload data:`, payload.data);
                            // Extract the data we need
                            if (payload.data) {
                                const { vacationId, userId } = payload.data;

                                // Use the existing Redux action
                                if (vacationId && userId) {
                                    dispatch(toggleVacationFollow({ vacationId, userId }));
                                }
                            }
                            break;
                            
                    }
                }
            });

            return () => {
                socket.disconnect();
            };
        } catch (error) {
            console.error("Socket initialization error:", error);
        }
    }, [dispatch, xClientId, jwt]);

    return (
        <SocketContext.Provider value={ value }>
            {children}
        </SocketContext.Provider>
    );
}