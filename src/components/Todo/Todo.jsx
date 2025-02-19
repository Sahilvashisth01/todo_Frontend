import React, { useState, useEffect } from 'react';
import './Todo.css';
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Todo = () => {
    const [inputs, setInputs] = useState({ title: "", body: "" });
    const [tasks, setTasks] = useState([]);
    const [expandedTaskIndex, setExpandedTaskIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false); // ✅ UI Fix

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const id = sessionStorage.getItem('id');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                console.log(`Fetching tasks from: http://localhost:1000/api/v2/getTask/${id}`);
                const response = await axios.get(`http://localhost:1000/api/v2/getTask/${id}`);
    
                console.log("API response data:", response.data); // Debugging line
    
                if (response.status === 200) {
                    if (response.data.list && response.data.list.length === 0) {
                        toast.info("No tasks found. Start by adding one!");
                    } else {
                        setTasks(response.data.list);
                        toast.success("Tasks fetched successfully!");
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setTasks([]);
                    toast.info("No tasks found. Start by adding one!");
                } else {
                    console.error("Error fetching tasks:", error);
                    toast.error("Failed to fetch tasks.");
                }
            }
        };
    
        if (id) fetchTasks();
    }, [id]);
    
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleExpandClick = (index) => {
        setExpandedTaskIndex(index === expandedTaskIndex ? null : index);
    };

    const handleUpdateClick = (task) => {
        setIsEditing(true);
        setEditTaskId(task._id);
        setInputs({ title: task.title, body: task.body });
        setShowUpdateForm(true); // ✅ Show update form properly
    };

    const handleCancelUpdate = () => {
        setIsEditing(false);
        setEditTaskId(null);
        setInputs({ title: "", body: "" });
        setShowUpdateForm(false); // ✅ Hide update form properly
    };

    const submit = async () => {
        if (inputs.title.trim() === "" || inputs.body.trim() === "") {
            toast.error("Title or Body cannot be empty.");
            return;
        }

        try {
            if (isEditing) {
                const response = await axios.put(`http://localhost:1000/api/v2/updateTask/${editTaskId}`, {
                    title: inputs.title,
                    body: inputs.body
                });

                if (response.status === 200) {
                    setTasks((prevTasks) =>
                        prevTasks.map((task) =>
                            task._id === editTaskId ? { ...task, title: inputs.title, body: inputs.body } : task
                        )
                    );

                    toast.success("Task updated successfully!");
                    handleCancelUpdate(); // ✅ Reset UI properly after update
                } else {
                    throw new Error("Server returned an unexpected response.");
                }
            } else {
                const response = await axios.post("http://localhost:1000/api/v2/addTask", {
                    title: inputs.title,
                    body: inputs.body,
                    id,
                });

                if (response.status === 200 || response.status === 201) {
                    setTasks([...tasks, response.data.list]);
                    toast.success("Task added successfully!");
                } else {
                    throw new Error("Unexpected response from server.");
                }
            }

            setInputs({ title: "", body: "" });
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to process task. Please check the server.");
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:1000/api/v2/deleteTask/${taskId}`);
            setTasks(tasks.filter((task) => task._id !== taskId));
            toast.success("Task deleted successfully!");
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Failed to delete task.");
        }
    };

    return (
        <>
            <div className="todo">
                <ToastContainer />
                <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                    <div className="d-flex flex-column todo-inputs-div w-50 p-1">
                        <input
                            type="text"
                            placeholder="TITLE"
                            className="my-2 p-2 todo-inputs"
                            name="title"
                            value={inputs.title}
                            onChange={handleChange}
                        />
                        <textarea
                            name="body"
                            placeholder="BODY"
                            className="p-2 todo-inputs"
                            value={inputs.body}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-50 d-flex justify-content-end my-3">
                        <button className="home-btn px-2 py-1" onClick={submit}>
                            {isEditing ? "Update Task" : "Add"}
                        </button>
                    </div>
                </div>

                <div className="todo-body">
                    <div className="container-fluid">
                        <div className="row">
                            {tasks.map((task, index) => (
                                <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                                    <TodoCards
                                        title={task.title}
                                        body={task.body}
                                        expanded={index === expandedTaskIndex}
                                        onExpandClick={() => handleExpandClick(index)}
                                        updateTask={() => handleUpdateClick(task)}
                                        delid={() => deleteTask(task._id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Update Form - Controlled via state */}
                {showUpdateForm && (
                    <div className="todo-update">
                        <div className="update container">
                            <h2>Update Task</h2>
                            <input
                                type="text"
                                placeholder="Updated Title"
                                className="p-2 my-2"
                                name="title"
                                value={inputs.title}
                                onChange={handleChange}
                            />
                            <textarea
                                name="body"
                                placeholder="Updated Body"
                                className="p-2"
                                value={inputs.body}
                                onChange={handleChange}
                            />
                            <button onClick={submit}>Save Changes</button>
                            <button onClick={handleCancelUpdate}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Todo;
