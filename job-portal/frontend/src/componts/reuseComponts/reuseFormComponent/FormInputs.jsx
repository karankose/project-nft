




import React, { useState } from 'react';

const FormInputs = ({
  label,
  type = 'text',
  name,
  placeholder = '',
  required = false,
  inputClassName = '',
  wrapperClassName = '',
  labelClassName = '',
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const isCheckbox = type === 'checkbox';
  const isTextarea = type === 'textarea';

  return (
    <div className={`mb-3 ${wrapperClassName}`}>
      {isCheckbox ? (
        <div className="form-check d-flex align-items-center">
          <input
            type="checkbox"
            className={`form-check-input ${inputClassName}`}
            id={name}
            name={name}
            required={required}
            checked={value} // for controlled checkbox
            onChange={onChange}
          />
          <label htmlFor={name} className={`form-check-label ms-2 ${labelClassName}`}>
            {label}
          </label>
        </div>
      ) : (
        <>
          {label && (
            <label htmlFor={name} className={`form-label ${labelClassName}`}>
              {label}
            </label>
          )}
          <div className="position-relative">
            {isTextarea ? (
              <textarea
                className={`form-control ${inputClassName}`}
                id={name}
                name={name}
                placeholder={placeholder}
                required={required}
                rows={4}
                value={value}
                onChange={onChange}
              />
            ) : (
              <input
                type={isPassword && showPassword ? 'text' : type}
                className={`form-control ${inputClassName}`}
                id={name}
                name={name}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
              />
            )}
            {isPassword && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: 'pointer', color: '#888', fontSize: '1.2rem' }}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash-fill"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FormInputs;





















// import React, { useState } from 'react';

// const FormInputs = ({
//   label,
//   type = 'text',
//   name,
//   placeholder = '',
//   required = false,
//   inputClassName = '',
//   wrapperClassName = '',
//   labelClassName = '',
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const isPassword = type === 'password';
//   const isCheckbox = type === 'checkbox';
//   const isTextarea = type === 'textarea';

//   return (
//     <div className={`mb-3 ${wrapperClassName}`}>
//       {isCheckbox ? (
//         <div className="form-check d-flex align-items-center">
//           <input
//             type="checkbox"
//             className={`form-check-input ${inputClassName}`}
//             id={name}
//             name={name}
//             required={required}
//           />
//           <label htmlFor={name} className={`form-check-label ms-2 ${labelClassName}`}>
//             {label}
//           </label>
//         </div>
//       ) : (
//         <>
//           {label && (
//             <label htmlFor={name} className={`form-label ${labelClassName}`}>
//               {label}
//             </label>
//           )}
//           <div className="position-relative">
//             {isTextarea ? (
//               <textarea
//                 className={`form-control ${inputClassName}`}
//                 id={name}
//                 name={name}
//                 placeholder={placeholder}
//                 required={required}
//                 rows={4}
//               />
//             ) : (
//               <input
//                 type={isPassword && showPassword ? 'text' : type}
//                 className={`form-control ${inputClassName}`}
//                 id={name}
//                 name={name}
//                 placeholder={placeholder}
//                 required={required}
//               />
//             )}      
//             {isPassword && (
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="position-absolute top-50 end-0 translate-middle-y me-3"
//                 style={{ cursor: 'pointer', color: '#888', fontSize: '1.2rem' }}
//               >
//                 {showPassword ? (
//                   <i className="bi bi-eye-slash-fill"></i>
//                 ) : (
//                   <i className="bi bi-eye-fill"></i>
//                 )}
//               </span>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default FormInputs;



// // (06:46:03 PM IST) Mohit Mourya:
// // import React from "react";

// // const CommonInput = ({
// //   label,
// //   name,
// //   value,
// //   onChange,
// //   onBlur,
// //   placeholder = "",
// //   type = "text",
// //   required = false,
// //   error = "",
// //   inputClassName = "",
// //   labelClassName = "",
// //   disabled = false,
// //   autoComplete = "off",
// // }) => {
// //   return (
// //     <div className="mb-4">
// //       {label && (
// //         <label htmlFor={name} className={`block mb-1 font-medium ${labelClassName}`}>
// //           {label} {required && <span className="text-red-500">*</span>}
// //         </label>
// //       )}
// //       <input
// //         type={type}
// //         name={name}
// //         id={name}
// //         value={value}
// //         onChange={onChange}
// //         onBlur={onBlur}
// //         placeholder={placeholder}
// //         required={required}
// //         disabled={disabled}
// //         autoComplete={autoComplete}
// //         className={`w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} ${inputClassName}`}
// //       />
// //       {error && (
// //         <p className="text-sm text-red-600 mt-1">{error}</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default CommonInput;

// // (06:51:00 PM IST) Karan :
// // thanks sir

