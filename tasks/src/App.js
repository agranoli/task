import "./App.css";

import Sidebar from "./components/Sidebar";
import AddProject from "./components/AddProject";
function App(){
    return (
        <div className="mainApp">
            <AddProject />
            <Sidebar />
        </div>
    );
}

export default App;