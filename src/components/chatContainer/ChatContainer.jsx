import { useSelector } from "react-redux"
import Header from "./Header"
import Messages from "./Messages"
import MessageInput from "./MessageInput"


const ChatContainer = () => {

    const { inChat } = useSelector(state => state.chat)

    return (
        <div className={" bg-white sm:w-2/3 lg:w-3/4 transition-all duration-300 flex flex-col h-screen " + (inChat ? " w-full " : " w-0 ")} >
            <Header />
            <Messages />
            <MessageInput />
        </div>
    )
}

export default ChatContainer