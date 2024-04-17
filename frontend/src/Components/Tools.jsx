import React, { useState, useEffect } from 'react';
import '../css/Tools.css';
import axios from 'axios';
import pdfToText from 'react-pdftotext';
import RichTextNotepad from './Reatime_text';

function Tools() {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [uploadedPdfs, setUploadedPdfs] = useState([]);
    const [pdfText, setPdfText] = useState('');
    const [summaryText, setSummaryText] = useState('');

    // Fetch the uploaded PDFs when the component mounts
    useEffect(() => {
        fetchUploadedPdfs();
    }, []);

    const fetchUploadedPdfs = async () => {
        try {
            const response = await axios.get('http://localhost:3001/get-files');
            setUploadedPdfs(response.data.data);
        } catch (error) {
            console.error('Error fetching uploaded PDFs:', error);
        }
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            try {
                // Convert the PDF to text
                const text = await pdfToText(selectedFile);
                setPdfText(text);
            } catch (error) {
                console.error('Failed to convert PDF to text:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Prepare form data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);
    
        // Upload the file to the server
        try {
            const uploadResponse = await axios.post('http://localhost:3001/upload-files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('File uploaded successfully:', uploadResponse.data);
    
            // Reset form fields
            setTitle('');
            setFile(null);
            fetchUploadedPdfs(); // Refresh the list of uploaded PDFs
    
            // After uploading the file, send the extracted PDF text for summarization
            const summarizationResponse = await axios.post('http://localhost:3001/summarize_the_data', { msg: pdfText });
    
            // Check the data type
            let data = summarizationResponse.data.message;
    
            // If data is not a string, convert it to a string
            if (typeof data !== 'string') {
                data = JSON.stringify(data);
            }
    
            // Apply regex replacements
            const dt = data.replace(/\\(.?)\\*/g, );
            const sum = dt.replace(/\*/g, );
    
            // Update the summaryText state with the summarized text from the server
            setSummaryText(sum);
    
        } catch (error) {
            console.error('File upload or summarization failed:', error);
        }
    };
    

    // This useEffect hook will trigger a re-render whenever the `summaryText` state changes
    useEffect(() => {
        // Any additional side effects or functionality you want to run when `summaryText` changes
        console.log('Summary text updated:', summaryText);
    }, [summaryText]); // Dependency array includes `summaryText`

    return (
        <div className="tools-container">
            <form className="form-container" onSubmit={handleSubmit}>
                <h2 className="form-title">Upload PDF</h2>

                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        type="text"
                        className="form-input"
                        id="title"
                        placeholder="Enter title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="pdfUpload" className="form-label">PDF File:</label>
                    <input
                        type="file"
                        className="form-input"
                        id="pdfUpload"
                        accept="application/pdf"
                        required
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className="submit-button">Upload</button>
            </form>

            <div className="uploaded-section">
    <h3>Uploaded PDFs</h3>
    <div className="uploaded-list">
        {uploadedPdfs.map((pdf, index) => (
            <div key={index} className="uploaded-item">
                <p className="pdf-title">{pdf.title}</p>
                <a href={pdf.title} target="_self" rel="noopener noreferrer">View PDF</a>
            </div>
        ))}
    </div>
</div>

            
            <div className="pdf-text-section">
                <h3>Extracted Text from PDF</h3>
                <p className="pdf-text">{pdfText}</p>
            </div>

            <div className="summary-section">
                <h3>Summarized Text:</h3>
                <p className="summary-text">{summaryText}</p>
            </div>
        </div>
    );
}

export default Tools;
