import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TaskPage from "./pages/taskPage";
import ProjectPage from "./pages/ProjectPage";

function App(){
    return (
        <Router>
            <div className="main">
                <Routes>
                    {/*<Route path="/" element={} />*/}
                    <Route path="/tasks" element={<TaskPage />} />
                    <Route path="/project" element={<ProjectPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
