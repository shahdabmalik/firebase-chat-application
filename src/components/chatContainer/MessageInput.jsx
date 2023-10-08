import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { VscSend } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { v4 as uuid } from "uuid"
import { db } from "../../firebase"

const MessageInput = () => {

    const [message, setMessage] = useState('')
    const { selectedContact } = useSelector(state => state.chat)
    const { user } = useSelector(state => state.auth)

    const combinedId = user?.uid > selectedContact?.uid ? user?.uid + selectedContact?.uid : selectedContact?.uid + user?.uid


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (message === "") return

        try {
            await updateDoc(doc(db, "chats", combinedId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: message,
                    senderId: user.uid,
                    date: Timestamp.now()
                })
            })
            await updateDoc(doc(db, "userContacts", user.uid),{
                [combinedId+".lastMessage"] : {message},
                [combinedId+".date"] : serverTimestamp()
            })
            await updateDoc(doc(db, "userContacts", selectedContact.uid),{
                [combinedId+".lastMessage"] : {message},
                [combinedId+".date"] : serverTimestamp()
            })
            setMessage('')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="w-full flex gap-2 items-center p-2" onSubmit={handleSubmit} >
            <input className="flex- grow rounded-md border bg-slate-100 h-10 p-2 placeholder:italic" type="text" placeholder="Your message..." value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="submit" className="bg-blue-500 rounded-md cursor-pointer text-white h-10 w-10 flex items-center justify-center" ><VscSend size={24} /></button>
        </form>
    )
}

export default MessageInput