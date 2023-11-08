import React, { useState, useEffect } from "react";
import "./calendar.css";

const MonthCalendar = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost/datubazes/task/")
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    const updatedTasks = tasks.map(task => {
            return {
                ...task,
                date: parseInt(task.dateAdded.toString().substring(0,2)),
                month: parseInt(task.month.toString().substring(3, 5)),
                normalDate: task.dateAdded,
                taskName: task.task,
                profilePic: task.profilePic,
                dueDate: task.dueDate,
                status: task.status,
                priority: task.priority
            };
    });



    console.log(updatedTasks);

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
        <>
            <h2>{new Date(currentYear, currentMonth - 1, 1).toLocaleString('default', { month: 'long' })} {currentYear}</h2>
            <div className="calendar-grid">
                {daysInMonth.map(day => (
                    <div key={day} className={`calendar-day ${expandedTask === day ? 'expanded' : ''} ${isPastDay(day) ? 'past-day' : ''} ${day === currentDate.getDate() ? 'current-day' : ''}`}>
                        <h4>{day}</h4>
                        {updatedTasks.map(task => {
                            if (task.date === day) {
                                return (
                                    <div key={task.normalDate} className="task" onClick={() => handleTaskClick(day)}>
                                        <img src={task.profilePic} />
                                        <span>{task.taskName}</span>
                                        {expandedTask === day && (
                                            <div className="task-details">
                                                <p>Due Date: {task.normalDate}</p>
                                                <p>Status: {task.status}</p>
                                                <div className="star-rating">
                                                    {Array.from({ length: task.priority }).map((_, i) => (
                                                        <span key={i} className="star">⭐</span>
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
    </>
    );
};

export default MonthCalendar;