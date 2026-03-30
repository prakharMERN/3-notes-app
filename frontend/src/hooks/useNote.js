import { useContext } from "react"
import { NoteContext } from "../context/NoteContext"

export const useNote = () => {
    const context = useContext(NoteContext)

    // console.log(context)

    if (!context) {
        throw new Error('useNote cant be used outside NoteProvider')
    }

    return context
}