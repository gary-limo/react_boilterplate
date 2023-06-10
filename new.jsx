import React, { useState } from 'react';


const MyForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    occupation: '',
    industry: '',
    experience: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    console.log(formData);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderFormStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="form-row">
            <div className="form-column" style={{ marginRight: '20px' }}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        );
      // ...remaining cases and other functions
    }
  };

  // ...remaining form structure

  return (
    <div className="my-form-container">
      <div className="step-indicator">
        <div className={`step-dot ${activeStep === 1 ? 'active' : ''}`} />
        <div className={`step-dot ${activeStep === 2 ? 'active' : ''}`} />
        <div className={`step-dot ${activeStep === 3 ? 'active' : ''}`} />
      </div>
      <h1 className="form-title">My Form</h1>
      <form className="my-form" onSubmit={handleSubmit}>
        {renderFormStep()}

        <div className="form-group button-group">
          {activeStep > 1 && (
            <button type="button" onClick={handlePrev}>
              Previous
            </button>
          )}
          {activeStep < 3 && (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          )}
          {activeStep === 3 && <button type="submit">Submit</button>}
        </div>
      </form>

      <style>
        {`
          /* Basic form styles */
          .my-form-container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            position: relative;
          }

          .my-form {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          .form-row {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-bottom: 20px;
          }

          .form-column {
            flex: 1;
            margin-bottom: 20px;
          }

          .form-group {
            margin-bottom: 10px;
            width: 100%;
          }

          label {
            font-weight: bold;
          }

          input[type='text'],
          input[type='email'],
          input[type='tel'],
          select {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 10px; /* Add margin-bottom for spacing */
          }

          button[type='submit'],
          button[type='button'] {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
          }

          button[type='submit']:hover,
          button[type='button']:hover {
            background-color: #0056b3;
          }

          .button-group {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .step-indicator {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
          }

          .step-dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #ccc;
            margin: 0 10px;
            transition: background-color 0.3s ease;
          }

          .step-dot.active {
            background-color: #007bff;
          }

          .form-title {
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
            transition: opacity 0.3s ease;
          }

          .form-title.slide-up {
            opacity: 0;
            transform: translateY(-20px);
          }

          @media screen and (max-width: 600px) {
            .my-form-container {
              padding: 10px;
            }

            .my-form {
              flex-direction: column;
            }

            .form-column {
              margin-right: 0;
              margin-bottom: 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MyForm;
