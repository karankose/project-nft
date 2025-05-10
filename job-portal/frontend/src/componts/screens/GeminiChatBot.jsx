import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap is imported

const GeminiChatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [resume, setResume] = useState('');

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        // Add user input to chat history
        setChatHistory([...chatHistory, { sender: 'user', message: userInput }]);

        // Send user input to Gemini backend to generate resume
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate-resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: userInput })
            });
            const data = await response.json();

            // Update chat with Gemini's generated resume HTML
            if (data.resume) {
                setResume(data.resume);
                setChatHistory([
                    ...chatHistory,
                    { sender: 'gemini', message: 'Your resume is ready!' },
                ]);
            }
        } catch (error) {
            setChatHistory([...chatHistory, { sender: 'gemini', message: 'Error generating resume.' }]);
        }
        setIsGenerating(false);
        setUserInput('');
    };

    const handleDownloadResume = () => {
        const blob = new Blob([resume], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.html';
        link.click();
    };

    return (
        <div className="container my-5">
            <div className="chat-container bg-light p-4 rounded shadow-sm">
                <div className="chat-history mb-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {chatHistory.map((chat, index) => (
                        <div key={index} className={`d-flex ${chat.sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
                            <div className={`p-3 rounded ${chat.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'}`}>
                                <p className="mb-0">{chat.message}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {!isGenerating && (
                    <div className="input-container">
                        <textarea
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder="Enter your details here..."
                            rows={6}
                            className="form-control mb-3"
                        />
                        <button className="btn btn-primary w-100" onClick={handleSendMessage}>Send</button>
                    </div>
                )}

                {resume && (
                    <div className="resume-popup bg-white p-4 border rounded mt-4 shadow-sm">
                        <div className="resume-content" dangerouslySetInnerHTML={{ __html: resume }} />
                        <button className="btn btn-success w-100 mt-3" onClick={handleDownloadResume}>Download as HTML</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeminiChatbot;
