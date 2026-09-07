const aiChatButton = document.getElementById("aiChatButton");
const aiChatBox = document.getElementById("aiChatBox");
const aiCloseButton = document.getElementById("aiCloseButton");
const aiSendButton = document.getElementById("aiSendButton");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");

aiChatButton.addEventListener("click", () => {
    aiChatBox.style.display = "flex";
    aiChatButton.style.display = "none";
});

aiCloseButton.addEventListener("click", () => {
    aiChatBox.style.display = "none";
    aiChatButton.style.display = "block";
});

async function sendAIMessage() {
    const message = aiInput.value.trim();

    if (!message) return;

    aiMessages.innerHTML += `
        <div class="ai-message ai-user">
            ${message}
        </div>
    `;

    aiInput.value = "";

    aiMessages.innerHTML += `
        <div class="ai-message ai-bot" id="aiLoading">
            Thinking... 🤔
        </div>
    `;

    try {
        const response = await fetch(
            "https://abdullah-ai.abdullahdogar2331.workers.dev/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message
                })
            }
        );

        const data = await response.json();

        document.getElementById("aiLoading").remove();

        aiMessages.innerHTML += `
            <div class="ai-message ai-bot">
                ${data.reply || "Sorry, I couldn't answer that."}
            </div>
        `;

        aiMessages.scrollTop = aiMessages.scrollHeight;

    } catch (error) {
        document.getElementById("aiLoading").remove();

        aiMessages.innerHTML += `
            <div class="ai-message ai-bot">
                Sorry, something went wrong. 😕
            </div>
        `;
    }
}

aiSendButton.addEventListener("click", sendAIMessage);

aiInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendAIMessage();
    }
});
