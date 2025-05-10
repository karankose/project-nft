import React from 'react';

const FaqSection = () => {
  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">
        Frequently Asked <span className="text-info">Questions</span>
      </h2>

      <div className="accordion" id="faqAccordion">

        <div className="accordion-item border-0">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button fw-bold text-dark bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              1. How can I find sponsored job opportunities?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body text-muted">
              Our advanced search filters allow you to focus on jobs that specifically offer visa sponsorship. 
              Simply apply the “Sponsored Jobs” filter when searching, and we’ll show you the relevant listings.
            </div>
          </div>
        </div>

        
        {[
          "2. How do I get notified of new job openings?",
          "3. Is JobPortal free to use?",
          "4. Can I apply to jobs directly through JobPortal?",
          "5. How do I get notified of new job openings?",
          "6. Does JobPortal help with CV writing and interview preparation?",
          "7. Are the jobs on JobPortal verified?",
          "8. How do I upgrade to a Premium or Pro Plan?",
        ].map((question, index) => {
          const collapseId = `collapse${index + 2}`;
          const headingId = `heading${index + 2}`;
          return (
            <div className="accordion-item bg-white text-black border border-secondary" key={index}>
              <h2 className="accordion-header" id={headingId}>
                <button
                  className="accordion-button collapsed bg-white text-black"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${collapseId}`}
                  aria-expanded="false"
                  aria-controls={collapseId}
                >
                  {question}
                </button>
              </h2>
              <div
                id={collapseId}
                className="accordion-collapse collapse"
                aria-labelledby={headingId}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-dark">
                  This is a placeholder answer for: {question}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqSection;
