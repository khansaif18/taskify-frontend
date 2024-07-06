import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const TodoContext = createContext();

export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoProvider = (props) => {
    const [inputTodo, setInputTodo] = useState('');
    const [description, setDescription] = useState('');
    const [createDate, setCreateDate] = useState('')
    const [todos, setTodos] = useState(() => {
        // Get todos from local storage during initialization
        const storedTodos = localStorage.getItem('taskify');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    const [editedText, setEditedText] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [updateDate, setUpdateDate] = useState('')
    const [editStatus, setEditStaus] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [socialShow, setSocialShow] = useState(false)

    // Save todos to local storage whenever the todos state changes

    useEffect(() => {
        localStorage.setItem('taskify', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (title, description, createDate) => {
        const id = uuidv4()
        setTodos([
            {
                id: id,
                title: title,
                description: description,
                createDate: createDate
            },
            ...todos
        ]);
    };

    const updateTodo = (id, title, description, updateDate) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    title: title,
                    description: description,
                    updateDate: updateDate
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const removeTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const statesToPass = {
        inputTodo,
        setInputTodo,
        description,
        setDescription,
        createDate,
        setCreateDate,
        todos,
        setTodos,
        editedText,
        setEditedText,
        editedDescription,
        setEditedDescription,
        updateDate,
        setUpdateDate,
        editStatus,
        setEditStaus,
        editId,
        setEditId,
        showForm,
        setShowForm,
        socialShow,
        setSocialShow,
        addTodo,
        removeTodo,
        updateTodo
    };

    return (
        <TodoContext.Provider value={statesToPass}>
            {props.children}
        </TodoContext.Provider>
    );
};
