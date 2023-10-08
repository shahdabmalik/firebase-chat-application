import { signOut } from "firebase/auth"
import { auth, db } from "../../firebase"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useEffect } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { useDispatch, useSelector } from "react-redux"
import Contact from "../contact/Contact"
import { SET_CHATS, SET_CONTACTS, SET_SELECTED_CONTACT } from "../../redux/features/chatSlice"
import AddFriends from "../addFriends/AddFriends"
import { SET_USER } from "../../redux/features/authSlice"

const ContactsContainer = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const { user } = useSelector(state => state.auth)
    const { contacts, inChat } = useSelector(state => state.chat)

    const signout = async () => {
        try {
            navigate()
            dispatch(SET_CONTACTS([]))
            dispatch(SET_USER({}))
            dispatch(SET_SELECTED_CONTACT({}))
            dispatch(SET_CHATS([]))
            await signOut(auth)
        } catch (error) {
            console.log(error);
            toast.error("Error signing out.")
        }
    }

    useEffect(() => {
        const getContacts = () => {
            const unsub = onSnapshot(doc(db, "userContacts", user.uid), (doc) => {

                const contactsData = Object.entries(doc.data())
                const sortedContacts = [...contactsData];
                sortedContacts.sort((a, b) => {
                    const dateA = a[1].date.toMillis(); // Convert Firestore Timestamp to milliseconds
                    const dateB = b[1].date.toMillis();
                    return dateB - dateA;
                });
                dispatch(SET_CONTACTS(sortedContacts))
                // setContacts(doc.data())
            })
            return () => { unsub() }
        }

        user.uid && getContacts()
    }, [user.uid, dispatch])

    return (
        <div className={"bg-slate-100 sm:w-1/3 lg:w-1/4 shadow-inner flex flex-col transition-all overflow-hidden " + (inChat ? " w-0  " : " w-full ")}>
            <div className="mb-5 flex-grow w-full overflow-hidden" >
                <div className="py-2 px-2 h-12 border-b flex justify-between items-center" >
                    <h3 className=" text-xl font-semibold  text-blue-700 " >Contacts</h3>
                    <AddFriends />
                </div>
                {contacts?.map((contact) => {
                    return <Contact key={contact[0]} time={contact[1]?.date.seconds} lastMessage={contact[1]?.lastMessage?.message} user={contact[1]?.userInfo} />
                })}
            </div>
            {/* <Link to="/search" className="bg-blue-500 px-2.5 py-1 text-white rounded" >Find User</Link> */}
            <div className="bg-slate-400 text-center py-2 text-white hover:bg-slate-500 cursor-pointer" onClick={signout} >SignOut</div>
        </div>
    )
}

export default ContactsContainer