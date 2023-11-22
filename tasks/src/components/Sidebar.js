import React, { useState } from 'react';
import '../styles/Sidebar.css';
import img from './ja.png';

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sidebarElements = ['Home', 'Projects', 'Tasks', '*User*'];

    const toggleSidebar = () => {
        setCurrentIndex((currentIndex + 1) % sidebarElements.length); // Update currentIndex first
        setIsCollapsed(!isCollapsed); // Then toggle isCollapsed
    };

    return (
        <div className={`mainSidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="topElement">
                <div className="SidebarElement">
                    {!isCollapsed && (
                        <img
                            src={img}
                            className="SidebarPhoto"
                            alt="User"
                        />
                    )}
                    <button className={`buttonImage ${isCollapsed && currentIndex !== 3 ? 'mirrored' : ''}`} onClick={toggleSidebar}></button>
                </div>
                <div className="SidebarElement">
                    {isCollapsed ? (
                        <img src="https://cdn.pixabay.com/photo/2014/04/03/00/41/house-309113_1280.png" alt="Collapsed" className="collapsedImage" />
                    ) : (
                        <p className="element">{sidebarElements[0]}</p>
                    )}
                </div>
                <div className="SidebarElement">
                    {isCollapsed ? (
                        <img src="https://icones.pro/wp-content/uploads/2021/04/icone-de-dossier-symbole-png-gris.png" alt="Collapsed" className="collapsedImage" />
                    ) : (
                        <p className="element">{sidebarElements[1]}</p>
                    )}
                </div>
                <div className="SidebarElement">
                    {isCollapsed ? (
                        <img src="https://cdn.icon-icons.com/icons2/2483/PNG/512/task_check_embossed_icon_149858.png" alt="Collapsed" className="collapsedImage" />
                    ) : (
                        <p className="element">{sidebarElements[2]}</p>
                    )}
                </div>
                </div>
            <div className="bottomElement">
                <div className="profileElement">
                    {isCollapsed ? (
                        <img
                            src="https://www.sunsetlearning.com/wp-content/uploads/2019/09/User-Icon-Grey-300x300.png"
                            alt="Collapsed"
                            className={`collapsedImage ${currentIndex !== 3 ? 'mirrored' : ''}`}
                        />
                    ) : (

                        <p className={`element mirrored`}>{sidebarElements[3]}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
