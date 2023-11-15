import React, { useState, useEffect } from 'react';
import "./tasks.css";

function SortableList() {
    const [sortBy, setSortBy] = useState('');
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        user: '',
        task: '',
        rating: ''
    })

    useEffect(() => {
        fetch("http://localhost/datubazes/task/")
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        sortList(event.target.value);
    };

    const sortList = (sortOrder) => {
        const sortedItems = [...items].sort((a, b) => {
            if (sortOrder === 'asc' || sortOrder === 'desc') {
                const dateA = new Date(a.dueDate);
                const dateB = new Date(b.dueDate);
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            }
            return 0;
        });

        setItems(sortedItems);
    };

    const handleAddTaskClick = () => {
        setShowForm(true);
    };

    const handleCloseFormClick = () => {
        setShowForm(false);
    };

    const handleInputChange = (e) => {
        const { task, value } = e.target;
        setFormData({
          ...formData,
          [task]: value,
        });
      };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        // Implement form validation logic if needed
    
        try {
          const response = await fetch('your-api-endpoint', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
        } catch (error) {
          console.error('Error submitting form:', error);
        }
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
                </select>
            </div>
            {showForm && (
                <form className="add-task-form" onSubmit={handleFormSubmit}>
                    <button className="close-button" onClick={handleCloseFormClick}>Close</button>
                    <h1>Add A New Task</h1>
                    <select value={formData.user} onChange={handleInputChange}>
                        <option value="1">Kevins</option>
                        <option value="2">***</option>
                        <option value="3">***</option>
                    </select>
                    <input type="text" placeholder="Insert A Task...." value={formData.task} onChange={handleInputChange}/>
                    <input type="date" value={formData.dueDate} onChange={handleInputChange}/>
                    <div className="star-rating">
                        <input
                            type="radio"
                            id="star5"
                            name="rating"
                            value="5"
                            checked={formData.rating === '5'}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="star5">★</label>

                        <input
                            type="radio"
                            id="star4"
                            name="rating"
                            value="4"
                            checked={formData.rating === '4'}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="star4">★</label>

                        <input
                            type="radio"
                            id="star3"
                            name="rating"
                            value="3"
                            checked={formData.rating === '3'}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="star3">★</label>

                        <input
                            type="radio"
                            id="star2"
                            name="rating"
                            value="2"
                            checked={formData.rating === '2'}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="star2">★</label>

                        <input
                            type="radio"
                            id="star1"
                            name="rating"
                            value="1"
                            checked={formData.rating === '1'}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="star1">★</label>
                        </div>
                    <button className="add-task-submit" type="submit">Submit</button>
                </form>
            )}
            {items.map((task) => (
                <div key={task.id} className="flex-row-spacebetween">
                    <>
                        <div className="flex-row-spacebetween">
                            <div className="flex-column">
                                <div className="user">
                                    <h1>User</h1>
                                    <div className="horizontal-line"></div>
                                    <img className="profile-circle"
                                         src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
                                         alt="Profile"/>
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
                                    <h2>{'☆ '.repeat(task.priority)}</h2>
                                </div>
                            </div>
                        </div>
                </>
                </div>
            ))}
        </>
    );
}

export default SortableList;