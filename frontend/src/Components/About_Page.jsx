import React from 'react';
import '../css/AboutPage.css'// Import your custom CSS file
import { Link } from 'react-router-dom';
function AboutPage() {
    return (
        <div className="about-page">
            <div className="container">
                {/* Header Section */}
                <div className="header-section">
                    <h1>About PDF Extraction Tools</h1>
                    <p>
                        Explore the benefits of our PDF extraction tools and how they can simplify your workflow.
                    </p>
                </div>

                {/* Features Section */}
                <div className="features-section">
                    <h2>Features</h2>
                    <ul>
                        <li>High-precision text extraction</li>
                        <li>Image extraction in original quality</li>
                        <li>Data table extraction</li>
                        <li>Batch processing of PDF files</li>
                        <li>Intuitive user interface</li>
                    </ul>
                </div>

                {/* Benefits Section */}
                <div className="benefits-section">
                    <h2>Benefits</h2>
                    <ul>
                        <li>Saves time on manual data entry</li>
                        <li>Increases productivity</li>
                        <li>Enhances data accuracy</li>
                        <li>Supports various output formats</li>
                        <li>Easy-to-use even for beginners</li>
                    </ul>
                </div>

                <div className="conclusion-section">
                    <p>
                        Try our PDF extraction tools today and experience their benefits firsthand!
                    </p>
                    <button className="get-started-button"><Link to="/" >Get Started</Link></button>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
