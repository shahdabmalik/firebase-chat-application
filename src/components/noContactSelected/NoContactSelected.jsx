import { useSelector } from "react-redux"

const NoContactSelected = () => {

    const { inChat } = useSelector(state => state.chat)

    return (
        <div className={" sm:w-2/3 lg:w-3/4 " + (inChat ? " w-full " : " w-0 ")} >
            <div className="w-full sm:flex flex-col items-center justify-center h-full" >
                <h3 className=" font-inter font-semibold text-2xl" >No Contact Selected</h3>
                <p className="" >&larr; Select a contact to chat.</p>
            </div>
        </div>
    )
}

export default NoContactSelected