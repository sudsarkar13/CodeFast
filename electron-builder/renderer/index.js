// electron/renderer/index.js

// Get the code editor element
const codeEditor = document.getElementById('code-editor');

// Initialize the code editor with some default text
codeEditor.innerText = '// Welcome to CodeFast! \n\n';

// Add event listeners for keyboard input and mouse events
codeEditor.addEventListener('keydown', (e) => {
  // Handle keyboard shortcuts
  if (e.ctrlKey && e.key === 's') {
    // Save file on Ctrl+S (or Cmd+S on Mac)
    saveFile();
  } else if (e.ctrlKey && e.key === 'n') {
    // Create a new file on Ctrl+N (or Cmd+N on Mac)
    createNewFile();
  }
});

codeEditor.addEventListener('input', (e) => {
  // Update the code editor's syntax highlighting
  updateSyntaxHighlighting(codeEditor.value);
});

// Initialize the syntax highlighting library (e.g., Prism.js)
const prism = window.Prism;

// Update syntax highlighting for the code editor
function updateSyntaxHighlighting(code) {
  const highlightedCode = prism.highlight(code, prism.languages.javascript);
  codeEditor.innerHTML = highlightedCode;
}

// Save the current file
function saveFile() {
  // TO DO: Implement file saving logic
  console.log('Save file logic not implemented yet!');
}

// Create a new file
function createNewFile() {
  // TO DO: Implement new file creation logic
  console.log('New file creation logic not implemented yet!');
}

// Initialize the code editor with some default settings
codeEditor.spellcheck = false;
codeEditor.autofocus = true;