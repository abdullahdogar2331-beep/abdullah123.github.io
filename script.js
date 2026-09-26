/* ================================
   Mohammad Abdullah Portfolio
   JavaScript — Complete
================================ */

/* =========================================
   ELEMENTS
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const header = document.getElementById("header");
const navItems = document.querySelectorAll(".nav-link");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const year = document.getElementById("year");


/* =========================================
   MOBILE NAVIGATION
========================================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function (event) {

        event.preventDefault();

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });


    navItems.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        });

    });


    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {

            navLinks.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        }

    });

}


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

if (header) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

}


/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {

    let current = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveLink);


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealItems.forEach(function (item) {
        observer.observe(item);
    });

} else {

    revealItems.forEach(function (item) {
        item.classList.add("visible");
    });

}


/* =========================================
   CONTACT FORM
========================================= */

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameElement = document.getElementById("name");
        const emailElement = document.getElementById("email");
        const subjectElement = document.getElementById("subject");
        const messageElement = document.getElementById("message");

        const name = nameElement ? nameElement.value.trim() : "";
        const email = emailElement ? emailElement.value.trim() : "";
        const subject = subjectElement ? subjectElement.value.trim() : "";
        const message = messageElement ? messageElement.value.trim() : "";

        if (!name || !email || !subject || !message) {

            if (formStatus) {
                formStatus.textContent = "Please fill in all fields.";
            }

            return;
        }


        const mailSubject = encodeURIComponent(subject);

        const mailBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        );


        window.location.href =
            `mailto:abdullahdogar2331@gmail.com?subject=${mailSubject}&body=${mailBody}`;


        if (formStatus) {
            formStatus.textContent = "Opening your email app...";
        }

    });

}


/* =========================================
   CURRENT YEAR
========================================= */

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================================
   AI CHATBOT — UPGRADED
========================================= */

const aiChatButton = document.getElementById("aiChatButton");
const aiChatBox = document.getElementById("aiChatBox");
const aiCloseButton = document.getElementById("aiCloseButton");
const aiSendButton = document.getElementById("aiSendButton");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");

let aiBusy = false;


/* =========================================
   OPEN CHAT
========================================= */

if (aiChatButton && aiChatBox) {

    aiChatButton.addEventListener("click", function () {

        aiChatBox.style.display = "flex";
        aiChatButton.style.display = "none";

        if (aiInput) {
            aiInput.focus();
        }

    });

}


/* =========================================
   CLOSE CHAT
========================================= */

if (aiCloseButton && aiChatBox && aiChatButton) {

    aiCloseButton.addEventListener("click", function () {

        aiChatBox.style.display = "none";
        aiChatButton.style.display = "block";

    });

}


/* =========================================
   FORMAT AI RESPONSE
========================================= */

function formatAIResponse(text) {

    if (!text) return "";

    let safeText = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");


    /*
       Detect Markdown code blocks
    */

    safeText = safeText.replace(
        /```(\w+)?\s*([\s\S]*?)```/g,
        function (match, language, code) {

            const lang = language || "code";
            const cleanCode = code.trim();

            return `
                <div class="ai-code-wrapper">

                    <div class="ai-code-header">
                        <span>${lang}</span>

                        <button
                            class="ai-copy-button"
                            type="button"
                            onclick="copyAICode(this)"
                        >
                            Copy
                        </button>
                    </div>

                    <pre class="ai-code"><code>${cleanCode}</code></pre>

                </div>
            `;

        }
    );


    // Bold Markdown
    safeText = safeText.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );


    // Convert line breaks
    safeText = safeText.replace(/\n/g, "<br>");

    return safeText;
}


/* =========================================
   COPY AI CODE
========================================= */

window.copyAICode = async function (button) {

    const wrapper =
        button.closest(".ai-code-wrapper");

    if (!wrapper) return;

    const codeElement =
        wrapper.querySelector("code");

    if (!codeElement) return;

    try {

        await navigator.clipboard.writeText(
            codeElement.textContent
        );

        button.textContent = "Copied!";

        setTimeout(function () {

            button.textContent = "Copy";

        }, 1500);

    } catch (error) {

        button.textContent = "Failed";

        setTimeout(function () {

            button.textContent = "Copy";

        }, 1500);

    }

};


/* =========================================
   ADD MESSAGE
========================================= */

function addAIMessage(text, type = "bot") {

    const message =
        document.createElement("div");

    message.className =
        `ai-message ${
            type === "user"
                ? "ai-user"
                : "ai-bot"
        }`;

    if (type === "bot") {

        message.innerHTML =
            formatAIResponse(text);

    } else {

        message.textContent = text;

    }

    aiMessages.appendChild(message);

    aiMessages.scrollTop =
        aiMessages.scrollHeight;
}


/* =========================================
   SEND AI MESSAGE
========================================= */

async function sendAIMessage() {

    if (!aiInput || !aiMessages || aiBusy) {
        return;
    }

    const message =
        aiInput.value.trim();

    if (!message) return;

    aiBusy = true;


    if (aiSendButton) {

        aiSendButton.disabled = true;
        aiSendButton.textContent = "Thinking...";

    }


    // Add user message
    addAIMessage(message, "user");

    aiInput.value = "";


    // Thinking animation
    const loadingMessage =
        document.createElement("div");

    loadingMessage.className =
        "ai-message ai-bot ai-thinking";

    loadingMessage.innerHTML = `
        <span class="thinking-dot"></span>
        <span class="thinking-dot"></span>
        <span class="thinking-dot"></span>
    `;

    aiMessages.appendChild(loadingMessage);

    aiMessages.scrollTop =
        aiMessages.scrollHeight;


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


        if (!response.ok) {
            throw new Error("AI request failed");
        }


        const data =
            await response.json();


        loadingMessage.remove();


        addAIMessage(
            data.reply ||
            "Sorry, I couldn't generate an answer."
        );


    } catch (error) {

        loadingMessage.remove();

        addAIMessage(
            "Sorry, something went wrong. Please try again."
        );

    }


    aiBusy = false;


    if (aiSendButton) {

        aiSendButton.disabled = false;
        aiSendButton.textContent = "Send";

    }


    aiMessages.scrollTop =
        aiMessages.scrollHeight;
}


/* =========================================
   SEND BUTTON
========================================= */

if (aiSendButton) {

    aiSendButton.addEventListener(
        "click",
        sendAIMessage
    );

}


/* =========================================
   ENTER TO SEND
========================================= */

if (aiInput) {

    aiInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendAIMessage();

            }

        }
    );

}
