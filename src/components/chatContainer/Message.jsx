import { useSelector } from "react-redux"

const Message = ({ message }) => {

    const {user} = useSelector(state => state.auth)

    return (
        <div className={'  text-white px-2.5 py-0.5 rounded-full ' + (user.uid === message?.senderId ? " self-end bg-blue-500 " : " self-start bg-green-500" )} >{message?.text}</div>
    )
}

export default Message