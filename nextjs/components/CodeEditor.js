import React from 'react';

class CodeEditor extends React.Component {
  render() {
    return (
      <div>
        <h1>Code Editor</h1>
        <textarea rows={20} cols={80} />
      </div>
    );
  }
}

export default CodeEditor;