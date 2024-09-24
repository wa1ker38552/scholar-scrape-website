async function renderTerminal() {
    const parent = dquery("#terminalContent")
    // const websites = await loadWebsites()

    while (1) {
        website = random.choice(websites)
        // cors proxy
        const response = await fetch(`https://api.codetabs.com/v1/proxy?quest=${website}`)
        const text = await response.text()
        const commandDiv = dcreate("div", "", `root:~# curl <span style='color: var(--accent-secondary); font-family: monospace;'>${website}</span>`)

        parent.append(commandDiv)

        // Simulate typing effect
        let websiteContent = dcreate("pre")
        websiteContent.style.color = "var(--text-dim)"
        websiteContent.style.fontFamily = "Fira Code"
        parent.append(websiteContent)

        parent.scrollTop = parent.scrollHeight

        let formattedResponse = formatResponse(text)
        await typeEffect(websiteContent, `${formattedResponse}`, 2) // Adjust the speed as needed
    }
}

function formatResponse(response) {
    // Extract the <title> tag
    const titleMatch = response.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? `<title>${titleMatch[1]}</title>` : '';

    // Extract the first <meta> tag
    const metaMatch = response.match(/<meta.*?>/i);
    const meta = metaMatch ? metaMatch[0] : '';

    // Build the minimalistic HTML response
    const formatted = `
<html>
    <head>
        ${title ? `${title}` : '<title>An Amazing Title</title>'}
        ${meta ? `${meta}` : '<meta name="description" content="Content-Type" />'}
    </head>
</html>`.trim();

    return formatted;
}

async function typeEffect(element, text, delay) {
    const parent = element.parentElement;

    // Simulate typing effect
    for (let char of text) {
        element.innerHTML += char;
        parent.scrollTop = parent.scrollHeight
        await time.sleep(delay);
    }
}

async function renderTypewriter() {
    const text = dquery("#typewriterText")
    phrases = [
        "students",
        "learners",
        "scholars",
        "interns",
        "mentors"
    ]

    let i = 0
    while (true) {
        text.innerHTML = "";
        let word = phrases[i % phrases.length];
        i++;

        for (const char of word) {
            text.innerHTML += char;
            
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Remove characters
        const originalContent = text.innerHTML;
        for (let j = 0; j < originalContent.length; j++) {
            text.innerHTML = text.innerHTML.slice(0, -1);

            await new Promise(resolve => setTimeout(resolve, 50));
        }

        await new Promise(resolve => setTimeout(resolve, 400));
    }
}

async function submitContactForm(event) {
    event.preventDefault()
    
    // Get the form data
    const form = document.getElementById("contactForm");
    const formData = new FormData(form);
    const termsCheckbox = document.getElementById("termsCheckbox");

    if(!formData.get("name") || !formData.get("email") || !formData.get("message")) {
        showToast("Please fill in all the required fields.", "error");
        return;
    }

    // Check if the terms checkbox is checked
    if (!termsCheckbox.checked) {
        showToast("Please agree to the Terms and Conditions and Privacy Policy.", "error");
        return;
    }

    // Get the reCAPTCHA response token
    if (!recaptchaResponse) {
        showToast("Please complete the reCAPTCHA verification.", "error");
        return;
    }
    
     // Add the reCAPTCHA response token to the form data
     formData.append('g-recaptcha-response', recaptchaResponse);

    try {
        // Send a POST request to the Flask server
        const response = await fetch('https://server.scholarscrape.com/submit-form', {
            method: 'POST',
            body: formData
        }).catch(error => {
            console.log('Error:', error);
        });

        // Parse the response
        const result = await response.json();

        // Handle the response (e.g., show a message)
        if (result.status === "success") {
            showToast("Submission received! We'll get back to you shortly.", "success");
            form.reset(); // Optionally reset the form after successful submission
        } else {
            showToast("Error: " + result.message, "error");
        }
    } catch (error) {
        console.error('Error:', error);
        showToast("An error occurred while submitting the form. Please try again later.", "error");
    }
}

function showToast(message, type) {
    const toast = document.getElementById("toast");
    toast.className = "toast show";
    toast.textContent = message;

    if (type === "success") {
        toast.style.backgroundColor = "#4CAF50"; // Green for success
    } else {
        toast.style.backgroundColor = "#f44336"; // Red for error
    }

    // Hide the toast after 3 seconds
    setTimeout(() => {
        toast.className = 'toast hide';
    }, 3000);

    // Clear the toast
    setTimeout(() => {
        toast.className = 'toast';
    }, 4000);
}