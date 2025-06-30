import React, { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import ConfirmedBooking from './ConfirmedBooking';
import { fetchAPI, submitAPI } from '../api';

// Reducer function to update available times
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(new Date(action.date));
    default:
      return state;
  }
};

// Initialize available times for today
export const initializeTimes = () => {
  return fetchAPI(new Date());
};

const Main = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  // Function to submit form data
  const submitForm = (formData) => {
    const success = submitAPI(formData);
    if (success) {
      navigate('/confirmed');
      return true;
    }
    return false;
  };

  return (
    <main>
      <Routes>
        <Route 
          path="/" 
          element={
            <BookingForm 
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          } 
        />
        <Route 
          path="/booking" 
          element={
            <BookingForm 
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          } 
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
};

export default Main; 