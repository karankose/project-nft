
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Images } from '../../assets/image';
// const API_URL = import.meta.env.VITE_API_URL;
// const Section1 = () => {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalCompanies: 0,
//     totalJobs: 0,
//     recentJobCount: 0,
//   });

 
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/stats`); 
//         if (response.data.success) {
//           setStats(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching stats", error);
//       }
//     };

//     fetchStats();
//   }, []); 

//   return (
//     <div className="container-fluid py-5" style={{ background: '#46B6EEDB' }}>
//       <div className="row justify-content-center g-4">
       
//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
//           <div className="d-flex bg-white p-3 rounded">
//             <img src={Images.Icon6} alt="Live Job" className="me-2" style={{ width: '40px', height: '40px', marginTop: '12px' }} />
//             <div>
//               <h4>{stats.totalJobs}</h4>
//               <p className="mb-0">Total Jobs</p>
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
//           <div className="d-flex bg-white p-3 rounded">
//             <img src={Images.Icon1} alt="Companies" className="me-2" style={{ width: '40px', height: '40px', marginTop: '12px' }} />
//             <div>
//               <h4>{stats.totalCompanies}</h4>
//               <p className="mb-0">Companies</p>
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
//           <div className="d-flex bg-white p-3 rounded">
//             <img src={Images.Icon2} alt="Candidates" className="me-2" style={{ width: '40px', height: '40px', marginTop: '12px' }} />
//             <div>
//               <h4>{stats.totalUsers}</h4>
//               <p className="mb-0">Candidates</p>
//             </div>
//           </div>
//         </div>

//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
//           <div className="d-flex bg-white p-3 rounded">
//             <img src={Images.Icon6} alt="New Jobs" className="me-2" style={{ width: '40px', height: '40px', marginTop: '12px' }} />
//             <div>
//               <h4>{stats.recentJobCount}</h4>
//               <p className="mb-0">Latest Jobs</p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Section1;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Images } from '../../assets/image';

const API_URL = import.meta.env.VITE_API_URL;

const Section1 = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCompanies: 0,
    totalJobs: 0,
    recentJobCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/stats`);
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };

    fetchStats();
  }, []);

  const cardData = [
    {
      icon: Images.Icon6,
      title: stats.totalJobs,
      label: 'Total Jobs',
    },
    {
      icon: Images.Icon1,
      title: stats.totalCompanies,
      label: 'Companies',
    },
    {
      icon: Images.Icon2,
      title: stats.totalUsers,
      label: 'Candidates',
    },
    {
      icon: Images.Icon6,
      title: stats.recentJobCount,
      label: 'Latest Jobs',
    },
  ];

  return (
    <div className="container-fluid py-5" style={{ background: '#46B6EEDB' }}>
      <div className="row justify-content-center g-4 px-3">
        {cardData.map((item, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="d-flex align-items-start bg-white p-3 rounded shadow-sm h-100">
              <img
                src={item.icon}
                alt={item.label}
                className="me-3 flex-shrink-0"
                style={{ width: '40px', height: '40px', marginTop: '4px' }}
              />
              <div>
                <h4 className="mb-1">{item.title}</h4>
                <p className="mb-0 text-muted">{item.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section1;
