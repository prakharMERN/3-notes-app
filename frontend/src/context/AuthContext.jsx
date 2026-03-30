import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { api } from "../api/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [name, setName] = useLocalStorage('name', 'user')
    const [token, setToken] = useLocalStorage('token', null)
    const [isAuthorized, setIsAuthorized] = useState(false)

    const register = async (formData, setLoading, setError, setRegistered) => {
        try {
            setLoading(true)
            const res = await api.post('/users/register', formData)
            const data = res.data
            setLoading(false)
            if (data?.success === true) {
                setToken(data?.data?.token)
                setIsAuthorized(true)
                setName(data?.data?.user)
                return setRegistered(true)
            }
            return setRegistered(false)
        } catch (error) {
            setError(error?.response?.data?.message)
            setLoading(false)
        }
    }

    const login = async (formData, setLoading, setError, setLoggedIn) => {
        try {
            setLoading(true)
            const res = await api.post('/users/login', formData)
            const data = res.data
            setLoading(false)
            if (data?.success === true) {
                setToken(data?.data?.token)
                setIsAuthorized(true)
                setName(data?.data?.user)
                return setLoggedIn(true)
            }
            return setLoggedIn(false)
        } catch (error) {
            setError(error?.response?.data?.message)
            setLoading(false)
        }
    }

    const me = async (setLoading, setError) => {
        try {
            // setLoading(true)
            const res = await api.get('/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = res.data
            if (data?.success === true) {
                setIsAuthorized(true)
                setName(data?.data?.user)
                return setLoading(false)
            }
            return setLoading(false)
        } catch (error) {
            setError(error?.response?.data?.message)
            setLoading(false)
        }
    }


    return <AuthContext.Provider value={{ login, register, me, isAuthorized }}>
        {children}
    </AuthContext.Provider>
}