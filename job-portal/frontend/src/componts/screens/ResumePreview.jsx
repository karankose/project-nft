import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_URL; // Move out of component

 const ResumePreview = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user.currentUser?.id); // Retrieve userId from Redux store

  useEffect(() => {
    const fetchResumes = async () => {
      if (!userId) {
        setLoading(false); // Stop loading if no userId
        return;
      }

      try {
        console.log("heio")
        const response = await axios.get(`${API_URL}/resume/resumes/${userId}`);
        setResumes(Array.isArray(response.data?.resumes) ? response.data.resumes : []);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [userId]); // Dependency array only depends on userId

  const handleDownloadResume = async (resumeId) => {
    try {
      const response = await axios.get(`${API_URL}/resume/download/${resumeId}`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `resume-${resumeId}.pdf`; 
      link.click();
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  return (
    <div className="container my-5 pt-5">
      <h3>Your Saved Resumes</h3>
      {loading ? (
        <p>Loading...</p>
      ) : !userId ? (
        <p>Please log in to view your saved resumes.</p> // Display message if no userId
      ) : resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        resumes.map((resume) => (
          <div key={resume._id} className="resume-card p-3 mb-4 border rounded shadow-sm">
            <h4>{resume.title}</h4>
            <div dangerouslySetInnerHTML={{ __html: resume.html }} />
            <button
              onClick={() => handleDownloadResume(resume._id)}
              className="btn btn-primary mt-2"
            >
              Download Resume
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ResumePreview;
