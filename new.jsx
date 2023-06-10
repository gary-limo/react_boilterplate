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
          <div className="form-column">
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

            {/* Repeat the same structure for other fields */}
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
        );
      case 2:
        return (
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
              <select
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
              >
                <option value="">Select Occupation</option>
                <option value="engineer">Engineer</option>
                <option value="teacher">Teacher</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="industry">Industry</label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
              >
                <option value="">Select Industry</option>
                <option value="it">IT</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="">Select Experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3+">3+ years</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="my-form-container">
      <div className="step-indicator">
        <div className={`step-dot ${activeStep === 1 ? 'active' : ''}`} />
        <div className={`step-dot ${activeStep === 2 ? 'active' : ''}`} />
        <div className={`step-dot ${activeStep === 3 ? 'active' : ''}`} />
      </div>
      <h1 className="form-title"> </h1>
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
          {activeStep === 3 && (
            <button type="submit">Submit</button>
          )}
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

          .form-column {
            flex: 1;
            margin-right: 20px;
          }

          .form-group {
            margin-bottom: 20px;
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
            width: 100%; /* Change to 100% width */
            box-sizing: border-box;
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
            justify-content: space-between; /* Adjust spacing between buttons */
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
