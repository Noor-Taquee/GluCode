// #region UI Helper Functions
function createDiv(className, id = null) {
  let div = document.createElement("div");
  if (className) {
    div.className = className;
  }
  if (id) {
    div.id = id;
  }
  return div;
}

function createTextField(className, content) {
  let p = document.createElement("p");
  p.className = className;
  p.textContent = content;

  return p;
}

function createButton(
  id = null,
  className = null,
  icon = null,
  text = null,
  clickFunction = null
) {
  let button = document.createElement("button");
  if (id) {
    button.id = id;
  }
  if (className) {
    button.className = className;
  }
  if (icon) {
    button.appendChild(icon);
  }
  if (text) {
    let p = document.createElement("p");
    p.textContent = text;
    button.appendChild(p);
  }
  if (clickFunction) {
    button.addEventListener("click", clickFunction);
  }
  return button;
}

function createIcon(type = null, name, clickFunction = null, id = null) {
  if (!type) {
    type = "regular";
  }
  let icon = document.createElement("i");
  icon.className = `ph-${type} ph-${name}`;

  if (clickFunction) {
    icon.addEventListener("click", clickFunction);
  }

  return icon;
}

function addScript(path) {
  let newScipt = document.createElement("script");
  newScipt.src = path;
  document.body.appendChild(newScipt);
  return newScipt;
}

function addStyle(path) {
  let newStyle = document.createElement("link");
  newStyle.href = path;
  newStyle.rel = "stylesheet";
  document.head.appendChild(newStyle);
  return newStyle;
}

// #endregion UI Helper Functions
