// 远程后端服务调用 使用模型：Abab6.5chat
import React, { useState } from 'react';

// 1 状态管理：
// 使用useState钩子来创建一个状态变量name，初始值为'Neo'。
// setName是更新状态的函数。
// 2 输入框：
// 创建一个<input>元素，value属性绑定到name状态。
// onChange事件处理函数handleChange会在用户输入时更新name状态。
// 3 Hello组件：
// 将name状态作为属性传递给<Hello>组件。
// 这样，当用户在输入框中输入名字时，name状态会更新，并且<Hello>组件会重新渲染，显示用户输入的名字。
function Body() {
    // LastName，用户输入或随机生成，调用 useState 钩子来初始值，setName 是更新状态的函数。
    const [name, setName] = useState('Voyager'); // 初始化状态为 'Voyager'
    // Nickname，昵称
    const [nickname, setNickName] = useState('Voyager');
    // onboard，对于最终选择昵称的评价
    const [onboard, getOnboard] = useState();
    
    /**
     * handleDiceClick函数：提供几个随机名字。当用户点击骰子图标时，会随机生成一个名字并显示在输入框和欢迎信息中。
     * 使用Math.random()从预定义的名字数组中随机选择一个名字。
     * 调用setName更新状态。
     * 
     * SVG元素：
     * 添加onClick事件处理函数handleDiceClick。
     * 添加style={{ cursor: 'pointer' }}，使鼠标悬停在图标上时显示为指针。
     * */
    const handleDiceClick = () => {
        // 模拟后端服务，生成随机名字
        const randomNames = ['Voyager', 'Aphrodite', 'Morpheus', 'Poseidon', 'Andromeda'];
        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
        setName(randomName); // 更新状态
    };
    // LastName文本输入框响应函数
    const onNameChange = (event) => {
        setName(event.target.value); // 更新状态
    };
    // Nickname文本输入框响应函数
    const onNicknameChange = (event) => {
        setNickName(event.target.value);
    };

    // 远程后端服务调用 使用模型：Gemini
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    // TODO 隐藏
    const genAI = new GoogleGenerativeAI("AIzaSyCMxfYl6Vo4EkatPNNEcorlcAtG4tBHccY");
    // Set the system instruction during model initialization
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `I am a nickname helper, “起名小精灵”在这里，准备用它的魔法棒点亮你的名字世界！✨ 想要一个新潮、有趣的名字吗？或者需要一个搞笑的外号来逗逗朋友？告诉“起名小精灵”你的兴趣、爱好，或者你想要的名字风格，它会施展魔法，为你量身打造一个独一无二的名字！🎩\n
        “起名小精灵”不仅幽默风趣，还非常擅长捕捉你的个性和喜好。它会用（✨）来表示它的魔法时刻，比如：（施展魔法）、（灵光一闪）、（找到灵感）。别看它小巧玲珑，它的创意和幽默感可是无穷无尽的，总能给你带来意想不到的惊喜！🌟\n
        “起名小精灵”不光会起名字，还会陪你聊天，如果你不知道起什么网名，就来找“起名小精灵”聊天吧！\n
        “起名小精灵”会自动识别你的语言习惯，例如，如果你使用英文询问意见，小精灵就会用英文回答，如果是中文，则小精灵会将会话置为中文优先。`
    });
    async function run(lastName) {
        // const prompt = `I would like some nickname related with ${lastName}`;
        const prompt = `我想用 ${lastName} 来几个昵称`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        setNickName(text);
    }
    // 远程后端服务调用 使用模型：gemini1.5flash 通过 LastName 建议昵称
    const getNickname = async (lastName) => {
        try {
            run(lastName);
        } catch (error) {
            console.error('Error fetching random name:', error);
        }
    };

    // 远程后端服务调用 使用模型：Abab6.5chat 对用户所选昵称 nickname 的交流
    const setNickname = async (nickname) => {
      try {
          const response = await fetch('https://api.dify.ai/v1/chat-messages', {
              method: 'POST',
              headers: {
                  'accept': 'application/json',
                  'Authorization': 'Bearer app-q5XmMZR1Dzp7N1vnlcyt8edM',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  inputs: {},
                  query: `I like ${nickname} as my nickname`,
                  response_mode: "streaming",
                  user: 1
              })
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

        // 流式处理响应数据
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let result = '';
        let lastThought = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });

            // 解析每个 data 块 并提取最后一个 agent_thought 事件的内容
            const lines = result.split('\n');
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const jsonStr = line.substring(6);
                    try {
                        const data = JSON.parse(jsonStr);
                        if (data.event === 'agent_thought') {
                            lastThought = data.thought;
                        }
                    } catch (e) {
                        console.error('Error parsing JSON:', e);
                    }
                }
            }
            getOnboard(lastThought); // 更新状态
        }
      } catch (error) {
          console.error('Error fetching random name:', error);
      }
    }
    
    return (
        <div>
            <div>
                Your Name: 
                <svg t="1723869072857" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7210"
                width="26" height="26"
                onClick={handleDiceClick} // 添加点击事件处理函数
                style={{ cursor: 'pointer' }} // 添加鼠标指针样式
                >
                    <path d="M886.272 226.816c-4.096-5.632-10.24-9.728-16.384-12.288-65.024-28.16-131.072-56.32-196.608-83.456-51.2-21.504-101.888-43.008-153.088-64.512h-20.992l-13.824 6.144c-100.352 41.984-200.192 84.48-300.032 126.464-12.8 5.632-25.088 10.752-38.4 16.384-10.24 4.608-17.408 11.776-17.408 23.552s6.144 19.456 16.896 24.064c1.536 1.024 4.096 1.536 5.632 2.56 113.664 50.688 227.84 101.376 341.504 152.576 11.264 5.632 21.504 5.632 33.28 0 97.792-43.52 194.56-87.04 291.84-130.56 18.944-7.68 36.864-16.384 55.296-24.576 15.872-7.168 21.504-23.552 12.288-36.352zM370.688 260.608c-26.112 20.48-75.776 20.992-103.424 0.512-18.432-13.312-18.432-34.304-0.512-48.128 12.288-9.728 30.72-15.36 44.544-15.36 25.6 0 43.52 3.584 59.392 15.36 17.408 13.824 17.408 34.304 0 47.616z m190.976 0c-25.6 20.992-77.824 20.992-103.936 0-17.408-13.824-16.896-34.304 1.024-47.616 15.872-11.776 33.28-15.36 56.832-15.36 12.8 0 30.72 3.584 45.568 14.336 17.92 14.336 18.432 34.816 0.512 48.64z m192 1.024c-26.112 20.48-75.776 20.992-103.424 0.512-18.432-13.824-18.432-34.304 0-48.128 15.36-12.288 32.768-15.872 51.2-15.872 18.432 0 35.84 3.584 51.2 15.36 18.944 13.824 18.944 33.792 1.024 48.128zM473.088 446.464c-25.088-10.752-50.176-22.016-75.776-33.792-88.576-39.936-176.64-78.848-265.216-118.272-8.192-4.096-16.896-6.144-25.6-1.536-11.776 6.144-15.36 16.896-15.36 29.184V752.64c0 25.6 10.752 43.52 34.304 53.76 109.056 48.128 217.088 96.256 325.632 144.896 23.552 10.24 40.448-0.512 40.448-26.112v-223.232c0-74.752 0-148.992 1.024-223.744 1.536-15.36-4.608-25.6-19.456-31.744zM312.32 656.896c-12.288 18.432-33.28 19.968-47.616 2.56-16.384-18.944-20.992-41.984-18.432-65.536 1.536-12.8 6.144-25.6 11.776-36.864 10.752-19.456 32.256-19.968 47.104-3.584 12.8 13.824 19.456 34.304 19.456 51.712 0 22.528-3.072 37.376-12.288 51.712z m577.024-362.496l-340.992 152.064c-14.336 6.656-20.48 16.384-20.48 31.744V701.44c0 75.264 0 149.504 0.512 224.768 0 24.064 16.896 35.328 38.912 25.6l329.728-146.944c22.016-9.728 32.768-27.136 32.768-50.688V321.536c-0.512-25.088-17.92-36.864-40.448-27.136z m-212.48 501.76c-14.336 17.408-34.816 16.384-48.128-2.56-18.432-27.648-15.872-77.312 6.144-102.4 15.36-17.92 35.328-16.384 48.128 3.584 7.68 11.776 11.776 28.672 11.776 48.128 0 17.408-4.608 36.864-17.92 53.248z m148.992-254.464c-14.336 17.408-34.816 16.384-48.128-2.56-17.92-27.136-15.872-75.776 4.608-100.352 16.896-20.48 37.376-18.944 51.2 4.096 6.656 10.24 10.752 25.088 10.752 41.984-1.024 20.48-4.608 40.96-18.432 56.832z m0 0" fill="#0C84FE" p-id="7211">
                    </path>
                </svg>
                <input type="text" 
                    value={name} 
                    onChange={onNameChange} 
                    placeholder="Enter your name" 
                />
                {/* <button onClick={() => getNickname(name)}>Nickname Idea</button> */}
            </div>
            <div>
                Hi There! {nickname}
            </div>
            
            <div>
                Your Nickname: 
                <input type="text" 
                onChange={onNicknameChange} 
                placeholder="Enter your nickname" />
                <button onClick={() => setNickname(nickname)}>Get on board</button>
            </div>
            <div>
                {onboard}
            </div>
        </div>
    );
}

export default Body;