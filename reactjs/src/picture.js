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
                Draw a picture of <input type="text" 
                onChange={onDraw} 
                placeholder="a beautiful garden" />
                <button onClick={() => falTextToImage(drawPrompt)}>Draw</button>
            </div>
            <div>
                <svg t="1724077678243" class="icon" viewBox="0 0 1388 1024" version="1.1" 
                    xmlns="http://www.w3.org/2000/svg" p-id="1465" width="26" height="26">
                    <path d="M1301.411098 364.379068L757.339611 50.259332c-48.002518-27.714361-109.59803-11.208791-137.310943 36.79228L368.73201 522.309669c-27.714361 48.002518-11.208791 109.59803 36.79228 137.310944l544.071487 314.119736c48.001071 27.714361 109.596582 11.210238 137.310943-36.79228l251.296658-435.258058c27.714361-48.001071 11.208791-109.596582-36.79228-137.310943z" fill="#64DDE3" p-id="1466"></path><path d="M987.737223 35.377972H136.239717C61.114907 35.377972 0 96.492879 0 171.617689v681.198584c0 75.12481 61.114907 136.239717 136.239717 136.239717h851.497506c75.12481 0 136.239717-61.114907 136.239717-136.239717v-681.198584c0-75.12481-61.114907-136.239717-136.239717-136.239717zM561.341391 772.231104c-144.220353 0-261.125883-116.90553-261.125882-261.12733 0-144.220353 116.90553-261.125883 261.125882-261.125883 144.2218 0 261.125883 116.90553 261.125883 261.125883 0 144.2218-116.904082 261.12733-261.125883 261.12733z m334.639511-441.666597c-31.346397 0-56.766307-25.41991-56.766308-56.766307 0-31.347845 25.41991-56.767755 56.766308-56.767755s56.766307 25.41991 56.766307 56.767755c0 31.346397-25.41991 56.766307-56.766307 56.766307z" fill="#BAF4F7" opacity=".9" p-id="1467"></path></svg>
                <a href={draw} target="_blank" rel="noreferrer">My picture</a>
            </div>
            {/* <div>
                <img src={draw} alt={drawPrompt}></img>
            </div> */}
        </div>
    );
}

export default Picture;