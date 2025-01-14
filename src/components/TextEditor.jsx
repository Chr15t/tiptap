import { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

const TextEditor = () => {
  const [content, setContent] = useState('<p>Start editing...</p>');

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null; // Render nothing until the editor is ready
  }

  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const toggleUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
  };

  const exportAsJson = () => {
    const jsonOutput = {
      content: editor.getHTML(),
    };

    // Log the JSON to the console
    console.log('Exported JSON:', JSON.stringify(jsonOutput, null, 2));

    // Download as a JSON file
    const blob = new Blob([JSON.stringify(jsonOutput, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'editor-content.json';
    link.click();
    URL.revokeObjectURL(url); // Cleanup
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Text editor</h1>

      {/* Toolbar */}
      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={toggleBold}
          style={{
            padding: '5px 10px',
            marginRight: '10px',
            fontWeight: editor.isActive('bold') ? 'bold' : 'normal',
          }}
        >
          Bold
        </button>
        <button
          onClick={toggleItalic}
          style={{
            padding: '5px 10px',
            marginRight: '10px',
            fontStyle: editor.isActive('italic') ? 'italic' : 'normal',
          }}
        >
          Italic
        </button>
        <button
          onClick={toggleUnderline}
          style={{
            padding: '5px 10px',
            textDecoration: editor.isActive('underline') ? 'underline' : 'none',
          }}
        >
          Underline
        </button>
        <button
          onClick={exportAsJson}
          style={{
            padding: '5px 10px',
            marginLeft: '20px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Export as JSON
        </button>
      </div>

      {/* Editor Content */}
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', minHeight: '200px' }}>
        <EditorContent editor={editor} />
      </div>

      {/* HTML Output */}
      <div style={{ marginTop: '20px' }}>
        <h3>Output HTML:</h3>
        <textarea
          value={content}
          readOnly
          style={{
            width: '100%',
            height: '100px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            padding: '10px',
            fontFamily: 'monospace',
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
