import "../styles/AddProject.css";
import React, { useState, useEffect } from 'react';

const ItemSelection = ({
                           selectedParticipants,
                           handleSelect,
                           handleRemove,
                           query,
                           setQuery,
                           setItems,
                           items,
                       }) => {
    const [typingTimeout, setTypingTimeout] = useState(0);

    const fetchItems = async (query) => {
        try {
            const response = await fetch(`http://localhost:8888/janire/GetUsers.php?query=${query}`);
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

    const handleInputChange = (e) => {
        const inputQuery = e.target.value;
        setQuery(inputQuery);
    };

    const handleItemClick = (selectedItem) => {
        if (!selectedParticipants.includes(selectedItem)) {
            handleSelect(selectedItem);
            setQuery('');
            setItems([]); // Clear the items
        }
    };

    const handleRemoveClick = (participant) => {
        handleRemove(participant);
    };

    // Filter out selected participants from the options
    const filteredOptions = items.filter((item) => !selectedParticipants.includes(item.username));

    return (
        <div className="addParticipats">
            <div className="search">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                />
                <ul className="options">
                    {filteredOptions.map((item) => (
                        <li key={item.username} onClick={() => handleItemClick(item.username)}>
                            {item.username}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="selection-box">
                <p>Selected Participants:</p>
                <ul>
                    {selectedParticipants.map((participant) => (
                        <li key={participant}>
                            {participant} <span onClick={() => handleRemoveClick(participant)}>Remove</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

function AddProject() {
    const [projectName, setProjectName] = useState('');
    const [participantsQuery, setParticipantsQuery] = useState('');
    const [participants, setParticipants] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);

    const handleProjectSubmission = async () => {
        const data = {
            projectName,
            projectLeader: "selected_leader", // Update this with the selected project leader
            selectedParticipants,
        };

        try {
            const response = await fetch('http://localhost:8888/janire/insertProject.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Project created successfully');
            } else {
                console.error('Error creating project:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    useEffect(() => {
        if (participantsQuery.trim() !== '') {
            fetchItems(participantsQuery);
        } else {
            setParticipants([]); // No people show up by default
        }
    }, [participantsQuery]);

    const fetchItems = async (query) => {
        try {
            const response = await fetch(`http://localhost:8888/janire/GetUsers.php?query=${query}`);
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

    const handleSelectParticipant = (participant) => {
        // Toggle selection
        if (selectedParticipants.includes(participant)) {
            setSelectedParticipants(selectedParticipants.filter((selected) => selected !== participant));
        } else {
            setSelectedParticipants([...selectedParticipants, participant]);
        }

        // Clear the search query when a participant is selected
        setParticipantsQuery('');
    };

    const handleRemoveParticipant = (participant) => {
        setSelectedParticipants(selectedParticipants.filter((selected) => selected !== participant));
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
                    <label className="addColumnParticipants">
                        Participants:
                        <ItemSelection
                            selectedParticipants={selectedParticipants}
                            handleSelect={handleSelectParticipant}
                            handleRemove={handleRemoveParticipant}
                            query={participantsQuery}
                            setQuery={setParticipantsQuery}
                            setItems={setParticipants}
                            items={participants}
                        />
                    </label>
                    <label className="addColumnAuthor">
                        Project Leader:
                        <select name="author" id="author" className="addInput">
                            <option value="">Select Leader</option>
                            <option>author #1</option>
                            <option>author #2</option>
                            <option>author #3</option>
                        </select>
                    </label>
                </div>
                <div className="addButtons">
                    <button className="addButs">Close</button>
                    <button type="submit" className="addButs" onClick={handleProjectSubmission}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProject;
