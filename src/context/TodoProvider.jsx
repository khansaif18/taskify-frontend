import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoProvider = (props) => {
    const [inputTodo, setInputTodo] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState(() => {
        // Get todos from local storage during initialization

        const storedTodos = localStorage.getItem('taskify');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    const [editedText, setEditedText] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editStatus, setEditStaus] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Save todos to local storage whenever the todos state changes

    useEffect(() => {
        localStorage.setItem('taskify', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (title, description, date) => {
        const id = Date.now();
        setTodos([
            {
                id: id,
                title: title,
                description: description,
                date: date,
            },
            ...todos
        ]);
    };

    const updateTodo = (id, title, description, date) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    title: title,
                    description: description,
                    date: date
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
        todos,
        setTodos,
        editedText,
        setEditedText,
        editedDescription,
        setEditedDescription,
        editStatus,
        setEditStaus,
        editId,
        setEditId,
        showForm,
        setShowForm,
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
