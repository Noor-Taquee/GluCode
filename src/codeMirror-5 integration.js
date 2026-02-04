//#region Setting CM
const editorTextArea = document.getElementById("editor");

codeMirrorEditor = CodeMirror.fromTextArea(editorTextArea, {
  mode: "python",
  indentUnit: 4,
  tabSize: 4,
  lineWrapping: true,
});

const CM_URL = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16";

async function loadCodeMirrorAddons() {
  const addons = [
    "addon/dialog/dialog.js",
    "addon/search/searchcursor.js",
    "addon/search/search.js",
    "addon/edit/closebrackets.js",
    "addon/edit/closetag.js",
    "addon/edit/matchbrackets.js",
    "addon/selection/active-line.js",
    "addon/comment/comment.js",
    "addon/scroll/annotatescrollbar.js",
    "addon/search/matchesonscrollbar.js"
  ]

  for (const path of addons) {
    await new Promise((resolve) => {
      const script = createElement("script", {
        src: `${CM_URL}/${path}`,
        onload: resolve
      });
      document.body.appendChild(script);
    });
  }
}

loadCodeMirrorAddons().then(() => {
  codeMirrorEditor = CodeMirror.fromTextArea(editorTextArea, {
    lineNumbers: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    matchBrackets: true,
    continueComments: true,
    extraKeys: {
      "Ctrl-/": "toggleComment",
      "Cmd-/": "toggleComment",
      "Ctrl-F": "findPersistent",
      "Ctrl-H": "replace"
    }
  });
  try {
    openFile(currentFileId);
  } catch { }
});

document.getElementById("undo-btn").addEventListener("click", () => {
  codeMirrorEditor.execCommand("undo");
});

document.getElementById("redo-btn").addEventListener("click", () => {
  codeMirrorEditor.execCommand("redo");
});

document.getElementById("replace-btn").addEventListener("click", () => {
  codeMirrorEditor.execCommand("replace");
});

document.getElementById("find-btn").addEventListener("click", () => {
  codeMirrorEditor.execCommand("findPersistent");
});

//#endregion Setting CM


function refreshEditor() {
  const code = codeMirrorEditor.getValue();
  codeMirrorEditor.setValue(code);
}

//#region Output panel

// WARNING! (Code below is written by AI(Gemini) Don't make any changes here) ------

let pyodide = null;

async function initializePyodide() {
  if (pyodide) return;
  try {
    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
    });

    runButton.classList.remove("disabled");
  } catch { }
}

const decoder = new TextDecoder();

let lastOutElement = createTextField("output-text", null);

async function runPythonCode() {
  if (!pyodide) return;

  const outputTextDiv = createDiv("output-text-div", null);
  outputPanelContent.appendChild(outputTextDiv);
  const code = codeMirrorEditor.getValue();
  lastOutElement = createTextField("output-text", null);

  try {
    // 2. Setup Input (Stdin)
    pyodide.setStdin({
      stdin: () => {
        const result = prompt(lastOutElement.textContent);
        const inputSpan = document.createElement("span");
        inputSpan.className = "output-text input";
        inputSpan.textContent = result;
        lastOutElement.appendChild(inputSpan);
        return result !== null ? result + "\n" : "\n";
      }
    });

    // 3. Setup Output (Stdout)
    pyodide.setStdout({
      write: (buffer) => {
        const text = decoder.decode(buffer);
        lastOutElement = createTextField("output-text", text);
        outputTextDiv.appendChild(lastOutElement);
        updateTerminalText();
        return buffer.length;
      }
    });

    // 4. Setup Error Handling (Stderr)
    pyodide.setStderr({
      write: (buffer) => {
        const text = decoder.decode(buffer);
        outputTextDiv.appendChild(createTextField("output-text", text));
        updateTerminalText();
        return buffer.length;
      }
    });

    await pyodide.runPythonAsync(code);

  } catch (err) {
    outputTextDiv.appendChild(createTextField("output-text error system", err.message));
    updateTerminalText()
  }
}

function updateTerminalText() {
  window.requestAnimationFrame(() => {
    outputPanelContent.scrollTop = outputPanelContent.scrollHeight;
  });
}