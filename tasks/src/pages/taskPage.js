import Sidebar from "../components/Sidebar";
import Tasks from "../components/tasks";
import Calendar from "../components/calendar";
import './page.css';
function TaskPage(){
    return (
        <div className="responsive">
            <Sidebar />
            <div className="pageCol">
                <Tasks />
                <Calendar />
            </div>
        </div>
    );
}

export default TaskPage;