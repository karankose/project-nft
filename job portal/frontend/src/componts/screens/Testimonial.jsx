import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const testimonials = [
  {
    stars: 5,
    text: "JobPortal made my job search so much easier! The filters helped me quickly find visa sponsorship roles, and the CV tweaking feature gave my application a competitive edge. I'm thrilled to have landed my dream job in just a few weeks!",
    name: "Robert Fox",
    role: "UI/UX Designer",
    img: "/images/Image.png"
  },
  {
    stars: 4,
    text: "JobPortal helped me find visa sponsorship jobs that matched my skills. The cover letter feature made the process simple, and I secured my new role faster than expected. Highly recommend it for UK job seekers!",
    name: "Sarah K",
    role: "Marketing Manager",
    img: "/images/Image2.png"
  },
  {
    stars: 5,
    text: "JobPortal’s interview preparation and job search features were incredibly helpful. The platform made the whole process smooth, from finding jobs to polishing my CV. Thanks to JobPortal, I secured a fantastic opportunity!",
    name: "Jane Cooper",
    role: "Data Analyst",
    img: "/images/Image3.png"
  }
];

const Testimonial = () => {
  return (
    <div className="py-5 position-relative" style={{ backgroundColor: '#EDF5FE' }}>
      <div className="container text-center position-relative">
        <h2><strong>Client’s <span style={{ color: '#004AAD' }}>Testimonial</span></strong></h2>

        <div className="position-relative mt-5">
         
          <button
            className="btn btn-light shadow-sm position-absolute top-50 start-0 translate-middle-y"
            style={{ zIndex: 2 }}
          >
            <i className="bi bi-arrow-left text-primary"></i>
          </button>

         
          <div className="row justify-content-center">
            {testimonials.map((item, idx) => (
              <div className="col-md-6 col-lg-4 mb-4" key={idx}>
                <div className="card h-100 shadow-sm border-0 p-4 rounded-4">
                
                  <div className="mb-2 text-start">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i
                        key={i}
                        className={`bi me-1 ${i < item.stars ? 'bi-star-fill text-warning' : 'bi-star-fill text-muted'}`}
                      />
                    ))}
                  </div>

                  
                  <p className="text-start">{item.text}</p>

                  
                  <div className="d-flex align-items-center mt-auto">
                    <img src={item.img} alt={item.name} className="rounded-circle me-3" width="45" height="45" />
                    <div className="text-start">
                      <strong>{item.name}</strong><br />
                      <small className="text-muted">{item.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

         
          <button
            className="btn btn-primary  shadow-sm text-white position-absolute top-50 end-0 translate-middle-y"
            style={{ zIndex: 2 }}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
