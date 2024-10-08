import { LogIn, LogOut, Search, SlidersHorizontal, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTask } from '../context/TaskProvider'
import { signout } from '../service/signIn'
import toast from 'react-hot-toast'

export default function Navbar({ }) {
    const location = useLocation()
    const nav = useNavigate()
    const [dpUrl, setDpUrl] = useState('')
    // const [showProfile, setShowProfile] = useState(false)
    const { tasks, user, setState, showSearch, setShowSearch, showFilter, setShowFilter, filter, setFilter, setSearchValue, setLoading } = useTask()

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (user) setDpUrl(user.photoURL)
    //     }, 2000);
    // }, [])


    return (
        <div className={`nav-border fixed top-0  w-full py-3  z-50 bg-[#1b1b1b] backdrop-blur-md`}>
            <nav className='flex items-center w-full justify-around z-40'>
                <h2 className='text-2xl tracking-wide font-bold flex items-center cursor-pointer'
                    onClick={() => nav('/')}>
                    <svg className="h-7 w-7 text-violet-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z" />
                    </svg>
                    Task<span className='text-violet-600'>ify</span>
                </h2>

                <div className='flex gap-2'>
                    {!user ?
                        <span className={`p-2 px-4 rounded-md bg-[#453c3c6a] hover:bg-violet-500 duration-200 cursor-pointer ${location.pathname === '/' ? '' : ' invisible '}`}
                            onClick={() => toast('Ye show ke liye lga rkha hai!', { icon: '🥱', })}
                        ><User size={18} /></span> :
                        <>
                            <span style={showSearch ? { backgroundColor: '#5b21b6' } : { background: 'none' }}

                                onClick={() => {
                                    setSearchValue('')
                                    setShowSearch(prev => !prev)
                                }} className={` ${location.pathname === '/' ? '' : 'invisible'}
                             p-2 rounded-md hover:bg-violet-500 duration-200 cursor-pointer 
                             ${tasks && tasks.length < 1 ? 'invisible ' : 'visible'}`}>
                                <Search size={20} />
                            </span>

                            <span style={showFilter ? { backgroundColor: '#5b21b6' } : { background: 'none' }} onClick={() => {
                                setShowFilter(!showFilter)
                                setFilter({ ...filter, all: true, complete: false, incomplete: false })
                            }
                            }
                                className={` ${location.pathname === '/' ? '' : 'invisible'}
                                ${tasks && tasks.length < 1 ? ' invisible ' : ' visible '}
                             p-2 rounded-md hover:bg-violet-500 duration-200 cursor-pointer`}> <SlidersHorizontal size={20} /></span>

                            <span className='p-2 rounded-md papa bg-violet-800  duration-200 cursor-pointer relative z-50'
                            // onClick={() => setShowProfile(prev => !prev)}
                            >
                                <img
                                    className='h-[20px] w-[20px] rounded-full'
                                    src={user.photoURL}
                                    alt={user.displayName.slice(0, 1)}
                                // onError={() => setDpUrl('https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?w=740')}
                                />

                                {
                                    !showSearch && !showFilter &&
                                    <div className=' px-2 beta py-3 rounded-lg absolute right-0 mt-[9px] flex items-center justify-start gap-2 flex-col bg-violet-800'>
                                        <p className='cursor-default bg-violet-600 flex w-[110px] px-3 py-[6px] rounded-lg  tracking-wide text-white hover:text-white '>{user.displayName.slice(0, 10)}</p>

                                        <button className='px-3 py-[6px]  w-[110px] flex items-center justify-start gap-1 rounded-lg hover:bg-violet-600 tracking-wide text-white/60 hover:text-white '
                                            onClick={() => {
                                                setLoading(true)
                                                signout().then(() => {
                                                    setState(prev => !prev)
                                                    // setShowProfile(false)
                                                    toast.success('Logged out')
                                                    setLoading(false)
                                                    nav('/')
                                                }).catch(() => toast.error('Something went wrong'))
                                            }} >
                                            Logout <LogOut size={14} />
                                        </button>
                                    </div>
                                }

                            </span>
                        </>
                    }
                </div>
            </nav>
        </div>
    )
}
