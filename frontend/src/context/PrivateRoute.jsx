import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import Layout from '../pages/Layout'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'

const PrivateRoute = () => {
    const { isAuthorized, me } = useAuth()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const auth = async () => {
        try {
            await me(setLoading, setError)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        auth()
    }, [])

    // return isAuthorized ? <Layout /> : <Navigate to={'/login'} />
    return loading ?
        <div>
            <h1 className='skeleton-text skeleton text-center text-3xl'>Loading . . . . </h1>
            <div className='flex justify-center py-8'>
                <Loading />
            </div>
        </div>
        : isAuthorized ? <Layout /> : <Navigate to={'/login'} />
}

export default PrivateRoute