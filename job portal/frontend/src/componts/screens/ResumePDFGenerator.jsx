import React from 'react';
import { jsPDF } from 'jspdf';

const ResumePDFGenerator = ({ resumeData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Resume", 20, 20);

    doc.setFontSize(14);
    let y = 40;

    resumeData.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.question}`, 20, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      doc.text(`Answer: ${item.answer}`, 25, y);
      y += 12;
    });

    doc.save("resume.pdf");
  };

  return (
    <div>
      <button className="btn btn-success mt-4" onClick={generatePDF}>
        Download Resume as PDF
      </button>
    </div>
  );
};

export default ResumePDFGenerator;
