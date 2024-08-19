// src/Timeline.js
import React, { useState, useEffect } from 'react';

// 图片数组，包含所有要轮播的图片URL
const images = [
    'https://fal.media/files/monkey/o7SiF9EGP9Ho6mGDan0or.png',
    'https://fal.media/files/tiger/6js9b2-cK9qQ2uYrx5Wn6.png',
    'https://fal.media/files/zebra/dWUAFUtFshIwe89IesEaP.png',
    'https://fal.media/files/elephant/A3rIqcuLASKSQ_Md0xYZG.png',
    'https://fal.media/files/kangaroo/jVUydkkqkCTa2q4DPqUvd.png',
];
// 当前图片索引
let currentImageIndex = 0;
// 函数，用于更新背景图片
function changeBackground() {
    // 设置当前的背景图片
    document.getElementById('dynamic-background').style.backgroundImage = `url('${images[currentImageIndex]}')`;
    // 更新当前图片索引，如果达到数组末尾则回到开始
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

// 定时器，每10秒更改一次背景图片
// setInterval(changeBackground, 10000);

// 页面加载时立即设置第一张图片
// changeBackground();

const Timeline = () => {
    const [years, setYears] = useState([]);

    useEffect(() => {
        fetch('/years.json')
            .then(response => response.json())
            .then(data => setYears(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="box" id="dynamic-background">
            <h1>Voyager</h1>
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