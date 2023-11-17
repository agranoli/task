import React, { useState, useEffect } from 'react';
import '../styles/AddProject.css';

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
            const response = await fetch(
                `http://localhost:8888/janire/GetUsers.php?query=${query}`
            );
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

        // Debounce the input to reduce unnecessary API calls
        clearTimeout(typingTimeout);
        setTypingTimeout(setTimeout(() => fetchItems(inputQuery), 300));
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
    const filteredOptions = items.filter(
        (item) => !selectedParticipants.includes(item.username)
    );

    return (
        <div className="addParticipats">
            <div className="search">
                <input type="text" value={query} onChange={handleInputChange} />
                <ul className="options">
                    {filteredOptions.map((item) => (
                        <li
                            key={item.username}
                            onClick={() => handleItemClick(item.username)}
                        >
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
                            {participant}{' '}
                            <span onClick={() => handleRemoveClick(participant)}>Remove</span>
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

    const handleProjectSubmission = async (e, isTeamSubmission = false) => {
        e.preventDefault();

        const projectLeader = document.getElementById('author').value; // Corrected: Use the same ID for both project and team
        const apiEndpoint = isTeamSubmission
            ? 'http://localhost:8888/janire/insertTeam.php'
            : 'http://localhost:8888/janire/insertProject.php';

        const data = {
            projectName,
            projectLeader,
            selectedParticipants,
        };

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Submission successful');
                // You may want to update the UI here based on success
            } else {
                console.error('Error submitting data:', response.statusText);
                // You may want to handle the error and update the UI accordingly
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            // You may want to handle the error and update the UI accordingly
        }
    };

    useEffect(() => {
        if (participantsQuery.trim() !== '') {
            fetchItems(participantsQuery);
        } else {
            setParticipants([]);
        }
    }, [participantsQuery]);

    const fetchItems = async (query) => {
        try {
            const response = await fetch(
                `http://localhost:8888/janire/GetUsers.php?query=${query}`
            );
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
        if (selectedParticipants.includes(participant)) {
            setSelectedParticipants(
                selectedParticipants.filter((selected) => selected !== participant)
            );
        } else {
            setSelectedParticipants([...selectedParticipants, participant]);
        }

        setParticipantsQuery('');
    };

    const handleRemoveParticipant = (participant) => {
        setSelectedParticipants(
            selectedParticipants.filter((selected) => selected !== participant)
        );
    };

    return (
        <div className="mainAdder">
            <div className="addBox">
                <div className="addHeader">
                    <p className="addHeading">Add Project</p>
                </div>
                <form
                    className="addElements"
                    onSubmit={(e) => handleProjectSubmission(e, false)}
                >
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
                    <div className="addButtons">
                        <button type="button" className="addButs">
                            Close
                        </button>
                        <button type="submit" className="addButs">
                            Confirm Project
                        </button>
                        <button
                            type="button"
                            className="addButs"
                            onClick={(e) => handleProjectSubmission(e, true)}
                        >
                            Confirm Team
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProject;
