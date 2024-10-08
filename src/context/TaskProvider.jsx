import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../service/firebase'
import toast from 'react-hot-toast'

const TaskContext = createContext()

export const useTask = () => {
    return useContext(TaskContext)
}

export default function TaskProvider({ children }) {

    const API = import.meta.env.VITE_API_URL

    const [showSearch, setShowSearch] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [filter, setFilter] = useState({ all: true, complete: false, incomplete: false })
    const [tasks, setTasks] = useState(null)
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState(true)

    const [user, setUser] = useState(null)

    // Auth
    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false)
            } else {
                setUser(null);
                setLoading(false)
            }
        });
        return () => unsubscribe();
    }, [state]);




    // Backend
    const fetchUserTasks = async () => {
        try {
            if (user) {
                setLoading(true);
                const res = await fetch(`${API}/user-tasks/${user.uid}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.uid}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) throw new Error('Failed to fetch tasks');

                const data = await res.json();
                setLoading(false);

                if (data) {
                    setTasks(data);
                } else {
                    // console.log('No tasks found');
                    setTasks([]);
                }
            }
        } catch (error) {
            // console.log('Error fetching tasks:', error);
            toast.error('Something went wrong')
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserTasks();
        }
    }, [user, state]);


    const newTask = async (title, description, createdBy) => {
        setLoading(true)
        try {
            await axios.post(`${API}`, { title, description, createdBy, uid: user.uid })
            fetchUserTasks()
        } catch (error) {
            console.log('error new task : ', error);
        } finally {
            setLoading(false)
        }
    }

    const updateTask = async (id, title, description) => {
        setLoading(true)
        try {
            await axios.put(`${API}/update/${id}`, { title, description, uid: user.uid })
            await fetchUserTasks()
        } catch (error) {
            console.log('error update task : ', error);
        } finally {
            setLoading(false)
        }
    }

    const toggleComplete = async (id) => {
        setLoading(true)
        try {
            await axios.put(`${API}/toggle-complete/${id}`, { uid: user.uid })
            await fetchUserTasks()
        } catch (error) {
            console.log('error toggle task : ', error);
        } finally {
            setLoading(false)
        }
    }

    const deleteTask = async (id) => {
        setLoading(true)
        try {
            await axios.delete(`${API}/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.uid}`,
                    'Content-Type': 'application/json',
                }
            })
            await fetchUserTasks()
        } catch (error) {
            console.log('error delete task : ', error);
        } finally {
            setLoading(false)
        }
    }

    const values = { user, setUser, showSearch, setShowSearch, showFilter, setShowFilter, searchValue, setSearchValue, filter, setFilter, tasks, loading, setLoading, newTask, updateTask, toggleComplete, deleteTask, state, setState }
    return (
        <TaskContext.Provider value={values}>
            {children}
        </TaskContext.Provider>
    )
}
