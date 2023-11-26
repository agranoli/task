import Sidebar from "../components/Sidebar";
import AddProject from "../components/AddProject";
import './page.css';
function ProjectPage(){
    return (
        <div className="responsive">
            <Sidebar />
            <AddProject />
        </div>
    );
}

export default ProjectPage;