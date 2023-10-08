import { useSelector } from "react-redux"
import useRedirectUser from "../../customHook/useRedirectUser"
import ContactsContainer from "../../components/contactsContainer/ContactsContainer"
import ChatContainer from "../../components/chatContainer/ChatContainer"
import NoContactSelected from "../../components/noContactSelected/NoContactSelected"

const Chats = () => {

    useRedirectUser("/")
    const { selectedContact } = useSelector(state => state.chat)

    return (
        <div className=" max-w-screen-xl mx-auto min-h-screen flex bg-slate-200 overflow-hidden shadow-xl" >
            <ContactsContainer />
            {selectedContact?.name ? <ChatContainer /> : <NoContactSelected />}
        </div>
    )
}

export default Chats