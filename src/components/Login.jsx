import { X } from 'lucide-react'
import React, { useState } from 'react'
import { googleSignIn } from '../service/signIn'
import { useTask } from '../context/TaskProvider'
import MiniLoader from './MiniLoader'
import toast from 'react-hot-toast'

export default function Login({ handleToggle }) {

    const [loading, setLoading] = useState(false)
    const { setState } = useTask()

    const handleLogin = () => {
        setLoading(true)
        try {
            googleSignIn().then(() => {
                toast.success('Logged in')
                setState(prev => !prev)
            })
        } catch (error) {
            console.log('error : ', error);
            toast.error('Could not Login, Try Again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-[250px]'>
            <button
                onClick={handleLogin}
                className="relative inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold transition-all focus:outline-none bg-violet-600 hover:bg-violet-800 duration-200"
                type="button">

                <span className="mr-2 inline-block">
                    <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white/80">
                        <path
                            d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                </span>
                Sign in with Google {loading ? <MiniLoader /> : ''}
            </button>
        </div>
    )
}
