import React from 'react';
import FormInputs from '../../componts/reuseComponts/reuseFormComponent/FormInputs';
import CustomButton from '../../componts/reuseComponts/reuseButton/CustomButton';

const CreateRecruiterForm = ({ formData, onChange, onSubmit }) => {
  const requiredFields = ['FirstName', 'LastName', 'Email', 'CompanyName', 'Password'];

  return (
    <div className="card mb-4 p-3">
      <form onSubmit={onSubmit}>
        {["FirstName", "LastName", "Email", "Phone", "CompanyName", "Designation", "Password"].map(field => (
          <FormInputs
            key={field}
            label={field.replace(/([A-Z])/g, ' $1')}
            name={field}
            type={field === 'Password' ? 'password' : field === 'Email' ? 'email' : 'text'}
            value={formData[field]}
            onChange={onChange}
            required={requiredFields.includes(field)}
            wrapperClassName="mb-3"
          />
        ))}
        <CustomButton type="submit" label="Create" btnClassName="btn btn-primary" />
      </form>
    </div>
  );
};

export default CreateRecruiterForm;
