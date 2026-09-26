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
   AI CHATBOT
========================================= */

const aiChatButton = document.getElementById("aiChatButton");
const aiChatBox = document.getElementById("aiChatBox");
const aiCloseButton = document.getElementById("aiCloseButton");
const aiSendButton = document.getElementById("aiSendButton");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");


/* Open chatbot */

if (aiChatButton && aiChatBox) {

    aiChatButton.addEventListener("click", function () {

        aiChatBox.style.display = "flex";
        aiChatButton.style.display = "none";

        if (aiInput) {
            aiInput.focus();
        }

    });

}


/* Close chatbot */

if (aiCloseButton && aiChatBox && aiChatButton) {

    aiCloseButton.addEventListener("click", function () {

        aiChatBox.style.display = "none";
        aiChatButton.style.display = "block";

    });

}


/* Send AI message */

async function sendAIMessage() {

    if (!aiInput || !aiMessages) return;

    const message = aiInput.value.trim();

    if (!message) return;


    /* User message */

    const userMessage = document.createElement("div");

    userMessage.className = "ai-message ai-user";
    userMessage.textContent = message;

    aiMessages.appendChild(userMessage);

    aiInput.value = "";


    /* Loading message */

    const loadingMessage = document.createElement("div");

    loadingMessage.className = "ai-message ai-bot";
    loadingMessage.id = "aiLoading";
    loadingMessage.textContent = "Thinking...";

    aiMessages.appendChild(loadingMessage);

    aiMessages.scrollTop = aiMessages.scrollHeight;


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


        const currentLoading =
            document.getElementById("aiLoading");

        if (currentLoading) {
            currentLoading.remove();
        }


        const botMessage = document.createElement("div");

        botMessage.className = "ai-message ai-bot";

        botMessage.textContent =
            data.reply || "Sorry, I couldn't answer that.";

        aiMessages.appendChild(botMessage);


        aiMessages.scrollTop = aiMessages.scrollHeight;


    } catch (error) {

        const currentLoading =
            document.getElementById("aiLoading");

        if (currentLoading) {
            currentLoading.remove();
        }


        const errorMessage = document.createElement("div");

        errorMessage.className = "ai-message ai-bot";

        errorMessage.textContent =
            "Sorry, something went wrong.";


        aiMessages.appendChild(errorMessage);

        aiMessages.scrollTop = aiMessages.scrollHeight;

    }

}


/* Send button */

if (aiSendButton) {

    aiSendButton.addEventListener(
        "click",
        sendAIMessage
    );

}


/* Enter key */

if (aiInput) {

    aiInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendAIMessage();

        }

    });

}
