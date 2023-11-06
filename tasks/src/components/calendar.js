import React, { useState } from 'react';
import "./calendar.css";

const MonthCalendar = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

    const tasks = [
        { date: 11, taskName: "Meeting", profilePic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", dueDate: "2023-11-05", priority: 3 },
        { date: 12, taskName: "Presentation", profilePic: "https://images.squarespace-cdn.com/content/v1/60d2052696041e771b8b7a60/6173a084-afec-4724-8b96-d2955e1844ec/%C2%A9MirjamLetsch-AUGURK-4.jpg", dueDate: "2023-11-12", priority: 4 },
        // Add more tasks as needed
    ];

    const daysInMonth = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);

    const [expandedTask, setExpandedTask] = useState(null);

    const handleTaskClick = (index) => {
        if (expandedTask === index) {
            setExpandedTask(null);
        } else {
            setExpandedTask(index);
        }
    };

    const isPastDay = (day) => {
        const today = new Date(currentYear, currentMonth - 1, day);
        return today < currentDate;
    };

    return (
        <div>
            <h2>{new Date(currentYear, currentMonth - 1, 1).toLocaleString('default', { month: 'long' })} {currentYear}</h2>
            <div className="calendar-grid">
                {daysInMonth.map(day => (
                    <div key={day} className={`calendar-day ${expandedTask === day ? 'expanded' : ''} ${isPastDay(day) ? 'past-day' : ''} ${day === currentDate.getDate() ? 'current-day' : ''}`}>
                        <span>{day}</span>
                        {tasks.map(task => {
                            if (task.date === day) {
                                return (
                                    <div key={task.date} className="task" onClick={() => handleTaskClick(day)}>
                                        <img src={task.profilePic} alt="Profile" />
                                        <span>{task.taskName}</span>
                                        {expandedTask === day && (
                                            <div className="task-details">
                                                <p>Due Date: {task.dueDate}</p>
                                                <p>Priority: {task.priority}</p>
                                                <div className="star-rating">
                                                    {[...Array(task.priority)].map((_, i) => (
                                                        <span key={i} className="star">&#9733;</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthCalendar;
