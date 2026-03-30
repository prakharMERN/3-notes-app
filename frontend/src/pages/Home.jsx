import { useEffect, useState } from 'react'
import { useNote } from '../hooks/useNote'
import NoteList from '../components/NoteList'
import Loading from '../components/Loading'
import AddNote from '../components/AddNote'

const Home = () => {
    const { getNotes, isNotesChanged } = useNote()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [notes, setNotes] = useState([])

    const handleGetNotes = async () => {
        try {
            const res = await getNotes(setLoading, setError)
            // console.log(res)
            if (res) {
                setNotes(res)
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        handleGetNotes()
    }, [isNotesChanged])


    return (
        <div className='bg-base-100 w-full min-h-screen p-4'>

            {/* Heading */}
            <h1 className='text-center text-primary font-semibold font-mono text-4xl py-4'>Hello <span className='italic'>{JSON.parse(localStorage.getItem('name'))}</span></h1>

            {/* Add Button */}
            <div className='fixed p-2 px-8 w-full z-10 bottom-0 flex h-16 justify-center md:top-4 md:justify-end'>
                <AddNote />
            </div>

            {/* if Errors */}
            <p>{error}</p>

            {/* Notes List */}
            {loading ?
                <div className='flex justify-center p-8'>
                    <Loading />
                </div> :
                notes?.length > 0 ?
                    <NoteList notes={notes} />
                    :
                    <h3 className='text-center text-xl py-8'>No notes exist</h3>
            }


        </div>
    )
}

export default Home