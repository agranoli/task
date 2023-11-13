import style from "./App.module.css";
import React from 'react';
import Tasks from "./components/tasks";
import MonthCalendar from "./components/calendar";
function App() {
    return (
        <>
            <div className={style.main}>
                <Tasks  />
                {/*<MonthCalendar />*/}
            </div>
        </>
    );
}

export default App;