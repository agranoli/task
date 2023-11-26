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

    const submitProject = async () => {
        try {
            console.log("test1");
            // Step 1: Create a new project
            const projectData = {
                projectName: projectName,
                participants: participants,
                projectLeader: document.getElementById('author').value,
            };
            console.log("test2");
            const createProjectResponse = await fetch('http://localhost:8888/janire/insertProject.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });
            console.log("test3");


            if (!createProjectResponse.ok) {
                const errorData = await createProjectResponse.json();
                console.error('Error creating project:', createProjectResponse.statusText);
                console.error('Error details:', errorData);
                // Handle the error, display a user-friendly message, or perform any other actions
                return;
            }
            console.log(createProjectResponse);

            console.log("test7");

            const createdProject = await createProjectResponse.json();
            const newProjectId = createdProject.project_id; // Assuming the server sends the new project ID in the response

            console.log("test4");
            // Step 2: Create a new team
            const createTeamResponse = await fetch('http://localhost:8888/janire/insertTeam.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectId: newProjectId, // Pass the new project ID to link the team with the project
                }),
            });
            console.log("test9");

            if (!createTeamResponse.ok) {
                const errorData = await createTeamResponse.json();
                console.error('Error creating team:', createTeamResponse.statusText);
                console.error('Error details:', errorData);
                // Handle the error, display a user-friendly message, or perform any other actions
                return;
            }

            // CHECK
            const createdTeam = await createTeamResponse.json();
            const newTeamId = createdTeam.team_id; // Assuming the server sends the new team ID in the response

            // Step 4: Update the project team_id
            const updateProjectResponse = await fetch('http://localhost:8888/janire/updateInsert.php', {
                method: 'PUT', // Assuming this should be a PUT request for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectId: newProjectId,
                    newTeamId: newTeamId,
                }),
            });
            console.log("test10");


            if (!updateProjectResponse.ok) {
                const errorData = await updateProjectResponse.json();
                console.error('Error updating project team:', updateProjectResponse.statusText);
                console.error('Error details:', errorData);
                // Handle the error, display a user-friendly message, or perform any other actions
                return;
            }

            console.log('Project submitted successfully!');
            // Optionally, you can reset the form or perform any other actions after successful submission

        } catch (error) {
            console.error('Error submitting project:', error);
            // Handle unexpected errors, display a user-friendly message, or perform any other actions
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
                        <button type="button" className="addButs" onClick={submitProject}>
                            Confirm Project
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default AddProject;
