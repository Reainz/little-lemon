import React, { useState } from 'react';

const BookingForm = ({ availableTimes, dispatch, submitForm }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // If date changes, update available times
    if (name === 'date' && value) {
      dispatch({ type: 'UPDATE_TIMES', date: value });
      // Reset time selection when date changes
      setFormData(prev => ({
        ...prev,
        time: ''
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }

    if (!formData.guests || formData.guests < 1 || formData.guests > 10) {
      newErrors.guests = 'Number of guests must be between 1 and 10';
    }

    if (!formData.occasion) {
      newErrors.occasion = 'Please select an occasion';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate async submission
      setTimeout(() => {
        const success = submitForm(formData);
        setIsSubmitting(false);
        
        if (!success) {
          alert('Booking failed. Please try again.');
        }
      }, 1500);
    }
  };

  // Check if form is valid for submit button state
  const isFormValid = () => {
    return formData.date && 
           formData.time && 
           formData.guests >= 1 && 
           formData.guests <= 10 && 
           formData.occasion;
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get formatted date for display
  const getFormattedDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="booking-section">
      <div className="booking-container">
        <h1>Reserve a Table</h1>
        <p className="booking-subtitle">
          Experience authentic Mediterranean cuisine in our cozy atmosphere
        </p>
        
        <form onSubmit={handleSubmit} className="booking-form" noValidate>
          <div className="form-group">
            <label htmlFor="res-date">
              📅 Choose date <span aria-label="required">*</span>
            </label>
            <input
              type="date"
              id="res-date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={getMinDate()}
              required
              aria-describedby={errors.date ? "date-error" : "date-help"}
              aria-invalid={errors.date ? "true" : "false"}
            />
            {formData.date && !errors.date && (
              <span id="date-help" className="form-help-inline">
                {getFormattedDate(formData.date)}
              </span>
            )}
            {errors.date && (
              <span id="date-error" className="error-message" role="alert">
                {errors.date}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="res-time">
              🕐 Choose time <span aria-label="required">*</span>
            </label>
            <select
              id="res-time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              aria-describedby={errors.time ? "time-error" : "time-help"}
              aria-invalid={errors.time ? "true" : "false"}
              disabled={!formData.date || availableTimes.length === 0}
            >
              <option value="">
                {!formData.date ? "Select a date first" : "Select a time"}
              </option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {availableTimes.length > 0 && !errors.time && (
              <span id="time-help" className="form-help-inline">
                {availableTimes.length} times available
              </span>
            )}
            {errors.time && (
              <span id="time-error" className="error-message" role="alert">
                {errors.time}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="guests">
              👥 Number of guests <span aria-label="required">*</span>
            </label>
            <div className="guest-input-container">
              <input
                type="number"
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                min="1"
                max="10"
                required
                aria-describedby={errors.guests ? "guests-error" : "guests-help"}
                aria-invalid={errors.guests ? "true" : "false"}
              />
              <div className="guest-counter">
                <button
                  type="button"
                  onClick={() => handleChange({ target: { name: 'guests', value: Math.max(1, formData.guests - 1) } })}
                  disabled={formData.guests <= 1}
                  aria-label="Decrease number of guests"
                  className="guest-btn"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => handleChange({ target: { name: 'guests', value: Math.min(10, formData.guests + 1) } })}
                  disabled={formData.guests >= 10}
                  aria-label="Increase number of guests"
                  className="guest-btn"
                >
                  +
                </button>
              </div>
            </div>
            {!errors.guests && (
              <span id="guests-help" className="form-help-inline">
                {formData.guests === 1 ? '1 guest' : `${formData.guests} guests`}
              </span>
            )}
            {errors.guests && (
              <span id="guests-error" className="error-message" role="alert">
                {errors.guests}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="occasion">
              🎉 Occasion <span aria-label="required">*</span>
            </label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              required
              aria-describedby={errors.occasion ? "occasion-error" : undefined}
              aria-invalid={errors.occasion ? "true" : "false"}
            >
              <option value="">Select an occasion</option>
              <option value="Birthday">🎂 Birthday</option>
              <option value="Anniversary">💕 Anniversary</option>
              <option value="Date">🌹 Date Night</option>
              <option value="Business">💼 Business Dinner</option>
              <option value="Celebration">🥂 Celebration</option>
              <option value="Other">✨ Other</option>
            </select>
            {errors.occasion && (
              <span id="occasion-error" className="error-message" role="alert">
                {errors.occasion}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
            disabled={!isFormValid() || isSubmitting}
            aria-label={isSubmitting ? "Submitting reservation..." : "Submit reservation"}
          >
            {isSubmitting ? 'Reserving Your Table...' : '🍽️ Reserve Table'}
          </button>

          <p className="form-help">
            We'll send you a confirmation email with all the details
          </p>
        </form>
      </div>
    </section>
  );
};

export default BookingForm; 