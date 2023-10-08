import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Oval } from "react-loader-spinner";

const SignUp = () => {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // validation
        if (password.length < 6) return toast.error("Password must be upto 6 characters.")
        if (password !== confirmPassword) return toast.error("Password do not match.")

        // firebase authentication
        try {
            setLoading(true)
            const res = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(res.user, {
                displayName: name
            })
            await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                name,
                email,
            })
            // creting empty user contacts
            await setDoc(doc(db, 'userContacts', res.user.uid), {})
            setLoading(false)
            navigate("/chats")
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error("Something went Wrong")
        }

    }

    return (
        <div className="max-w-screen-xl mx-auto min-h-screen px-5 xl:px-0 flex relative" >
            <div className=" flex items-center justify-center w-full" >
                <form onSubmit={handleSubmit} className="border max-w-md w-full p-5 rounded shadow-md" >
                    <div className="border-b pb-2">
                        <h2 className=" text-2xl font-semibold font-inter" >Register</h2>
                        <p className="mt-1 text-slate-600" >Create your account</p>
                    </div>
                    <div className="my-5" >
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="p-2 border w-full rounded focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="my-5" >
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2 border w-full rounded focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="my-5" >
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-2 border w-full rounded focus:outline-none focus:border-blue-500" required autoComplete="off" />
                    </div>
                    <div className="my-5" >
                        <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="p-2 border w-full rounded focus:outline-none focus:border-blue-500" required autoComplete="off" />
                    </div>
                    <div className="my-5" >
                        <button type="submit" className="w-full flex justify-center items-center text-center bg-blue-500 h-10 text-white rounded hover:bg-blue-600 font-inter font-medium transition-all" >{
                            !loading ? "Register" :
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
                        }</button>                    </div>
                    <div className="mt-5" >
                        <p className="mt-1 text-slate-600 text-center" >Already have an account? <Link to="/" className="text-blue-500" >Login</Link></p>
                    </div>
                </form>
            </div>
            <div className=" absolute top-14 left-0 w-full" >
                <h1 className="text-center font-inter font-bold text-4xl text-slate-800" >BabyCode</h1>
            </div>
        </div>
    )
}

export default SignUp