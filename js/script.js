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
        "researchers",
        "interns"
    ]

    let i = 0
    while (1) {
        text.innerHTML = ""
        word = phrases[i%3] // use mod instead of random to avoid succesive words
        i++
        for (const char of word) {
            text.innerHTML += char
            await time.sleep(50)
        }
        await time.sleep(1000)
        const textLength = text.innerHTML
        for (let i=0; i<textLength.length; i++) {
            text.innerHTML = text.innerHTML.slice(0, -1)
            await time.sleep(50)
        }
        await time.sleep(400)
    }
}

async function submitContactForm(event) {
    event.preventDefault()
    
    // Get the form data
    const form = document.getElementById("contactForm");
    const formData = new FormData(form);

    try {
        // Send a POST request to the Flask server
        const response = await fetch('http://localhost:5000/submit-form', {
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