// ResumePreview.jsx
import React from 'react';
import Mustache from 'mustache';

const ResumePreview = ({ template, data }) => {
  const renderedHtml = Mustache.render(template, data);

  return (
    <div
      className="resume-preview"
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

export default ResumePreview;
