import React, { useState } from 'react';
import { FaPlus, FaUser, FaBriefcase, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import './AddMemberForm.css';

const AddMemberForm = ({ onAddMember }) => {
  const [formData, setFormData] = useState({
    title: '',
    profession: '',
    age: '',
    familyRelation: '',
    gender: 'female' // Default to female
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Name is required';
    }
    
    if (!formData.profession.trim()) {
      newErrors.profession = 'Profession is required';
    }
    
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || parseInt(formData.age) <= 0) {
      newErrors.age = 'Age must be a positive number';
    }
    
    if (!formData.familyRelation.trim()) {
      newErrors.familyRelation = 'Family relation is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddMember({
        ...formData,
        age: parseInt(formData.age)
      });
      
      // Reset form after submission
      setFormData({
        title: '',
        profession: '',
        age: '',
        familyRelation: '',
        gender: 'female'
      });
    }
  };
  
  return (
    <div className="add-member-form-container">
      <h2>Add Family Member</h2>
      <form onSubmit={handleSubmit} className="add-member-form">
        <div className="form-group">
          <label htmlFor="title"><FaUser className="input-icon" /> Name:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter name"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="profession"><FaBriefcase className="input-icon" /> Profession:</label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="Enter profession"
          />
          {errors.profession && <span className="error">{errors.profession}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="age"><FaCalendarAlt className="input-icon" /> Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            min="1"
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="familyRelation"><FaUsers className="input-icon" /> Family Relation:</label>
          <input
            type="text"
            id="familyRelation"
            name="familyRelation"
            value={formData.familyRelation}
            onChange={handleChange}
            placeholder="E.g., Father, Mother, Son, etc."
          />
          {errors.familyRelation && <span className="error">{errors.familyRelation}</span>}
        </div>
        
        <div className="form-group gender-selection">
          <label>Gender:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              <span>Female (She)</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              <span>Male (He)</span>
            </label>
          </div>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>
        
        <button type="submit" className="add-button">
          <FaPlus className="button-icon" /> Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMemberForm;
