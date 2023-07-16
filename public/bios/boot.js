void function() {
    const bootScreen = document.getElementById("boot-screen");

    addBootText(platform.ua);
    addBootText(new Date().toUTCString());
    addBootText();
    addBootText("href: " + document.location.href);
    addBootText("origin: " + document.location.origin);
    addBootText("protocol: " + document.location.protocol);
    addBootText("host: " + document.location.host);
    addBootText("hostname: " + document.location.hostname);
    addBootText("port: " + document.location.port);
    addBootText("pathname: " + document.location.pathname);
    addBootText("search: " + document.location.search);
    addBootText("hash: " + document.location.hash);
    addBootText();
    addBootText("Boot ... ready");

    window.addEventListener("DOMContentLoaded", () => {
        addBootText("Document ... loaded");
    });

    window.addEventListener("load", () => {
        addBootText("Resources ... loaded");

        setTimeout(() => {
            bootScreen.classList.add("fade-out");

            setTimeout(() => {
                bootScreen.remove();
            }, 500);
        }, 250);
    });
    
    function addBootText(msg = null) {
        if (typeof msg == "string" && msg.length > 0) {
            let line = document.createElement("span");
            line.innerText = msg;
            bootScreen.appendChild(line);
        } else {
            let line = document.createElement("br");
            bootScreen.appendChild(line);
        }
    }
}();