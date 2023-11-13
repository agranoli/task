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
        const monthNumber = task.month ? parseInt(task.month.toString().substring(3, 5)) : null;
        return {
            ...task,
            date: parseInt(task.dueDate.toString().substring(0,2)),
            monthNumber: monthNumber,
            normalDate: task.dueDate,
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
                            if (task.date === day && task.monthNumber === currentMonth) {
                                return (
                                    <div key={task.normalDate} className="task" onClick={() => handleTaskClick(day)}>
                                        <img src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw" />
                                        <span>{task.taskName}</span>
                                        {expandedTask === day && (
                                            <div className="task-details">
                                                <p>Due Date: {task.normalDate}</p>
                                                <p>Status: {task.status}</p>
                                                <p>Priority: </p>
                                                <div className="star-rating">

                                                    {Array.from({ length: task.priority }).map((_, i) => (
                                                        <p key={i} className="star">☆</p>
                                                    ))}
                                                </div>
                                                <div className="horizontal-line"></div>
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