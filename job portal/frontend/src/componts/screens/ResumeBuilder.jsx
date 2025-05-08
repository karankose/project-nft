import React, { useState } from 'react';
import axios from 'axios';
import { Images } from '../../assets/image';

const ResumeBuilder = () => {
    const [inputData, setInputData] = useState('');
    const [generatedResume, setGeneratedResume] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;
    const handleInputChange = (e) => {
        setInputData(e.target.value);
    };

    const handleGenerateResume = async () => {
        setIsGenerating(true);
        try {
            const response = await axios.post(`${API_URL}/resume/ai-gen`, {
                data: inputData,
            });
            setGeneratedResume(response.data.resume);
        } catch (error) {
            console.error('Error generating resume:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadResume = () => {
        const blob = new Blob([generatedResume], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.html';
        link.click();
    };

    return (
        <div className="container my-5 pt-5">
            <div className="d-flex flex-column flex-md-row align-items-start gap-4 bg-light p-4 rounded shadow-sm">

                {/* Left Column - GIF */}
                <div className="gif-container flex-shrink-0 text-center">
                    <img
                        src={Images.AIBot}
                        alt="Resume GIF"
                        style={{ maxWidth: '250px', borderRadius: '12px' }}
                    />
                    <p className="mt-2 text-muted">Let's build your resume!</p>
                </div>

                {/* Right Column - Input Section */}
                <div className="flex-grow-1 w-100">
                    <h3>Create Your Resume</h3>
                    <textarea
                        value={inputData}
                        onChange={handleInputChange}
                        placeholder="Enter your details like name, education, skills, etc."
                        rows="6"
                        className="form-control mb-3"
                    />
                    <button
                        onClick={handleGenerateResume}
                        className="btn btn-primary w-100 mb-4"
                        disabled={isGenerating}
                    >
                        {isGenerating ? <img src={Images.procesing } className='loading-Resume'/> : 'Generate Resume'}
                    </button>

                    {/* Resume Popup */}
                    {generatedResume && (
                        <div className="popup bg-white p-4 border rounded shadow-sm">
                            
                            <div
                                className="resume-content"
                                dangerouslySetInnerHTML={{ __html: generatedResume }}
                            />
                            <div className="d-flex justify-content-end gap-3 mt-3">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setGeneratedResume('')}
                                >
                                    Close
                                </button>
                                <button className="btn btn-success" onClick={handleDownloadResume}>
                                    Download Resume
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ResumeBuilder;
