import { Dialog, Transition } from '@headlessui/react'
import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { Fragment, useState } from 'react'
import { BsPersonFillAdd } from "react-icons/bs"
import { db } from '../../firebase'
import toast from 'react-hot-toast'
import { Oval } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { SET_INCHAT, SET_SELECTED_CONTACT } from '../../redux/features/chatSlice'


const AddFriends = () => {


    const [name, setName] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    let [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.auth.user)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    const handleSearch = async () => {
        if (name === "") return

        try {
            setLoading(true)
            let allUser = []
            const querySnapshot = await getDocs(collection(db, 'users'))
            querySnapshot.forEach((doc) => {
                allUser.push(doc.data())
            })
            const result = allUser.filter((u) => u.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
            setUsers(result)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error('Error searching user.')
        }

    }

    const handleSearchClick = async (user) => {
        // check whether chats availabe
        const combinedId = loggedInUser.uid > user.uid ? loggedInUser.uid + user.uid : user.uid + loggedInUser.uid
        try {
            const res = await getDoc(doc(db, 'chats', combinedId))
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] })

                // create user chats
                await updateDoc(doc(db, "userContacts", loggedInUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        name: user.name,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
                await updateDoc(doc(db, "userContacts", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: loggedInUser.uid,
                        name: loggedInUser.name,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }
            dispatch(SET_SELECTED_CONTACT(user))
            dispatch(SET_INCHAT(true))
            closeModal()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='font-nunito'>
            <button type='button' className='bg-blue-500 text-sm text-white p-1 font-semibold rounded-md' onClick={openModal}><BsPersonFillAdd size={24} /></button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md h-96 transform overflow-hidden rounded-md bg-white p-3 text-left align-middle shadow-xl transition-all">
                                    <h3 className='text-lg font-semibold border-b' >Search User</h3>
                                    <div className=" my-3 flex gap-2 items-center w-full" >
                                        <input className="w-full bg-slate-100 p-2 focus:outline-none text-xs rounded-md " type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                                        <button type="button" className="bg-blue-500 text-xs text-white h-8 rounded-md px-2.5 py-1" onClick={handleSearch} >
                                            {!loading ? "Search" :
                                                <Oval
                                                    height={18}
                                                    width={18}
                                                    color="#ffffff"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                    visible={true}
                                                    ariaLabel='oval-loading'
                                                    secondaryColor="#f4f4f4"
                                                    strokeWidth={4}
                                                    strokeWidthSecondary={4}
                                                />
                                            }
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2" >
                                        {users.map((user) => {

                                           return <div key={user.uid} className={'w-full flex items-center gap-3 p-2 border-b border-b-slate-300 cursor-pointer hover:bg-slate-50 '} onClick={()=> handleSearchClick(user)} >
                                                <div className='w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold border-slate-900' >{user?.name.split('')[0].toUpperCase()}</div>
                                                <div className="" >
                                                    <p className="font-bold" >{user?.name}</p>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default AddFriends