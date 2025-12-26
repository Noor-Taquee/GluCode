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

// #region message div
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
// #endregion message div


// #region Sidebar
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

// region file panel

// #endregion Sidebar


// #region Output Panel
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

const outputPanel = createDiv("output-area", "output-area");
outputPanel.style.display = "none";
editorWrapper.appendChild(outputPanel);

const outputPanelHeader = createDiv("top-bar", null);
outputPanel.appendChild(outputPanelHeader);

outputPanelHeader.appendChild(createButton("delete-terminal", "toggle-btn", createIcon("bold", "trash"), null, deleteTerminal));

const outputPanelSizeIcon = createIcon("bold", "corners-out");
const outputPanelSizeBtn = createButton(null, "toggle-btn", outputPanelSizeIcon, null, maximizeOutputPanel)
outputPanelHeader.appendChild(outputPanelSizeBtn);

outputPanelHeader.appendChild(createButton(null, "toggle-btn", createIcon("bold", "x"), null, hideOutputPanel));

const outputPanelContent = createDiv("content");
outputPanel.appendChild(outputPanelContent);

// #endregion Output Panel


// #region settings
const settingsBtn = document.getElementById("settings-btn");
settingsBtn.addEventListener("click", openSettings);

function openSettings() {
  innerApp.style.animation = "fade-drop 0.2s ease";
  setTimeout(() => {
    innerApp.replaceChild(settingsPanel, editorTab);
  }, 100);
  innerApp.addEventListener("animationend", () => {
    innerApp.style.animation = "none";
  }, { once: true });
}

function closeSettings() {
  innerApp.style.animation = "fade-drop 0.2s ease";
  setTimeout(() => {
    innerApp.replaceChild(editorTab, settingsPanel);
  }, 100);
  innerApp.addEventListener("animationend", () => {
    innerApp.style.animation = "none";
  }, { once: true });
}


const settingsPanel = createDiv("inner-app-tab", "settings-panel");
settingsPanel.addEventListener("animationend", () => {
  settingsPanel.style.animation = "none";
});

const settingsMainContent = createDiv("content", "settings-main-content");
settingsPanel.appendChild(settingsMainContent);

const settingsTopBar = createDiv("top-bar", "settings-top-bar");
settingsMainContent.appendChild(settingsTopBar);

const settingsTopBarCloseBtn = createButton("settings-top-bar-close-btn", "toggle-btn back-btn", createIcon("bold", "arrow-left"), null, closeSettings);
settingsTopBarCloseBtn.addEventListener("click", closeSettings);
settingsTopBar.appendChild(settingsTopBarCloseBtn);

const settingsTopBarTitle = createTextField("tab-header-text", "Settings");
settingsTopBar.appendChild(settingsTopBarTitle);

const settingsContent = createDiv("content", "settings-content");
settingsMainContent.appendChild(settingsContent);

// #region Theme panel
let selectedIcon = null;
let appliedTheme = "palenight";

settingsContent.appendChild(createButton("theme-button", "tab-btn", createIcon("bold", "palette"), "Theme", openThemePanel));
function openThemePanel() {
  settingsPanel.style.animation = "fade-drop 0.2s ease";
  setTimeout(() => {
    settingsPanel.replaceChild(themePanel, settingsMainContent);
  }, 100);
}
function closeThemePanel() {
  settingsPanel.style.animation = "fade-drop 0.2s ease";
  setTimeout(() => {
    settingsPanel.replaceChild(settingsMainContent, themePanel);
  }, 100);
}

const themePanel = createDiv("content", "theme-panel");

const themePanelHeader = createDiv("top-bar", "theme-panel-header");
themePanel.appendChild(themePanelHeader);

const themePanelCloseBtn = createButton("theme-panel-close-btn", "toggle-btn back-btn", createIcon("bold", "arrow-left"), null, closeThemePanel);
themePanelHeader.appendChild(themePanelCloseBtn);

const themePanelTitle = createTextField("tab-header-text", "Choose theme");
themePanelHeader.appendChild(themePanelTitle);

const themePanelContent = createDiv("settings-content-theme-section-theme-list");
themePanel.appendChild(themePanelContent);

let palenightIcon = createIcon("fill", "radio-button");
selectedIcon = palenightIcon;
themePanelContent.appendChild(createButton("theme-panel-theme-list-theme1", "tab-btn", palenightIcon, "Palenight", () => {
  applyTheme("palenight", palenightIcon);
}));

let monokaiIcon = createIcon("bold", "circle");
themePanelContent.appendChild(createButton("theme-panel-theme-list-theme1", "tab-btn", monokaiIcon, "Monokai", () => {
  applyTheme("monokai", monokaiIcon);
}));

let githubDarkIcon = createIcon("bold", "circle");
themePanelContent.appendChild(createButton("theme-panel-theme-list-theme1", "tab-btn", githubDarkIcon, "Github Dark", () => {
  applyTheme("github-dark", githubDarkIcon);
}));


function applyTheme(theme, icon) {
  selectedIcon.className = "ph-bold ph-circle";
  app.classList.remove(appliedTheme);
  selectedIcon = icon;
  appliedTheme = theme;
  app.classList.add(appliedTheme);
  selectedIcon.className = "ph-fill ph-radio-button";
}


// #endregion Theme panel

// #endregion settings

// #region Editor settings
settingsContent.appendChild(createButton("editor-settings-btn", "tab-btn", createIcon("bold", "text-align-center"), "Editor", openEditorSettingsPanel));
function openEditorSettingsPanel() {
  settingsPanel.style.animation = "fade-drop 0.2s ease";
  setTimeout(() => {
    settingsPanel.replaceChild(editorSettingsPanel, settingsMainContent);
  }, 100);
}
function closeEditorSettingsPanel() {
  settingsPanel.style.animation = "fade-drop 0.2s ease";
  setTimeout(() => {
    settingsPanel.replaceChild(settingsMainContent, editorSettingsPanel);
  }, 100);
}

const editorSettingsPanel = createDiv("content", "editor-settings-panel");

const editorSettingsPanelHeader = createDiv("top-bar", "editor-settings-panel-header");
editorSettingsPanel.appendChild(editorSettingsPanelHeader);

editorSettingsPanelHeader.appendChild(createButton("editor-settings-panel-close-btn", "toggle-btn back-btn", createIcon("bold", "arrow-left"), null, closeEditorSettingsPanel));

editorSettingsPanelHeader.appendChild(createTextField("tab-header-text", "Editor Settings"));

const editorSettingsPanelContent = createDiv("settings-content-editor-section-theme-list");
editorSettingsPanel.appendChild(editorSettingsPanelContent);

// #region Font family
const fontFamilyDiv = createDiv("settings-input-div", "line-height-div");
editorSettingsPanelContent.appendChild(fontFamilyDiv);

const fontFamilyHeader = createDiv("settings-input-header", "line-height-header");
fontFamilyDiv.appendChild(fontFamilyHeader);

fontFamilyHeader.appendChild(createTextField("tab-header-text", "Editor font"));

const fontFamilyInput = document.createElement("select");
fontFamilyInput.className = "settings-dropdown";
fontFamilyInput.id = "editor-font-dropdown";
let fontOpt1 = document.createElement("option");
fontOpt1.value = "JetBrains Mono";
fontOpt1.text = "JetBrains Mono";
fontFamilyInput.appendChild(fontOpt1);
let fontOpt2 = document.createElement("option");
fontOpt2.value = "Google Sans Code";
fontOpt2.text = "Google Sans Code";
fontFamilyInput.appendChild(fontOpt2);
let fontOpt3 = document.createElement("option");
fontOpt3.value = "Lilex";
fontOpt3.text = "Lilex";
fontFamilyInput.appendChild(fontOpt3);
let fontOpt4 = document.createElement("option");
fontOpt4.value = "Open Sans";
fontOpt4.text = "Open Sans";
fontFamilyInput.appendChild(fontOpt4);
let fontOpt5 = document.createElement("option");
fontOpt5.value = "";
fontOpt5.text = "monospace";
fontFamilyInput.appendChild(fontOpt5);
fontFamilyInput.addEventListener("input", () => {
  app.style.setProperty("--editor-font-family", `${fontFamilyInput.value}, monospace`);
  refreshEditor();
});
fontFamilyDiv.appendChild(fontFamilyInput);

// #endregion Font family

// #region Line height
const lineHeightDiv = createDiv("settings-input-div", "line-height-div");
editorSettingsPanelContent.appendChild(lineHeightDiv);

const lineHeightHeader = createDiv("settings-input-header", "line-height-header");
lineHeightDiv.appendChild(lineHeightHeader);

lineHeightHeader.appendChild(createTextField("tab-header-text", "Line Height"));

lineHeightHeader.appendChild(createButton("reset-line-height-btn", "toggle-btn", createIcon("bold", "arrow-counter-clockwise"), null, resetLineHeight));

const lineHeightInput = document.createElement("input");
lineHeightInput.type = "number";
lineHeightInput.min = "1";
lineHeightInput.max = "2";
lineHeightInput.value = "1";
lineHeightInput.addEventListener("input", () => {
  app.style.setProperty("--editor-line-height", lineHeightInput.value);
  refreshEditor();
});
lineHeightDiv.appendChild(lineHeightInput);

function resetLineHeight() {
  lineHeightInput.value = "1";
}
// #endregion Line height

// #region Font size
const fontSizeDiv = createDiv("settings-input-div", "font-size-div");
editorSettingsPanelContent.appendChild(fontSizeDiv);

const fontSizeHeader = createDiv("settings-input-header", "font-size-header");
fontSizeDiv.appendChild(fontSizeHeader);

fontSizeHeader.appendChild(createTextField("tab-header-text", "Font Size"));

fontSizeHeader.appendChild(createButton("reset-font-size-btn", "toggle-btn", createIcon("bold", "arrow-counter-clockwise"), null, resetFontSize));

const fontSizeInput = document.createElement("input");
fontSizeInput.className = "settings-slider";
fontSizeInput.type = "range";
fontSizeInput.min = "0.5";
fontSizeInput.max = "3";
fontSizeInput.value = "1";
fontSizeInput.step = "0.05";
fontSizeInput.addEventListener("input", () => {
  app.style.setProperty("--editor-font-scale", fontSizeInput.value);
});
fontSizeInput.addEventListener("touchend", refreshEditor);
fontSizeDiv.appendChild(fontSizeInput);

function resetFontSize() {
  fontSizeInput.value = "1";
}
// #endregion Font size


// #region line numbers

const lineNumbersDiv = createDiv("settings-toggle-div", "line-numbers-div");
editorSettingsPanelContent.appendChild(lineNumbersDiv);

const lineNumbersHeader = createTextField("settings-toggle-text", "Show line numbers");
lineNumbersDiv.appendChild(lineNumbersHeader);

const lineNumbersToggleElement = createDiv("toggle-element active", "line-numbers-toggle-element");
lineNumbersToggleElement.addEventListener("click", toggleLineNumbers);
lineNumbersDiv.appendChild(lineNumbersToggleElement);

const lineNumbersToggleBall = createDiv("toggle-element-ball");
lineNumbersToggleElement.appendChild(lineNumbersToggleBall);

function toggleLineNumbers() {
  if (lineNumbersToggleElement.classList.contains("active")) {
    lineNumbersToggleElement.classList.remove("active");
    codeMirrorEditor.setOption("lineNumbers", false);
  } else {
    lineNumbersToggleElement.classList.add("active");
    codeMirrorEditor.setOption("lineNumbers", true);
  }
}
// #endregion line numbers


// #region wrap text

const wrapTextDiv = createDiv("settings-toggle-div", "line-numbers-div");
editorSettingsPanelContent.appendChild(wrapTextDiv);

const wrapTextHeader = createTextField("settings-toggle-text", "Wrap text");
wrapTextDiv.appendChild(wrapTextHeader);

const wrapTextToggleElement = createDiv("toggle-element active", "line-numbers-toggle-element");
wrapTextToggleElement.addEventListener("click", toggleWrapText);
wrapTextDiv.appendChild(wrapTextToggleElement);

const wrapTextToggleBall = createDiv("toggle-element-ball");
wrapTextToggleElement.appendChild(wrapTextToggleBall);

function toggleWrapText() {
  if (wrapTextToggleElement.classList.contains("active")) {
    wrapTextToggleElement.classList.remove("active");
    codeMirrorEditor.setOption("lineWrapping", false);
  } else {
    wrapTextToggleElement.classList.add("active");
    codeMirrorEditor.setOption("lineWrapping", true);
  }
}
// #endregion line numbers

// #endregion Editor settings

function checkOrientation() {
  if (app.offsetHeight > app.offsetWidth) {
    app.classList.remove("horizontal");
    app.classList.add("vertical");
  } else {
    app.classList.remove("vertical");
    app.classList.add("horizontal");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetchLocalStorage();
  checkOrientation();
})

window.addEventListener("resize", checkOrientation);