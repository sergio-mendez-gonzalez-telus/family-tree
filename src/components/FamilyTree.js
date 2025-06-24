import React, { useState, useEffect, useRef } from 'react';
import { FaTree, FaInfoCircle, FaFilePdf } from 'react-icons/fa';
import FamilyMember from './FamilyMember';
import AddMemberForm from './AddMemberForm';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './FamilyTree.css';

const FamilyTree = () => {
  const treeRef = useRef(null);
  // Initialize state from localStorage if available
  const [familyMembers, setFamilyMembers] = useState(() => {
    try {
      const savedMembers = localStorage.getItem('familyMembers');
      console.log('Initial loading from localStorage:', savedMembers);
      return savedMembers ? JSON.parse(savedMembers) : [];
    } catch (error) {
      console.error('Error loading initial data from localStorage:', error);
      return [];
    }
  });
  
  // Save family members to localStorage whenever it changes
  useEffect(() => {
    try {
      // Don't save if it's the initial empty state
      if (familyMembers.length > 0 || localStorage.getItem('familyMembers')) {
        console.log('Saving to localStorage:', familyMembers);
        localStorage.setItem('familyMembers', JSON.stringify(familyMembers));
        // Verify it was saved correctly
        const saved = localStorage.getItem('familyMembers');
        console.log('Verified saved data:', saved);
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [familyMembers]);
  
  const addFamilyMember = (newMember) => {
    setFamilyMembers([...familyMembers, { ...newMember, id: Date.now() }]);
  };
  
  const deleteFamilyMember = (id) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };
  
  const exportToPDF = () => {
    if (familyMembers.length === 0) {
      alert('Please add family members before exporting to PDF');
      return;
    }
    
    const input = treeRef.current;
    
    html2canvas(input, { 
      scale: 2,
      useCORS: true,
      logging: false
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      
      pdf.setFontSize(18);
      pdf.text('Family Tree', pdfWidth / 2, 20, { align: 'center' });
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('family-tree.pdf');
    });
  };
  
  return (
    <div className="family-tree-container">
      <div className="header-container">
        <h1><FaTree className="title-icon" /> Family Member</h1>
        {familyMembers.length > 0 && (
          <button className="export-pdf-button" onClick={exportToPDF}>
            <FaFilePdf /> Export to PDF
          </button>
        )}
      </div>
      <AddMemberForm onAddMember={addFamilyMember} />
      <div className="family-tree" ref={treeRef}>
        {familyMembers.length === 0 ? (
          <p className="empty-tree-message">
            <FaInfoCircle className="info-icon" /> 
            Add family members to start building your tree
          </p>
        ) : (
          <div className="members-container">
            {familyMembers.map((member, index) => {
              // Calculate position around the tree
              // Start at -90 degrees (top) and go clockwise
              const startAngle = -90;
              const angle = (startAngle + index * (360 / familyMembers.length)) * (Math.PI / 180);
              
              // Distribute cards based on number of members
              // More members = larger radius to avoid overlap
              const minRadius = 35; // Minimum radius as percentage of container
              
              // Adjust radius based on number of members to prevent overlap
              let baseRadius;
              if (familyMembers.length <= 3) {
                baseRadius = minRadius;
              } else if (familyMembers.length <= 6) {
                baseRadius = minRadius + 5;
              } else {
                baseRadius = minRadius + 10;
              }
              
              // Add some variation to the radius to make it look more natural
              // Use the index to create a pattern (0, 1, 2, 0, 1, 2, ...)
              const radiusVariation = [0, -3, 3];
              const variationIndex = index % radiusVariation.length;
              const radius = baseRadius + radiusVariation[variationIndex];
              
              // Calculate x and y coordinates (center is 50%, 50%)
              const x = 50 + (Math.cos(angle) * radius); // Convert to percentage of container
              const y = 50 + (Math.sin(angle) * radius); // Convert to percentage of container
              
              // Create a style object for positioning
              const style = {
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 2
              };
              
              return (
                <div key={member.id} className="member-position" style={style}>
                  <FamilyMember 
                    member={member} 
                    onDelete={deleteFamilyMember} 
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyTree;
