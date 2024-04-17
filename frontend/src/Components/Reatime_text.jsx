import React, { useState } from 'react';
import RichTextEditor from 'react-rte';
import './RichTextNotepad.css';

const RichTextNotepad = () => {
    // State to hold the editor value
    const [value, setValue] = useState(RichTextEditor.createEmptyValue());

    // Handler for when the editor value changes
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    // Function to convert the editor content to plain text
    const getPlainText = () => {
        return value.getEditorState().getCurrentContent().getPlainText();
    };

    // Function to save content as a text file
    const saveAsTextFile = () => {
        const plainText = getPlainText();

        // Create a Blob object with the plain text content
        const blob = new Blob([plainText], { type: 'text/plain' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create an anchor element and trigger a download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'notepad-content.txt'; // Name of the text file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL object
        URL.revokeObjectURL(url);
    };

    return (
        <div className="notepad-container">
            <h1 className="notepad-title">Real-Time Rich Text Notepad</h1>
            {/* Rich text editor component */}
            <div className="editor-container">
                <RichTextEditor
                    value={value}
                    onChange={handleChange}
                    className="rich-text-editor"
                />
            </div>
            
            {/* Button to save content as a text file */}
            <button onClick={saveAsTextFile} className="save-button">Save as Text File</button>
        </div>
    );
};

export default RichTextNotepad;
