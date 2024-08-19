import React, { useState, useEffect, useRef } from 'react';

const FadeOutDiv = () => {
    const [isFadeOut, setIsFadeOut] = useState(false);

    // 创建一个ref引用
    const fadeDivRef = useRef(null);

    useEffect(() => {
        // 如果需要在组件挂载后执行的操作，可以在这里进行
        if (fadeDivRef.current && isFadeOut) {
            fadeDivRef.current.classList.add('fade-out', 'clicked');
        }
    }, [isFadeOut]); // 依赖数组中包含isFadeOut，当isFadeOut变化时，这个effect会运行

    const handleClick = () => {
        setIsFadeOut(true); // 设置状态为true，触发useEffect
    };

    return (
        <div
            ref={fadeDivRef}
            className={`fade-out ${isFadeOut ? 'clicked' : ''}`}
            onClick={handleClick}
            style={{ cursor: 'pointer', opacity: isFadeOut ? 0 : 1, transition: 'opacity 0.5s ease-out' }}
        >
            <h1>Voyager</h1>
        </div>
    );
};

export default FadeOutDiv;