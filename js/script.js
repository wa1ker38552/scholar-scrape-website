/*async function loadWebsites() {
    const response = await fetch('data/websites.txt'); 
    const text = await response.text();
    return text.split("\n").filter(website => website.trim() !== "");  // Split and remove empty lines
}*/

async function renderTerminal() {
    const parent = dquery("#terminalContent")
    // const websites = await loadWebsites()

    while (1) {
        website = random.choice(websites)
        // cors proxy
        requestRaw("https://api.codetabs.com/v1/proxy?quest="+website)
            .then(response => response.text())
            .then(response => {
                parent.append(dcreate("div", "", `root:~# curl <span style='color: var(--accent-secondary)'>${website}</span>`))
                let websiteContent = dcreate("div")
                websiteContent.style.color = "var(--text-dim)"
                websiteContent.textContent = `"${response.slice(0, 150).trim()}..."`
                parent.append(websiteContent)
                parent.scrollTop = parent.scrollHeight;
            })
        await time.sleep(1000)
    }
}
