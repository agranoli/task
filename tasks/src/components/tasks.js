import React, { useState, useEffect } from 'react';
import './tasks.css';

const SortableList = () => {
    const [sortBy, setSortBy] = useState('');
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [task, setTask] = useState('');
    const [progress , setProgress] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [starRating, setStarRating] = useState('');
    const [user, setUser] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState('');
    const [userError , setUserError] = useState('');
    const [taskError , setTaskError] = useState('');
    const [dateError , setDateError] = useState('');
    const [ratingError , setRatingError] = useState('');
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        fetch('http://localhost/datubazes/task/user.php')
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost/datubazes/task/')
            .then((response) => response.json())
            .then((data) => {
                const sortedItems = sortList(sortBy, data);
                setItems(sortedItems);
            })
            .catch((error) => console.error('Error:', error));
    }, [sortBy]);

    const handleSelectChange = (event) => {
        setSelectedUsername(event.target.value);
    };

    const handleSortChange = (event) => {
        const sortOption = event.target.value;
        setSortBy(sortOption);
    };

    const sortList = (sortOption, items) => {
        return [...items].sort((a, b) => {
            if (sortOption === 'asc') {
                const dateA = new Date(a.dueDate).getTime();
                const dateB = new Date(b.dueDate).getTime();
                return dateA - dateB;
            } else if (sortOption === 'desc') {
                const dateA = new Date(a.dueDate).getTime();
                const dateB = new Date(b.dueDate).getTime();
                return dateB - dateA;
            } else if (sortOption === 'descPri') {
                const priA = a.priority;
                const priB = b.priority;
                return priB - priA;
            } else if (sortOption === 'ascPri') {
                const priA = a.priority;
                const priB = b.priority;
                return priA - priB;
            }
            return 0;
        });
    };

    const handleAddTaskClick = () => {
        setShowForm(true);
    };

    const handleCloseFormClick = () => {
        setShowForm(false);
    };

    const handleEditForm = (taskId) => {
        const taskToEdit = items.find(task => task.id === taskId);

        if (taskToEdit) {
            setCurrentTask(taskToEdit);
            setTask(taskToEdit.task);
            setDueDate(taskToEdit.dueDate);
            setStarRating(taskToEdit.starRating);
            setShowEdit(true);
        } else {
            console.error("Task not found with ID:", taskId);
        }
    };

    const handleCloseEditForm = () => {
        setShowEdit(false);
    };

    const handleProgressChange = (event) => {
        setProgress(event.target.value);
    };

    const handleFormSubmit = async () => {
        if (!selectedUsername || !task || !dueDate || !starRating) {
            setUserError(!selectedUsername ? 'User cant be empty!' : '');
            setTaskError(!task ? 'Task cant be empty!' : '');
            setDateError(!dueDate ? 'Due Date cant be empty!' : '');
            setRatingError(!starRating ? 'Rating cant be empty!' : '');
            return;
        }

        const dateObject = new Date(dueDate);
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();
        const formattedDate = `${day}.${month}.${year}`;

        let cleanData = {
            task,
            dueDate: formattedDate,
            starRating,
            username: selectedUsername,
        };

        try {
            let response = await fetch('http://localhost/datubazes/task/taskInsert.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cleanData),
            });

            response = await response.json();
            console.log(response);
            const updatedData = await fetch('http://localhost/datubazes/task/').then((res) => res.json());
            const sortedItems = sortList(sortBy, updatedData);
            setItems(sortedItems);
            setShowForm(false);
            setShowEdit(false); // Close the edit form after submitting
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleEditSubmit = async (taskId) => {
        if (!selectedUsername || !task || !dueDate || !starRating) {
            setTaskError(!task ? 'Task cant be empty!' : '');
            setDateError(!dueDate ? 'Due Date cant be empty!' : '');
            return;
        }

        let cleanData = {
            task,
            dueDate,
            progress,

        };

        try {
            let response = await fetch(`http://localhost/datubazes/task/updateTask.php?id=${task.Id}`, {
                method: 'UPDATE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cleanData),
            });

            const updatedData = await fetch('http://localhost/datubazes/task/').then((res) => res.json());
            const sortedItems = sortList(sortBy, updatedData);
            setItems(sortedItems);
            setShowForm(false);
            setShowEdit(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            let response = await fetch(`http://localhost/datubazes/task/taskDelete.php?id=${taskId}`, {
                method: 'DELETE',
            });

            response = await response.json();
            console.log(response);

            const updatedData = await fetch('http://localhost/datubazes/task/').then((res) => res.json());
            const sortedItems = sortList(sortBy, updatedData);
            setItems(sortedItems);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getUserById = (userID) => {
        const userObj = user.find((user) => user.id === userID);
        return userObj ? userObj.username : "Unknown User";
    };

    const getUserImageById = (userId) => {
        const userObj = user.find((user) => user.id === userId);
        return userObj ? userObj.image : 'default-image-url';
    };

    const getStatusColor = (progress) => {
        if (progress === 'Not Started') {
            return 'red';
        } else if (progress === 'In Progress') {
            return 'orange';
        } else {
            return 'green';
        }
    };

    return (
        <>
            <div className="flex-row-spacebetween">
                <button className="add-task" onClick={showForm ? handleCloseFormClick : handleAddTaskClick}>
                    {showForm ? '-' : '+'}
                </button>
                <select className="custom-select" value={sortBy} onChange={handleSortChange}>
                    <option value="">Select a sort method</option>
                    <option value="asc">Sort by date ↑</option>
                    <option value="desc">Sort by date ↓</option>
                    <option value="ascPri">Sort by priority ↓</option>
                    <option value="descPri">Sort by priority ↑</option>
                </select>
            </div>

            {showForm && (
                <div className="add-task-form">
                    <button className="close-button" onClick={handleCloseFormClick}>
                        Close
                    </button>
                    <h1>Add A New Task</h1>
                    {userError && <p style={{ color: 'red' }}>{userError}</p>}
                    <select name="username" id="user" value={selectedUsername} onChange={handleSelectChange}>
                        <option value="">Choose a user!</option>
                        {user.map((userData) => (
                            <option key={userData.id} value={userData.id}>
                                {userData.username}
                            </option>
                        ))}
                    </select>
                    {taskError && <p style={{ color: 'red' }}>{taskError}</p>}
                    <input
                        type="text"
                        id="task"
                        name="task"
                        placeholder="Insert A Task...."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />

                    {dateError && <p style={{ color: 'red' }}>{dateError}</p>}
                    <input type="date" id="date" name="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

                    {ratingError && <p style={{ color: 'red' }}>{ratingError}</p>}
                    <div className="star-rating" id="rating">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <React.Fragment key={rating}>
                                <input
                                    type="radio"
                                    id={`star${rating}`}
                                    name="rating"
                                    value={rating}
                                    checked={starRating === `${rating}`}
                                    onChange={(e) => setStarRating(e.target.value)}
                                />
                                <label htmlFor={`star${rating}`}>★</label>
                            </React.Fragment>
                        ))}
                    </div>

                    <button className="add-task-submit" type="submit" onClick={handleFormSubmit}>
                        Submit
                    </button>
                </div>
            )}
            <div className="task-flex-row">
                {items.map((task) => (
                    <div className="task-box" key={task.id}>
                        <div className="task-flex-row">
                            <div className="flex-column">
                                <img
                                    className="task-profile-circle"
                                    src={getUserImageById(task.userID)}
                                    alt="Profile"
                                />
                                <h2>{getUserById(task.userID)}</h2>
                            </div>
                            <div className="flex-column">
                                <div className="text-box">
                                    <h2>{task.task}</h2>
                                </div>
                                <div className="status" style={{ backgroundColor: getStatusColor(task.progress) }}>
                                    <h3>{task.progress}</h3>
                                </div>
                                <h2 className="dueDate">{task.dueDate}</h2>
                                <h2>{'★ '.repeat(task.priority)}</h2>
                            </div>
                        </div>
                        <div className="flex-row-spacebetween">
                            <button className="edit-task" onClick={() => handleEditForm(task.id)}>Edit</button>
                            <button className="delete-task" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        </div>
                    </div>

                ))}
                {showEdit && (

                    <div className="task-edit-box">
                        {taskError && <p style={{ color: 'red' }}>{taskError}</p>}
                        <input
                            className="edit-task-input"
                            type="text"
                            id="task"
                            name="task"
                            placeholder="Insert A Task...."
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />

                        <select value={currentTask.progress} className="edit-progress-input" onChange={(e) => handleProgressChange(e)}>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>

                        {dateError && <p style={{ color: 'red' }}>{dateError}</p>}
                        <input type="date" className="edit-date-input" id="date" name="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

                        <button className="edit-task" type="submit" onClick={() => { handleEditSubmit(); handleCloseEditForm(); }}>
                            Submit
                        </button>
                        <button className="delete-task" onClick={handleCloseEditForm}>
                            Close
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default SortableList;
