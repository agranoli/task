import React, { useState } from 'react';
import axios from 'axios';

const Calendar = () => {
    const [token, setToken] = useState('api1699357134qFN9Jf6KGRIvSAtP84mU255654');
    const [title, setTitle] = useState('Test');
    const [description, setDescription] = useState('Testing the api calendar');

    const handleCreateCalendar = async () => {
        try {
            const response = await axios.post(`https://www.addevent.com/api/v1/me/calendars/create/?token=${token}&title=${title}&description=${description}`);
            console.log(response.data); // You can handle the response as needed
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Create Calendar</h1>
            <div>
                <label>
                    Token:
                    <input type="text" value={token} onChange={(e) => setToken(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
            </div>
            <button onClick={handleCreateCalendar}>Create Calendar</button>
        </div>
    );
};

export default Calendar;
