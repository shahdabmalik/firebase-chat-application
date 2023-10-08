import { useDispatch, useSelector } from "react-redux"
import { SET_INCHAT, SET_SELECTED_CONTACT } from "../../redux/features/chatSlice"

const Contact = ({ user, lastMessage, time }) => {

    const dispatch = useDispatch()
    const { selectedContact } = useSelector(state => state.chat)

    const handleNormalClick = () => {
        dispatch(SET_SELECTED_CONTACT(user))
        dispatch(SET_INCHAT(true))
    }
    const date = new Date(time * 1000).toLocaleDateString()

    return (
        <div className={'w-full h-16 overflow-hidden flex items-center gap-3 p-2 border-b border-b-slate-300 cursor-pointer relative' + (user?.uid === selectedContact?.uid ? ' border-l-2 border-blue-500 shadow-md bg-white ' : ' hover:bg-slate-50 ')} onClick={handleNormalClick} >
            <div className='w-10 h-10 aspect-square bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold border-slate-900' >{user?.name.split('')[0].toUpperCase()}</div>
            <div className=" overflow-hidden " >
                <p className="font-bold w-96" >{user?.name}</p>
                {lastMessage && <p className="text-sm w-96 text-slate-500" >{lastMessage}</p>}
            </div>
            <div className=" absolute top-2 right-2 text-xs text-slate-500">{date}</div>
        </div>
    )
}

export default Contact