import { createContext, useState } from "react";
import { api } from "../api/api";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const NoteContext = createContext()

export const NoteProvider = ({ children }) => {
    const [isNotesChanged, setNotesChanged] = useState(0)
    const [token, setToken] = useLocalStorage('token', null)

    const getNotes = async (setLoading, setError) => {
        try {
            setLoading(true)
            const res = await api.get('/notes/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = res.data
            if (data && data?.data) {
                setLoading(false)
                return data.data
            }
        } catch (error) {
            console.log(error, error?.response?.data?.message)
            setError(error?.response?.data?.message)
            setLoading(false)
        }
    }

    const postNote = async (setLoading, setError, note) => {
        try {
            setLoading(true)
            setError('')
            const res = await api.post('/notes/', note, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data)
            const data = res.data
            if (data && data?.data) {
                setLoading(false)
                return data.data
            }
            return null
        } catch (error) {
            // console.log(error, error?.response?.data)
            setError(error?.response?.data?.message)
            setLoading(false)
            return null
        }
    }
    const putNote = async (setLoading, setError, id, updatedNote) => {
        try {
            setLoading(true)
            setError('')
            const res = await api.put(`/notes/${id}`, updatedNote, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data)
            const data = res.data
            if (data && data?.data) {
                setLoading(false)
                return data.data
            }
            return null
        } catch (error) {
            // console.log(error, error?.response?.data)
            setError(error?.response?.data?.message)
            setLoading(false)
            return null
        }
    }

    const deleteNote = async (setLoading, id) => {
        try {
            setLoading(true)
            const res = await api.delete(`/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data)
            const data = res.data
            if (data && data?.data) {
                setLoading(false)
                return data.data
            }
            return null
        } catch (error) {
            // console.log(error, error?.response?.data)
            // setError(error?.response?.data?.message)
            setLoading(false)
            return null
        }
    }

    return <NoteContext.Provider value={{ getNotes, postNote, putNote, deleteNote, isNotesChanged, setNotesChanged }}>
        {children}
    </NoteContext.Provider>
}