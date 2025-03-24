import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 } from "uuid";
import { AuthContext } from "../../components/auth/auth/Auth";
import SocketMessages from "../../../../lib/socket-enums/src/socket-enums";
import { useAppDispatch } from "../../redux/hooks";
import { addVacation, removeVacation, updateVacation } from "../../redux/vacationSlice";

// Simple context with just the client ID
export const SocketContext = createContext<{ xClientId: string }>({
  xClientId: ""
});

export default function Io(props: PropsWithChildren): JSX.Element {
  const { children } = props;
  const [xClientId] = useState<string>(v4());
  const { jwt } = useContext(AuthContext)!;
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Only connect if user is logged in
    if (!jwt) return;

    try {
      const socket = io(import.meta.env.VITE_IO_SERVER_URL);

      socket.on("connect", () => {
        console.log("Connected to Socket.io server");
      });

      socket.on("connect_error", (error) => {
        console.error("Socket.io connection error:", error);
      });

      // Handle events - only respond to events from other clients
      socket.onAny((eventName, payload) => {
        if (payload.from === xClientId) return;

        try {
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
          }
        } catch (error) {
          console.error("Error handling socket event:", error);
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
    <SocketContext.Provider value={{ xClientId }}>
      {children}
    </SocketContext.Provider>
  );
}