import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../firebase"
import toast from "react-hot-toast"
import { Oval } from "react-loader-spinner"



const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
            setLoading(false)
            navigate("/chats")
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error("Invalid Credentials")
        }

    }

    return (
        <div className="max-w-screen-xl mx-auto min-h-screen px-5 xl:px-0 flex relative" >
            <div className=" flex items-center justify-center w-full" >
                <form onSubmit={handleSubmit} className="border max-w-md w-full p-5 rounded shadow-md" >
                    <div className="border-b pb-2">
                        <h1 className=" text-3xl font-semibold font-inter" >Login</h1>
                        <p className="mt-1 text-slate-600" >Log in to your account</p>
                    </div>
                    <div className="my-5" >
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2 border w-full rounded focus:outline-none focus:border-blue-500" required autoComplete="off" />
                    </div>
                    <div className="my-5" >
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-2 border w-full rounded focus:outline-none focus:border-blue-500" required autoComplete="off" />
                    </div>
                    <div className="my-5" >
                        <button type="submit" className="w-full flex justify-center items-center text-center bg-blue-500 h-10 text-white rounded hover:bg-blue-600 font-inter font-medium transition-all" >{
                            !loading ? "Login" :
                                <Oval
                                    height={30}
                                    width={30}
                                    color="#ffffff"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#f4f4f4"
                                    strokeWidth={4}
                                    strokeWidthSecondary={4}

                                />
                        }</button>
                    </div>
                    <div className="mt-5" >
                        <p className="mt-1 text-slate-600 text-center" >Don&apos;t have an account? <Link to="/signup" className="text-blue-500" >SignUp</Link></p>
                    </div>
                </form>
            </div>
            <div className=" absolute top-14 left-0 w-full" >
                <h1 className="text-center font-inter font-bold text-4xl text-slate-800" >BabyCode</h1>
            </div>
        </div>
    )
}

export default Login
