import { dom, domParser } from "https://debutter.dev/x/js/utils.js@1.2";

export default class Window {
    constructor() {
        this.ele = createWindowComponent(this);
        document.body.appendChild(this.ele);
    }

    set icon(src) {
        this.ele.querySelector(".app-icon").src = src;
    }
    get icon() {
        return this.ele.querySelector(".app-icon").src;
    }

    set title(text) {
        this.ele.querySelector(".title").innerText = text;
    }
    get title() {
        return this.ele.querySelector(".title").innerText;
    }

    minimize() {}
    maximize() {}
    close() {
        this.ele.remove();
    }
}

function createWindowComponent(win) {
    let ele = domParser(`
        <div class="window gray-container moveable">
            <div class="title-bar">
                <img class="app-icon crisp no-drag no-select" src="/assets/icons/broken-image.png">
                <span class="title">Untitled Window</span>
                <div class="flex-spacer"></div>
            </div>
            <div class="frame">
                <iframe class="frame" src="https://info.cern.ch/"></iframe>
            </div>
        </div>
    `);

    let titleBar = ele.querySelector(".title-bar");

    titleBar.addEventListener("mousedown", () => {
        win.ele.classList.add("moving");

        let bounds = win.ele.getBoundingClientRect();
        let offset = {
            x: window.keys["MouseX"] - bounds.x,
            y: window.keys["MouseY"] - bounds.y
        }

        const dragHandler = function() {
            win.ele.style.left = `${Math.max(0, Math.min(window.innerWidth - bounds.width, window.keys["MouseX"] - offset.x))}px`;
            win.ele.style.top = `${Math.max(0, Math.min(window.innerHeight - bounds.height, window.keys["MouseY"] - offset.y))}px`;
        }

        document.querySelectorAll("iframe").forEach(ele => ele.classList.add("fix-drag"));
        window.addEventListener("mousemove", dragHandler);
        
        window.addEventListener("mouseup", () => {
            win.ele.classList.remove("moving");
            document.querySelectorAll("iframe").forEach(ele => ele.classList.remove("fix-drag"));
            window.removeEventListener("mousemove", dragHandler);
        }, {
            once: true
        });
    });

    // Minimize button
    let minimizeBtn = domParser(`
        <button class="gray-button">-</button>
    `);
    minimizeBtn.addEventListener("click", () => win.minimize());
    titleBar.appendChild(minimizeBtn);

    // Maximize button
    let maximizeBtn = domParser(`
        <button class="gray-button">#</button>
    `);
    maximizeBtn.addEventListener("click", () => win.maximize());
    titleBar.appendChild(maximizeBtn);

    // Close button
    let closeBtn = domParser(`
        <button class="gray-button">x</button>
    `);
    closeBtn.addEventListener("click", () => win.close());
    titleBar.appendChild(closeBtn);

    return ele;
}