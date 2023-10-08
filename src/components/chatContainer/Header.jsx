import { useDispatch, useSelector } from "react-redux"
import { BiLeftArrowAlt } from "react-icons/bi"
import { SET_CHATS, SET_INCHAT, SET_SELECTED_CONTACT } from "../../redux/features/chatSlice"

const Header = () => {

    const dispatch = useDispatch()
    const { selectedContact } = useSelector(state => state.chat)

    const backButtonClick = () => {
        dispatch(SET_CHATS([]))
        dispatch(SET_SELECTED_CONTACT({}))
        dispatch(SET_INCHAT(false))
    }

    return (
        <div className="bg-slate-100 border-b flex items-center gap-3 p-2  " >
            <BiLeftArrowAlt size={24} onClick={backButtonClick} className="cursor-pointer hover:text-blue-500" />
            <div className="flex gap-2 items-center" >
                <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full text-white font-semibold"  >{selectedContact.name?.split('')[0].toUpperCase()}</div>
                <p className=" font-semibold"  >{selectedContact.name}</p>
            </div>
        </div>
    )
}

export default Header