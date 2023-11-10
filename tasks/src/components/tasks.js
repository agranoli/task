    import React, {useEffect, useState} from "react";
    import "./tasks.css";



    function Tasks() {
        const [showForm, setShowForm] = useState(false);

        const handleAddTaskClick = () => {
            setShowForm(true);
        };

        const handleCloseFormClick = () => {
            setShowForm(false);
        };

        const [tasks, setTasks] = useState([]);

        useEffect(() => {
            fetch("http://localhost/datubazes/task/")
                .then((response) => response.json())
                .then((data) => setTasks(data))
                .catch((error) => console.error("Error:", error));
        }, []);

    return(
        <>

                <button className="add-task" onClick={showForm ? handleCloseFormClick : handleAddTaskClick}>
                    {showForm ? "+" : "+"}
                </button>
                {showForm && (
                    <div className="add-task-form">
                        <button className="close-button" onClick={handleCloseFormClick}>Close</button>
                        <h1>Add A New Task</h1>
                        <select>
                            <option>Kevins</option>
                            <option>***</option>
                            <option>***</option>
                        </select>
                        <input type="text" placeholder="Insert A Task...." />
                        <input type="date" />
                        <div className="star-rating">
                            <input type="radio" id="star5" name="rating" value="5" />
                            <label htmlFor="star5">★</label>
                            <input type="radio" id="star4" name="rating" value="4" />
                            <label htmlFor="star4">★</label>
                            <input type="radio" id="star3" name="rating" value="3" />
                            <label htmlFor="star3">★</label>
                            <input type="radio" id="star2" name="rating" value="2" />
                            <label htmlFor="star2">★</label>
                            <input type="radio" id="star1" name="rating" value="1" />
                            <label htmlFor="star1">★</label>
                        </div>
                        <button className="add-task-submit">Submit</button>
                    </div>

                )}
            {tasks.map((task) => (
                <>
                    <div className="flex-row-spacebetween">
                        <div className="flex-column">
                            <div className="user">
                                <h1>User</h1>
                                <div className="horizontal-line"></div>
                                <img className="profile-circle" src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw" alt="Profile" />
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
                                <h2>{task.status}</h2>
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
                                <h2>{'☆'.repeat(task.priority)}</h2>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </>
    );
    }

export default Tasks;