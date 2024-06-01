import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTrend } from '../../actions/TrendsAction.js'; // Adjust import path as needed
import './Trendcreate.css'


// Simple modal component for demonstration
const SimpleModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <>
        {/* Overlay with blur effect */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)',
          zIndex: 999,
        }} onClick={onClose}></div>
        {/* Modal content */}
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.776)',
          padding: '20px',
          zIndex: 1000,
          borderRadius: '10px', // Rounded corners
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow for depth
          maxWidth: '500px', // Max width for the modal
          width: '100%', // Responsive width
        }}>
          {children}
        </div>
      </>
    );
  };
  

const AddTrendForm = () => {
  const [trendName, setTrendName] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.authReducer.authData);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTrend({ trendName, description, userId }));
    setTrendName('');
    setDescription('');
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <button className='tbut' onClick={() => setIsModalOpen(true)}>Set Trend</button>
      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="trendName" className='labal'>Trend Name</label>
            <input
              type="text"
              id="trendName"
              className="input-fieldd"
              value={trendName}
              onChange={(e) => setTrendName(e.target.value)}
              required
            />
          </div>
          <button className='tbut1' type="submit">Add Trend</button>
        </form>
      </SimpleModal>
    </>
  );
};

export default AddTrendForm;
