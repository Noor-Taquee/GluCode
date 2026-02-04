
//#region Settings panel
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


const settingsPanel = createElement("div", { className: "inner-app-tab settings-panel" });
settingsPanel.addEventListener("animationend", () => {
  settingsPanel.style.animation = "none";
});

const settingsMainContent = createElement("div", { className: "content settings-main-content" });
settingsPanel.appendChild(settingsMainContent);

const settingsTopBar = createElement("div", { className: "top-bar settings-top-bar" });
settingsMainContent.appendChild(settingsTopBar);

const settingsTopBarCloseBtn = createElement("button", {
  className: "toggle-btn back-btn",
  onclick: closeSettings 
}, [createElement("i", { className: "ph-bold ph-arrow-left" })]);
settingsTopBarCloseBtn.addEventListener("click", closeSettings);
settingsTopBar.appendChild(settingsTopBarCloseBtn);

const settingsTopBarTitle = createElement("p", { className: "tab-header-text", textContent: "Settings" });
settingsTopBar.appendChild(settingsTopBarTitle);

const settingsContent = createElement("div", { className: "content settings-content" });
settingsMainContent.appendChild(settingsContent);

//#region Theme panel
let selectedIcon = null;
let appliedTheme = "palenight";

settingsContent.appendChild(createElement("button", {
  className: "theme-button tab-btn",
  onclick: openThemePanel 
}, [createElement("i", { className: "ph-bold ph-palette" }), createElement("p", { textContent: "Theme" })]));
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

const themePanel = createElement("div", { className: "content theme-panel" });

const themePanelHeader = createElement("div", { className: "top-bar theme-panel-header" });
themePanel.appendChild(themePanelHeader);

const themePanelCloseBtn = createElement("button", {
  className: "toggle-btn back-btn",
  onclick: closeThemePanel 
}, [createElement("i", { className: "ph-bold ph-arrow-left" })]);
themePanelHeader.appendChild(themePanelCloseBtn);

const themePanelTitle = createElement("p", {
  className: "tab-header-text",
  textContent: "Choose theme"
});
themePanelHeader.appendChild(themePanelTitle);

const themePanelContent = createElement("div", { className: "settings-content-theme-section-theme-list" });
themePanel.appendChild(themePanelContent);

let palenightIcon = createElement("i", { className: "ph-bold ph-radio-button" });
selectedIcon = palenightIcon;
themePanelContent.appendChild(createButton("theme-panel-theme-list-theme1", "tab-btn", palenightIcon, "Palenight", () => {
  applyTheme("palenight", palenightIcon);
}));

let monokaiIcon = createElement("i", { className: "ph-bold ph-circle" });
themePanelContent.appendChild(createButton("theme-panel-theme-list-theme1", "tab-btn", monokaiIcon, "Monokai", () => {
  applyTheme("monokai", monokaiIcon);
}));

let githubDarkIcon = createElement("i", { className: "ph-bold ph-circle" });
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


//#endregion Theme panel

//#endregion settings

//#region Editor settings
settingsContent.appendChild(createElement("button", {
  className: "editor-settings-btn tab-btn",
  onclick: openEditorSettingsPanel 
}, [createElement("i", { className: "ph-bold ph-text-align-center" }), createElement("p", { textContent: "Editor" })]));
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

const editorSettingsPanel = createElement("div", { className: "content editor-settings-panel" });

const editorSettingsPanelHeader = createElement("div", { className: "top-bar editor-settings-panel-header" });
editorSettingsPanel.appendChild(editorSettingsPanelHeader);

editorSettingsPanelHeader.appendChild(createElement("button", {
  className: "toggle-btn back-btn",
  onclick: closeEditorSettingsPanel 
}, [createElement("i", { className: "ph-bold ph-arrow-left" })]));

editorSettingsPanelHeader.appendChild(createElement("p", { className: "tab-header-text", textContent: "Editor Settings" }));

const editorSettingsPanelContent = createElement("div", { className: "settings-content-editor-section-theme-list" });
editorSettingsPanel.appendChild(editorSettingsPanelContent);

//#region Font family
const fontFamilyDiv = createElement("div", { className: "settings-input-div line-height-div" });
editorSettingsPanelContent.appendChild(fontFamilyDiv);

const fontFamilyHeader = createElement("div", { className: "settings-input-header line-height-header" });
fontFamilyDiv.appendChild(fontFamilyHeader);

fontFamilyHeader.appendChild(createElement("p", { className: "tab-header-text", textContent: "Editor font" }));

const fontFamilyInput = createElement("select");
fontFamilyInput.className = "settings-dropdown";
fontFamilyInput.id = "editor-font-dropdown";
let fontOpt1 = createElement("option", {
  value: "JetBrains Mono",
  text: "JetBrains Mono"
});
fontFamilyInput.appendChild(fontOpt1);
let fontOpt2 = createElement("option", {
  value: "Google Sans Code",
  text: "Google Sans Code"
});
fontFamilyInput.appendChild(fontOpt2);
let fontOpt3 = createElement("option", {
  value: "Lilex",
  text: "Lilex"
});
fontFamilyInput.appendChild(fontOpt3);
let fontOpt4 = createElement("option", {
  value: "Open Sans",
  text: "Open Sans"
});
fontFamilyInput.appendChild(fontOpt4);
let fontOpt5 = createElement("option", {
  value: "",
  text: "monospace"
});
fontFamilyInput.appendChild(fontOpt5);
fontFamilyInput.addEventListener("input", () => {
  app.style.setProperty("--editor-font-family", `${fontFamilyInput.value}, monospace`);
  refreshEditor();
});
fontFamilyDiv.appendChild(fontFamilyInput);

//#endregion Font family

//#region Line height
const lineHeightDiv = createElement("div", { className: "settings-input-div line-height-div" });
editorSettingsPanelContent.appendChild(lineHeightDiv);

const lineHeightHeader = createElement("div", { className: "settings-input-header line-height-header" });
lineHeightDiv.appendChild(lineHeightHeader);

lineHeightHeader.appendChild(createElement("p", { className: "tab-header-text", textContent: "Line Height" }));

lineHeightHeader.appendChild(createElement("button", {
  className: "toggle-btn",
  onclick: resetLineHeight
}, [createElement("i", { className: "ph-bold ph-arrow-counter-clockwise" })]));

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
//#endregion Line height

//#region Font size
const fontSizeDiv = createElement("div", { className: "settings-input-div font-size-div" });
editorSettingsPanelContent.appendChild(fontSizeDiv);

const fontSizeHeader = createElement("div", { className: "settings-input-header font-size-header" });
fontSizeDiv.appendChild(fontSizeHeader);

fontSizeHeader.appendChild(createElement("p", { className: "tab-header-text", textContent: "Font Size" }));

fontSizeHeader.appendChild(createElement("button", {
  className: "toggle-btn",
  onclick: resetFontSize
}, [createElement("i", { className: "ph-bold ph-arrow-counter-clockwise" })]));

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
//#endregion Font size


//#region line numbers

const lineNumbersDiv = createElement("div", { className: "settings-toggle-div line-numbers-div" });
editorSettingsPanelContent.appendChild(lineNumbersDiv);

const lineNumbersHeader = createElement("p", { className: "settings-toggle-text", textContent: "Show line numbers" });
lineNumbersDiv.appendChild(lineNumbersHeader);

const lineNumbersToggleElement = createElement("div", { className: "toggle-element active line-numbers-toggle-element" });
lineNumbersToggleElement.addEventListener("click", toggleLineNumbers);
lineNumbersDiv.appendChild(lineNumbersToggleElement);

const lineNumbersToggleBall = createElement("div", { className: "toggle-element-ball" });
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
//#endregion line numbers


//#region wrap text

const wrapTextDiv = createElement("div", { className: "settings-toggle-div line-numbers-div" });
editorSettingsPanelContent.appendChild(wrapTextDiv);

const wrapTextHeader = createElement("p", { className: "settings-toggle-text", textContent: "Wrap text" });
wrapTextDiv.appendChild(wrapTextHeader);

const wrapTextToggleElement = createElement("div", { className: "toggle-element active line-numbers-toggle-element" });
wrapTextToggleElement.addEventListener("click", toggleWrapText);
wrapTextDiv.appendChild(wrapTextToggleElement);

const wrapTextToggleBall = createElement("div", { className: "toggle-element-ball" });
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
//#endregion line numbers

//#endregion Editor settings
