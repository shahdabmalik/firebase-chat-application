import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { SET_USER } from "../redux/features/authSlice"

const useRedirectUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const checkUser = async () => {
            onAuthStateChanged(auth, (user) => {
                if (!user) {
                    navigate("/")
                    toast.error("Request Unauthorized, Please Login.")
                } else {
                    let loggedInUser = {
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email
                    }
                    dispatch(SET_USER(loggedInUser))
                    return
                }
            })
        }
        checkUser()
    }, [navigate, dispatch])
}


export default useRedirectUser