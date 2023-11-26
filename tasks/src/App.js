import "./App.css";

import style from "./App.css";
import React from 'react';
import Tasks from "./components/tasks";
import MonthCalendar from "./components/calendar";
import Sidebar from "./components/Sidebar";
import AddProject from "./components/AddProject";

function App() {
    function App(){
        return (
            <>
                <div className="main">
                    <Tasks  />
                    <MonthCalendar />
                    <Sidebar />
                </div>
            </>
        <div className="mainApp">
            <Sidebar />
            <AddProject />
        </div>
    );
    }
