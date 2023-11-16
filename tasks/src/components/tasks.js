import React, { useState, useEffect } from 'react';
import "./tasks.css";

const SortableList = () => {
    const [sortBy, setSortBy] = useState('');
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [starRating, setStarRating] = useState('');

    useEffect(() => {
        fetch("http://localhost/datubazes/task/")
            .then((response) => response.json())
            .then((data) => {
                const sortedItems = sortList(sortBy, data);
                setItems(sortedItems);
            })
            .catch((error) => console.error("Error:", error));
    }, [sortBy]);

    const handleSortChange = (event) => {
        const sortOption = event.target.value;
        setSortBy(sortOption);
    };

    const sortList = (sortOption, items) => {
        const sortedItems = [...items].sort((a, b) => {
            if (sortOption === 'asc') {
                const dateA = new Date(a.dueDate);
                const dateB = new Date(b.dueDate);
                return dateA - dateB;
            } else if (sortOption === 'desc') {
                const dateA = new Date(a.dueDate);
                const dateB = new Date(b.dueDate);
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

        return sortedItems;
    };

    const handleAddTaskClick = () => {
        setShowForm(true);
    };

    const handleCloseFormClick = () => {
        setShowForm(false);
    };

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
    };


    const handleFormSubmit = async () => {
        const dateObject = new Date(dueDate);
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();
        const formattedDate = `${day}.${month}.${year}`;

        let cleanData = { task, dueDate: formattedDate, starRating };

            let response = await fetch('http://localhost/datubazes/task/taskInsert.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cleanData),
            });
            response = await response.json();
            console.log(response);

    };

    return (
        <>
            <div className="flex-row-spacebetween">
                <button className="add-task" onClick={showForm ? handleCloseFormClick : handleAddTaskClick}>
                    {showForm ? "-" : "+"}
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
                    <button className="close-button" onClick={handleCloseFormClick}>Close</button>
                    <h1>Add A New Task</h1>
                    <p className="vaidation" id="userP"></p>
                    <select name="user" id="user" value={selectedValue} onChange={handleSelectChange}>
                        <option value="">Choose a user!</option>
                        <option value="1">Kevins</option>
                        <option value="2">***</option>
                        <option value="3">***</option>
                    </select>

                    <p className="vaidation" id="taskP"></p>
                    <input
                        type="text"
                        id="task"
                        name="task"
                        placeholder="Insert A Task...."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />

                    <p className="vaidation" id="dateP"></p>
                    <input
                        type="date"
                        id="date"
                        name="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />

                    <p className="vaidation" id="ratingP"></p>
                    <div className="star-rating" id="rating">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <>
                                <input
                                    type="radio"
                                    id={`star${rating}`}
                                    name="rating"
                                    value={rating}
                                    checked={starRating === `${rating}`}
                                    onChange={(e) => setStarRating(e.target.value)}
                                />
                                <label htmlFor={`star${rating}`}>★</label>
                            </>
                        ))}
                    </div>

                    <button className="add-task-submit" type="submit" onClick={handleFormSubmit}>Submit</button>
                </div>
            )}
            {items.map((task) => (
                    <>
                        <div key={task.id} className="flex-row-spacebetween">
                            <div className="flex-column">
                                <div className="user">
                                    <h1>User</h1>
                                    <div className="horizontal-line"></div>
                                    <img className="profile-circle"
                                         src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
                                         alt="Profile"/>
                                    <h3>*UserName*</h3>
                                </div>
                            </div>
                            <div className="vertical-line"></div>
                            <div className="flex-column">
                                <div className="task">
                                    <h1>Task</h1>
                                    <div className="horizontal-line"></div>
                                    <h2>{task.task}</h2>
                                </div>
                            </div>
                            <div className="vertical-line"></div>
                            <div className="flex-column">
                                <div className="status">
                                    <h1>Status</h1>
                                    <div className="horizontal-line"></div>
                                    <h2>{task.progress}</h2>
                                </div>
                            </div>
                            <div className="vertical-line"></div>
                            <div className="flex-column">
                                <div className="due-date">
                                    <h1>DueDate</h1>
                                    <div className="horizontal-line"></div>
                                    <h2>{task.dueDate}</h2>
                                </div>
                            </div>
                            <div className="vertical-line"></div>
                            <div className="flex-column">
                                <div className="priority">
                                    <h1>Priority</h1>
                                    <div className="horizontal-line"></div>
                                    <h2>{'☆ '.repeat(task.priority)}</h2>
                                </div>
                            </div>
                        </div>
                </>
            ))}
        </>
    );
}

export default SortableList;