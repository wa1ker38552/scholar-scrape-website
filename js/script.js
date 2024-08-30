async function renderTerminal() {
    const parent = dquery("#terminalContent")
    // const websites = await loadWebsites()

    while (1) {
        website = random.choice(websites)
        // cors proxy
        const response = await fetch(`https://api.codetabs.com/v1/proxy?quest=${website}`)
        const text = await response.text()
        console.log(text)

        const commandDiv = dcreate("div", "", `root:~# curl <span style='color: var(--accent-secondary); font-family: monospace;'>${website}</span>`)

        parent.append(commandDiv)

        // Simulate typing effect
        let websiteContent = dcreate("pre")
        websiteContent.style.color = "var(--text-dim)"
        websiteContent.style.fontFamily = "monospace"
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