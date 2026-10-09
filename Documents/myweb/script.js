document.addEventListener("DOMContentLoaded", function () {
    // ==========================================
    // Feature 1: Theme Switch (Light / Dark Mode)
    // ==========================================
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-theme");
        });
    }

    // ==========================================
    // Feature 2: Expandable Project Details
    // ==========================================
    const toggleBtns = document.querySelectorAll(".toggle-details-btn");
    toggleBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const details = this.nextElementSibling;
            if (details.style.display === "none" || details.style.display === "") {
                details.style.display = "block";
                this.textContent = "Hide Details";
            } else {
                details.style.display = "none";
                this.textContent = "Show Details";
            }
        });
    });

    // ==========================================
    // Feature 3: Study Hours Calculator
    // ==========================================
    const calcForm = document.getElementById("calc-form");
    const calcResult = document.getElementById("calc-result");

    if (calcForm) {
        calcForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const hours = parseFloat(document.getElementById("hours-per-day").value);
            const days = parseInt(document.getElementById("days-per-week").value, 10);

            if (isNaN(hours) || isNaN(days) || hours <= 0 || days < 1 || days > 7) {
                calcResult.textContent = "Please enter valid numbers (Hours > 0, Days between 1 and 7).";
                calcResult.style.color = "#d9534f";
                return;
            }

            const totalHours = hours * days;
            calcResult.textContent = `Total planned study time: ${totalHours} hours per week.`;
            calcResult.style.color = "#28a745";
        });
    }

    // ==========================================
    // Feature 4: Compulsory Form Validation & Preview
    // ==========================================
    const contactForm = document.getElementById("contact-form");
    const previewBox = document.getElementById("form-preview");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Clear existing error messages
            document.getElementById("name-error").textContent = "";
            document.getElementById("email-error").textContent = "";
            document.getElementById("message-error").textContent = "";
            previewBox.style.display = "none";
            previewBox.textContent = "";

            const nameInput = document.getElementById("name").value.trim();
            const emailInput = document.getElementById("email").value.trim();
            const messageInput = document.getElementById("message").value.trim();

            let isValid = true;

            // Name Validation (reject empty or whitespace-only)
            if (nameInput === "") {
                document.getElementById("name-error").textContent = "Name cannot be empty or spaces only.";
                isValid = false;
            }

            // Email Validation (check format)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput === "" || !emailPattern.test(emailInput)) {
                document.getElementById("email-error").textContent = "Please enter a valid email address.";
                isValid = false;
            }

            // Message Validation (reject empty or whitespace-only)
            if (messageInput === "") {
                document.getElementById("message-error").textContent = "Message cannot be empty or spaces only.";
                isValid = false;
            }

            // If all fields are valid, show preview
            if (isValid) {
                previewBox.style.display = "block";
                previewBox.innerHTML = `
                    <h3>Form Submission Preview</h3>
                    <p><em>Your data was validated successfully (Browser demonstration only - no message sent).</em></p>
                    <p><strong>Name:</strong> ${escapeHTML(nameInput)}</p>
                    <p><strong>Email:</strong> ${escapeHTML(emailInput)}</p>
                    <p><strong>Message:</strong> ${escapeHTML(messageInput)}</p>
                `;
                contactForm.reset();
            }
        });
    }

    // Helper function to safely render plain text into HTML
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, function (tag) {
            const charsToReplace = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            };
            return charsToReplace[tag] || tag;
        });
    }
});