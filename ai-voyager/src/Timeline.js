// src/Timeline.js
import React, { useState, useEffect } from 'react';

const Timeline = () => {
    const [years, setYears] = useState([]);

    useEffect(() => {
        // 模拟从后端获取数据
        fetch('/api/years')
            .then(response => response.json())
            .then(data => setYears(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="box">
            <h1>Hello from Timeline!</h1>
            <ul className="event_year">
                {years.map((year, index) => (
                    <li key={index} className={index === 0 ? 'current' : ''}>
                        <label>{year}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Timeline;