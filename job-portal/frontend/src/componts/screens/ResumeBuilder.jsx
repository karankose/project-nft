
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux'; // Import useSelector hook to access Redux state
// import { Images } from '../../assets/image';

// const ResumeBuilder = () => {
//     const [inputData, setInputData] = useState('');
//     const [generatedResume, setGeneratedResume] = useState('');
//     const [isGenerating, setIsGenerating] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);

//     // // Get the userId from Redux state
//     // const userId = useSelector((state) => state.user.currentUser?.id); // Adjust based on your state structure
//     const userId = useSelector((state) => state.user.currentUser?.id || "defaultId");
//     const API_URL = import.meta.env.VITE_API_URL;

//     const handleInputChange = (e) => {
//         setInputData(e.target.value);
//     };

//     const handleGenerateResume = async () => {
//         setIsGenerating(true);
//         try {
//             const response = await axios.post(`${API_URL}/resume/ai-gen`, {
//                 data: inputData,
//             });
//             console.log("Current user:", currentUser);
//             setGeneratedResume(response.data.resume);
//         } catch (error) {
//             console.error('Error generating resume:', error);
//         } finally {
//             setIsGenerating(false);
//         }
//     };

//     // const handleSaveResume = async () => {
//     //     if (!userId) {
//     //         alert('User ID is required to save the resume.');
//     //         return;
//     //     }

//     //     const title = "My Resume";  // Optionally, allow the user to provide a title.

//     //     setIsSaving(true);
//     //     try {
//     //         await axios.post(`${API_URL}/resume/save`, {
//     //             userId,
//     //             resumeHtml: generatedResume,
//     //             title,
//     //         });
//     //         console.log({
//     //             userId,
//     //             resumeHtml: generatedResume,
//     //             title,
//     //         });
//     //         console.log("Save Response:", response);
//     //         alert("Resume saved successfully!");
//     //     } catch (error) {
//     //         console.error("Error saving resume:", error.response || error.message);
//     //         console.error("Error saving resume:", error);
//     //     } finally {
//     //         setIsSaving(false);
//     //     }
//     // };




//     // const handleSaveResume = async () => {
//     //     if (!userId) {
//     //         alert('User ID is required to save the resume.');
//     //         return;
//     //     }
    
//     //     const title = "My Resume";  // Optionally, allow the user to provide a title.
    
//     //     setIsSaving(true);
//     //     try {
//     //         const response = await axios.post(`${API_URL}/resume/save`, {
//     //             userId,
//     //             resumeHtml: generatedResume,
//     //             title,
//     //         });
    
//     //         // Check if the backend response indicates success
//     //         if (response.data.success) {
//     //             alert("Resume saved successfully!");
//     //             console.log("Saved Resume ID:", response.data.resumeId);
//     //         } else {
//     //             alert(`Failed to save resume: ${response.data.message}`);
//     //         }
//     //     } catch (error) {
//     //         console.error("Error saving resume:", error.response || error.message);
//     //         alert("Error saving resume. Please try again.");
//     //     } finally {
//     //         setIsSaving(false);
//     //     }
//     // };


//     const handleSaveResume = async () => {
//         if (!userId) {
//             alert('User ID is required to save the resume.');
//             return;
//         }
    
//         const title = "My Resume";  // Optionally, allow the user to provide a title.
    
//         setIsSaving(true);
//         try {
//             // const response = await axios.post(`${API_URL}/resume/save`, {
//             //     userId,
//             //     resumeHtml: generatedResume,
//             //     title,
//               const response =  await axios.post("http://localhost:5000/api/resume/save", {
//                     userId: currentUser._id,
//                     resumeHtml: generatedHtml,
//                     title: resumeTitle, // this can be optional
//             });
//             console.log("Sending to backend:", {
//                 userId: currentUser._id,
//                 resumeHtml: generatedHtml,
//                 title: resumeTitle,
//               });
              
    
//             // Check if the backend response indicates success
//             if (response.data.success) {
//                 alert("Resume saved successfully!");
//                 console.log("Saved Resume ID:", response.data.resumeId);
//             } else {
//                 alert(`Failed to save resume: ${response.data.message}`);
//             }
//         } catch (error) {
//             console.error("Error saving resume:", error.response || error.message);
//             alert("Error saving resume. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };
    

//     const handleDownloadResume = () => {
//         const blob = new Blob([generatedResume], { type: 'text/html' });
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'resume.html';
//         link.click();
//     };

//     return (
//         <div className="container my-5 pt-5">
//             <div className="d-flex flex-column flex-md-row align-items-start gap-4 bg-light p-4 rounded shadow-sm">

//                 {/* Left Column - GIF */}
//                 <div className="gif-container flex-shrink-0 text-center">
//                     <img
//                         src={Images.AIBot}
//                         alt="Resume GIF"
//                         style={{ maxWidth: '250px', borderRadius: '12px' }}
//                     />
//                     <p className="mt-2 text-muted">Let's build your resume!</p>
//                 </div>

//                 {/* Right Column - Input Section */}
//                 <div className="flex-grow-1 w-100">
//                     <h3>Create Your Resume</h3>
//                     <textarea
//                         value={inputData}
//                         onChange={handleInputChange}
//                         placeholder="Enter your details like name, education, skills, etc."
//                         rows="6"
//                         className="form-control mb-3"
//                     />
//                     <button
//                         onClick={handleGenerateResume}
//                         className="btn btn-primary w-100 mb-4"
//                         disabled={isGenerating}
//                     >
//                         {isGenerating ? <img src={Images.procesing} className='loading-Resume' /> : 'Generate Resume'}
//                     </button>

//                     {/* Save and Download Buttons */}
//                     {generatedResume && (
//                         <div className="popup bg-white p-4 border rounded shadow-sm">
//                             <div
//                                 className="resume-content"
//                                 dangerouslySetInnerHTML={{ __html: generatedResume }}
//                             />
//                             <div className="d-flex justify-content-end gap-3 mt-3">
//                                 <button
//                                     className="btn btn-secondary"
//                                     onClick={() => setGeneratedResume('')}
//                                 >
//                                     Close
//                                 </button>
//                                 <button
//                                     className="btn btn-success"
//                                     onClick={handleSaveResume}
//                                     disabled={isSaving}
//                                 >
//                                     {isSaving ? 'Saving...' : 'Save Resume'}
//                                 </button>
//                                 <button className="btn btn-success" onClick={handleDownloadResume}>
//                                     Download Resume
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// // export default ResumeBuilder;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux'; // Import useSelector hook to access Redux state
// import { Images } from '../../assets/image';

// const ResumeBuilder = () => {
//     const [inputData, setInputData] = useState('');
//     const [generatedResume, setGeneratedResume] = useState('');
//     const [isGenerating, setIsGenerating] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);

//     // Get the userId from Redux state
//     const userId = useSelector((state) => state.user.currentUser?.id || "defaultId");
//     const API_URL = import.meta.env.VITE_API_URL;

//     const handleInputChange = (e) => {
//         setInputData(e.target.value);
//     };

//     const handleGenerateResume = async () => {
//         setIsGenerating(true);
//         try {
//             const response = await axios.post(`${API_URL}/resume/ai-gen`, {
//                 data: inputData,
//             });
//             setGeneratedResume(response.data.resume); // Assuming response contains the resume HTML
//         } catch (error) {
//             console.error('Error generating resume:', error);
//         } finally {
//             setIsGenerating(false);
//         }
//     };

//     const handleSaveResume = async () => {
//         if (!userId) {
//             alert('User ID is required to save the resume.');
//             return;
//         }

//         const title = "My Resume";  // Optionally, allow the user to provide a title.

//         setIsSaving(true);
//         try {
//             const response = await axios.post(`${API_URL}/resume/save`, {
//                 userId,
//                 resumeHtml: generatedResume,
//                 title,
//             });

//             console.log("Sending to backend:", {
//                 userId,
//                 resumeHtml: generatedResume,
//                 title,
//             });

//             // Check if the backend response indicates success
//             if (response.data.success) {
//                 alert("Resume saved successfully!");
//                 console.log("Saved Resume ID:", response.data.resumeId);
//             } else {
//                 alert(`Failed to save resume: ${response.data.message}`);
//             }
//         } catch (error) {
//             console.error("Error saving resume:", error.response || error.message);
//             alert("Error saving resume. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleDownloadResume = () => {
//         const blob = new Blob([generatedResume], { type: 'text/html' });
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'resume.html';
//         link.click();
//     };

//     return (
//         <div className="container my-5 pt-5">
//             <div className="d-flex flex-column flex-md-row align-items-start gap-4 bg-light p-4 rounded shadow-sm">

//                 {/* Left Column - GIF */}
//                 <div className="gif-container flex-shrink-0 text-center">
//                     <img
//                         src={Images.AIBot}
//                         alt="Resume GIF"
//                         style={{ maxWidth: '250px', borderRadius: '12px' }}
//                     />
//                     <p className="mt-2 text-muted">Let's build your resume!</p>
//                 </div>

//                 {/* Right Column - Input Section */}
//                 <div className="flex-grow-1 w-100">
//                     <h3>Create Your Resume</h3>
//                     <textarea
//                         value={inputData}
//                         onChange={handleInputChange}
//                         placeholder="Enter your details like name, education, skills, etc."
//                         rows="6"
//                         className="form-control mb-3"
//                     />
//                     <button
//                         onClick={handleGenerateResume}
//                         className="btn btn-primary w-100 mb-4"
//                         disabled={isGenerating}
//                     >
//                         {isGenerating ? <img src={Images.procesing} className='loading-Resume' /> : 'Generate Resume'}
//                     </button>

//                     {/* Save and Download Buttons */}
//                     {generatedResume && (
//                         <div className="popup bg-white p-4 border rounded shadow-sm">
//                             <div
//                                 className="resume-content"
//                                 dangerouslySetInnerHTML={{ __html: generatedResume }}
//                             />
//                             <div className="d-flex justify-content-end gap-3 mt-3">
//                                 <button
//                                     className="btn btn-secondary"
//                                     onClick={() => setGeneratedResume('')}
//                                 >
//                                     Close
//                                 </button>
//                                 <button
//                                     className="btn btn-success"
//                                     onClick={handleSaveResume}
//                                     disabled={isSaving}
//                                 >
//                                     {isSaving ? 'Saving...' : 'Save Resume'}
//                                 </button>
//                                 <button className="btn btn-success" onClick={handleDownloadResume}>
//                                     Download Resume
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ResumeBuilder;























































































import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector hook to access Redux state
import { Images } from '../../assets/image';

const ResumeBuilder = () => {
    const [inputData, setInputData] = useState('');
    const [generatedResume, setGeneratedResume] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Get the userId from Redux state
    const userId = useSelector((state) => state.user.currentUser?.id);
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

            // Check if the response has the generated resume
            if (response.data?.resume) {
                setGeneratedResume(response.data.resume);
            } else {
                alert("Failed to generate resume. Please try again.");
            }
        } catch (error) {
            console.error('Error generating resume:', error);
            alert("Error generating resume. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveResume = async () => {
        if (!userId) {
            alert('You must be logged in to save the resume.');
            return;
        }

        if (!generatedResume) {
            alert('No resume generated yet.');
            return;
        }

        const title = "My Resume";  // Optionally, allow the user to provide a title.

        setIsSaving(true);
        try {
            const response = await axios.post(`${API_URL}/resume/save`, {
                userId,
                resumeHTML: generatedResume,
                title,
            });
            // console.log("resumeHTML", resumeHTML);
            console.log("userId", userId);
            if (response.data?.success) {
                alert("Resume saved successfully!");
                console.log("Saved Resume ID:", response.data.resumeId);
            } else {
                alert(`Failed to save resume: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error saving resume:", error.response || error.message);
            alert("Error saving resume. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDownloadResume = () => {
        if (!generatedResume) {
            alert("No resume generated yet.");
            return;
        }

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
                        {isGenerating ? <img src={Images.procesing} className='loading-Resume' /> : 'Generate Resume'}
                    </button>

                    {/* Save and Download Buttons */}
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
                                <button
                                    className="btn btn-success"
                                    onClick={handleSaveResume}
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Saving...' : 'Save Resume'}
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

