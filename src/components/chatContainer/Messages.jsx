import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useRef, } from "react"
import { useDispatch, useSelector } from "react-redux"
import { db } from "../../firebase"
import { SET_CHATS } from "../../redux/features/chatSlice"
import Message from "./Message"

const Messages = () => {

    const dispatch = useDispatch()
    const { chats, selectedContact } = useSelector(state => state.chat)
    const { user } = useSelector(state => state.auth)

    const div = useRef()

    const combinedId = user?.uid > selectedContact?.uid ? user?.uid + selectedContact?.uid : selectedContact?.uid + user?.uid

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
            doc.exists() && dispatch(SET_CHATS(doc.data().messages))
        })

        return () => {
            unsub()
        }
    }, [selectedContact?.uid, user?.uid, combinedId, dispatch])

    useEffect(()=>{
        div.current.scrollIntoView({behavior: "smooth"})
    },[chats])

    return (
        <div className="flex-grow bg-white overflow-y-auto" >
            <div className="flex flex-col gap-1 my-1 px-2" >
                {chats.map(chat => {
                    return <Message key={chat.id} message={chat} />
                })}
            </div>
            <div ref={div} ></div>
        </div>
    )
}

export default Messages