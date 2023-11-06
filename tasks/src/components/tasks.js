import React, { useState } from "react";
import "./tasks.css";

function Tasks() {
    const [showForm, setShowForm] = useState(false);

    const handleAddTaskClick = () => {
        setShowForm(true);
    };

    const handleCloseFormClick = () => {
        setShowForm(false);
    };

    return(
        <>
            <div className="main">
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
            <div className="tasksBox">
                <div className="flex-column">
                    <h1>User</h1>
                    <div className="horizontal-line"></div>
                    <div className="user">
                        <div className="profile-circle">
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"></img>
                        </div>
                        <div className="profile-circle">
                            <img src="https://images.squarespace-cdn.com/content/v1/60d2052696041e771b8b7a60/6173a084-afec-4724-8b96-d2955e1844ec/%C2%A9MirjamLetsch-AUGURK-4.jpg"></img>
                        </div>
                    </div>
                </div>
                <div className="vertical-line"></div>
                <div className="flex-column">
                    <h1>Task</h1>
                    <div className="horizontal-line"></div>
                    <div className="task">
                        <h1>Izmazgāt grīdu</h1>
                    </div>
                    <div className="task">
                        <h1>Izmazgāt grīdu</h1>
                    </div>
                </div>
                <div className="vertical-line"></div>
                <div className="flex-column">
                    <h1>Status</h1>
                    <div className="horizontal-line"></div>
                    <div className="status">
                        <h1>In Progress</h1>
                    </div>
                    <div className="status">
                        <h1>In Progress</h1>
                    </div>
                </div>
                <div className="vertical-line"></div>
                <div className="flex-column">
                    <h1>Due Date</h1>
                    <div className="horizontal-line"></div>
                    <div className="due-date">
                        <h1>06.11.2023</h1>
                    </div>
                    <div className="due-date">
                        <h1>06.11.2023</h1>
                    </div>
                </div>
                <div className="vertical-line"></div>
                <div className="flex-column">
                    <h1>Priority</h1>
                    <div className="horizontal-line"></div>
                    <div className="priority">
                        <h1>⭐⭐⭐</h1>
                    </div>
                    <div className="priority">
                        <h1>⭐⭐⭐⭐⭐</h1>
                    </div>
                </div>
            </div>
      </div>
      </>
    );
}

export default Tasks;