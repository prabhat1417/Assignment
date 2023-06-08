import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    dob: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    const validationErrors = validateField(name, value);
    setErrors({ ...errors, [name]: validationErrors[name] || '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      saveFormData();
    } else {
      setErrors(validationErrors);
    }
  };

  const validateField = (name, value) => {
    const errors = {};
    if (name === 'name') {
      if (!value) {
        errors.name = 'Name is required.';
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        errors.name = 'Name should not contain special characters.';
      }
    } else if (name === 'email') {
      if (!value) {
        errors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errors.email = 'Invalid email format.';
      }
    } else if (name === 'address') {
      if (!value) {
        errors.address = 'Address is required.';
      }
    } else if (name === 'phone') {
      if (!value) {
        errors.phone = 'Phone is required.';
      } else if (!/^[1-9]\d{9}$/.test(value)) {
        errors.phone = 'Phone should be 10 digits and should not start with 0.';
      }
    } else if (name === 'dob') {
      if (!value) {
        errors.dob = 'Date of Birth is required.';
      } else if (!/^\d{2}-\d{2}-\d{4}$/.test(value)) {
        errors.dob = 'Date of Birth should be in DD-MM-YYYY format.';
      }
    }
    return errors;
  };

  const validateForm = () => {
    const validationErrors = {};
    Object.keys(formData).forEach((name) => {
      const value = formData[name];
      const fieldErrors = validateField(name, value);
      if (Object.keys(fieldErrors).length > 0) {
        validationErrors[name] = fieldErrors[name];
      }
    });
    return validationErrors;
  };

  const saveFormData = () => {
    axios
      .post('/api/form', formData)
      .then((response) => {
        console.log('Form data saved successfully:', response.data);
        setFormData({
          name: '',
          email: '',
          address: '',
          phone: '',
          dob: '',
        });
        setErrors({});
      })
      .catch((error) => {
        console.error('Error saving form data:', error);
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
      <h1>Registration form</h1>
    <hr></hr>
        <label className="form-label">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label className="form-label">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label className="form-label">Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="form-input"
        />
        {errors.address && <span className="error">{errors.address}</span>}
      </div>
      <div className="form-group">
        <label className="form-label">Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
      <div className="form-group">
        <label className="form-label">Date of Birth:</label>
        <input
          type="text"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="form-input"
        />
        {errors.dob && <span className="error">{errors.dob}</span>}
      </div>
      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
};

export default Form;
