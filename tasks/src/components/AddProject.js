import "../styles/AddProject.css";
import React, { useState, useEffect } from 'react';

const ItemSelection = ({ query, setQuery, setItems, items }) => {
    const fetchItems = async (query) => {
        try {
            const response = await fetch(`http://localhost:8888/api/janire/GetUsers.php?query=${query}`);
            if (response.ok) {
                const data = await response.json();
                setItems(data);
            } else {
                console.error('Error fetching items:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleItemClick = (selectedItem) => {
        setQuery(selectedItem);
        setItems([]); // Clear the items
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul>
                {items.map((item) => (
                    <li key={item.name} onClick={() => handleItemClick(item.name)}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

function AddProject() {
    const [projectName, setProjectName] = useState('');
    const [participantsQuery, setParticipantsQuery] = useState('');
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        if (participantsQuery.trim() !== '') {
            // Fetch participants from the server based on the input value
            fetchItems(participantsQuery);
        } else {
            // Clear the participants if the input is empty
            setParticipants([]);
        }
    }, [participantsQuery]);

    const fetchItems = async (query) => {
        try {
            const response = await fetch(`getItems.php?query=${query}`);
            if (response.ok) {
                const data = await response.json();
                setParticipants(data);
            } else {
                console.error('Error fetching items:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    return (
        <div className="mainAdder">
            <div className="addBox">
                <div className="addHeader">
                    <p className="addHeading">Add Project</p>
                </div>
                <div className="addElements">
                    <label className="addColumn">
                        Project Name:
                        <input
                            className="addInput"
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </label>
                    <label className="addColumn">
                        Participants:
                        <ItemSelection
                            query={participantsQuery}
                            setQuery={setParticipantsQuery}
                            setItems={setParticipants}
                            items={participants}
                        />
                    </label>
                    <label className="addColumn">
                        Project Author:
                        <select
                            name="author"
                            id="author"
                            className="addInput"
                        >
                            <option value="">Select Author</option>
                            <option>author #1</option>
                            <option>author #2</option>
                            <option>author #3</option>
                        </select>
                    </label>
                </div>
                <div className="addButtons">
                    <button className="addButs">Close</button>
                    <button type="submit" className="addButs">Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default AddProject;
