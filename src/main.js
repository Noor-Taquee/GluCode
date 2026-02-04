/**
 * Creates an element 
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} elementName 
 * @param {Partial<HTMLElementTagNameMap[K]>} properties 
 * @param {Array<Node>} children 
 */
function createElement(elementName, properties = {}, children = []) {
  const element = document.createElement(elementName);
  Object.assign(element, properties);
  children.forEach(child => { if (child) element.appendChild(child) });
  return element;
}

function createIcon(type, name) {
  return createElement("i", { className: `ph-${type} ph-${name}` })
}

const app = document.getElementById("app");

const messageDiv = document.getElementById("message-div");
messageDiv.addEventListener("animationend", () => {
  messageDiv.style.animation = "none";
});

const messageText = document.getElementById("message-text");
let messageTimer;

const innerApp = document.getElementById("inner-app");
innerApp.addEventListener("animationend", () => {
  innerApp.style.animation = "none";
});

const editorTab = document.getElementById("editor-tab");
const editorWrapper = document.getElementById("editor-wrapper");
const mainArea = document.getElementById("main-area");
const codeEditor = document.getElementById("code-area");

let Editor = document.getElementById("editor");

//#region message div
function showMessage(message) {
  clearTimeout(messageTimer);

  messageText.textContent = message;
  messageDiv.style.display = "flex";
  messageDiv.offsetHeight;
  messageDiv.style.animation = "slide-in-top 0.4s ease forwards";

  function hidemessage() {
    messageDiv.style.animation = "slide-out-top 0.3s ease forwards";
    messageDiv.addEventListener("animationend", () => {
      messageDiv.style.display = "none";
    }, { once: true });
  }
  messageTimer = setTimeout(hidemessage, 1500)
}
//#endregion message div


//#region Sidebar
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("animationend", () => {
  sidebar.style.animation = "none";
});

const bnSidebar = document.getElementById("sidebar-btn");
bnSidebar.addEventListener("click", showSidebar);

const closeSidebarBtn = document.getElementById("close-sidebar-btn");
closeSidebarBtn.addEventListener("click", hideSidebar);

function showSidebar() {
  if (app.classList.contains("horizontal")) return;
  if (window.getComputedStyle(sidebar).display == "none") {
    sidebar.style.display = "flex";
    sidebar.style.animation = "slide-in-left 0.5s ease-in-out forwards";
  }
}
function hideSidebar() {
  if (app.classList.contains("horizontal")) return;
  if (window.getComputedStyle(sidebar).display == "flex") {
    sidebar.style.animation = "slide-out-left 0.5s ease-in-out forwards";
    sidebar.addEventListener("animationend", () => {
      sidebar.style.display = "none";
    }, { once: true });
  }
}

const sidebarContent = document.getElementById("sidebar-content");

//#endregion Sidebar 


//#region Output Panel 
const runButton = document.getElementById("run-btn");

runButton.addEventListener("click", () => {
  if (runButton.classList.contains("disabled")) {
    showMessage("Initializing Python...");
    initializePyodide();
    return;
  };
  showOutputPanel();
  if (allFiles[currentFileId].type = "python") {
    runPythonCode();
  }
});

function showOutputPanel() {
  if (outputPanel.style.display == "flex") return;
  outputPanel.style.animation = "slide-in-bottom 0.3s ease";
  outputPanel.style.display = "flex";
  outputPanel.addEventListener("animationend", () => {
    outputPanel.style.animation = "none";
  }, { once: true });
}

function hideOutputPanel() {
  if (outputPanel.style.display == "none") return;
  outputPanel.style.animation = "slide-out-bottom 0.3s ease";
  outputPanel.addEventListener("animationend", () => {
    outputPanel.style.animation = "none";
    outputPanel.style.display = "none";
  }, { once: true });
}

function maximizeOutputPanel() {
  outputPanel.style.height = "100%";
  outputPanelSizeBtn.removeEventListener("click", maximizeOutputPanel);
  outputPanelSizeBtn.addEventListener("click", minimizeOutputPanel);
  outputPanelSizeIcon.className = "ph-bold ph-corners-in";
}

function minimizeOutputPanel() {
  outputPanel.style.height = "40%";
  outputPanelSizeBtn.removeEventListener("click", minimizeOutputPanel);
  outputPanelSizeBtn.addEventListener("click", maximizeOutputPanel);
  outputPanelSizeIcon.className = "ph-bold ph-corners-out";
}

function deleteTerminal() {
  outputPanelContent.innerHTML = "";
  hideOutputPanel();
}

const outputPanel = createElement("div", {
  className: "output-area",
  id: "output-area"
});
outputPanel.style.display = "none";
editorWrapper.appendChild(outputPanel);

const outputPanelHeader = createElement("div", { className: "top-bar" });
outputPanel.appendChild(outputPanelHeader);

outputPanelHeader.appendChild(createElement("button", {
  id: "delete-terminal",
  className: "toggle-btn",
  onclick: deleteTerminal 
}, [ createElement("i", { className: "ph-bold ph-trash" })]));

const outputPanelSizeIcon = createElement("i", { className: "ph-bold ph-corners-out" });
const outputPanelSizeBtn = createElement("button", {
  className: "toggle-btn",
  onclick: maximizeOutputPanel 
}, [outputPanelSizeIcon]);
outputPanelHeader.appendChild(outputPanelSizeBtn);

outputPanelHeader.appendChild(createElement("button", {
  className: "toggle-btn",
  onclick: hideOutputPanel 
}, [createElement("i", { className: "ph-bold ph-x" })]));

const outputPanelContent = createElement("div", { className: "content" });
outputPanel.appendChild(outputPanelContent);

//#endregion Output Panel

function checkOrientation() {
  app.dataset.orientation = app.offsetHeight > app.offsetWidth ? "vertical" : "horizontal";
}

window.addEventListener("DOMContentLoaded", () => {
  checkOrientation();
});

window.addEventListener("resize", checkOrientation);