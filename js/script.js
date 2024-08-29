function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadWebsites() {
    const response = await fetch('data/websites.txt'); 
    const text = await response.text();
    return text.split("\n").filter(website => website.trim() !== "");  // Split and remove empty lines
}

async function renderTerminal() {
    const parent = dquery("#terminalContent")
    const websites = await loadWebsites()

    while (1) {
        website = random.choice(websites)
        parent.append(dcreate("div", "", `root:~# curl <span style='color: var(--accent-secondary)'>${website}</span>`))
        parent.scrollTop = parent.scrollHeight;
        await wait(100)
    }
}
