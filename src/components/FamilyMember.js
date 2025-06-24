import React from 'react';
import { FaTrash, FaUser } from 'react-icons/fa';
import './FamilyMember.css';

const FamilyMember = ({ member, onDelete }) => {
  const { id, title, profession, age, familyRelation, gender } = member;
  
  // Determine pronoun based on gender
  const pronoun = gender === 'male' ? "He" : "She";
  
  return (
    <div className="family-member">
      <div className="member-content">
        <h3><FaUser className="title-icon" /> {familyRelation}</h3>
        <p>
          {pronoun} is {title}, {pronoun.toLowerCase()} is my {familyRelation}, 
          {pronoun.toLowerCase()} is {age} years old and {pronoun.toLowerCase()} is a {profession}.
        </p>
      </div>
      <button 
        className="delete-button" 
        onClick={() => onDelete(id)}
        aria-label="Delete family member"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default FamilyMember;
