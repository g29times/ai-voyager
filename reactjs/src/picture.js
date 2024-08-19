import React, { useState } from 'react';
import * as fal from "@fal-ai/serverless-client";

function Picture() {
    // 
    const [drawPrompt, setDrawPrompt] = useState();

    const [draw, setDraw] = useState();

    // Nickname文本输入框响应函数
    const onDraw = (event) => {
        setDrawPrompt(event.target.value);
    };

    // 远程后端服务调用 使用模型：FalTextToImage 生成图片
    async function falTextToImage(prompt) {
        fal.config({
            credentials: "359280f2-5c3a-4fb0-a4f2-59e0fa023af9:34ac5a47d34ffd701370a37331c1a4b7"
        });
        const result = await fal.subscribe("fal-ai/flux/dev", {
            input: {
                prompt: `${prompt}`,// "a tiger in the jungle",
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        });
        const imageUrl = result.images[0].url;
        console.log(imageUrl);
        setDraw(imageUrl);
        document.getElementById('dynamic-background').style.backgroundImage = `url('${imageUrl}')`;
    }

    return (
        <div class="background-div">
            <div>
                Draw a picture you like <input type="text" 
                onChange={onDraw} 
                placeholder="a beautiful garden" />
                <button onClick={() => falTextToImage(drawPrompt)}>Draw</button>
            </div>
            <div>
                <a href={draw} target="_blank" rel="noreferrer">My picture</a>
            </div>
            {/* <div>
                <img src={draw} alt={drawPrompt}></img>
            </div> */}
        </div>
    );
}

export default Picture;