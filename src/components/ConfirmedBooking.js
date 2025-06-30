import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmedBooking = () => {
  return (
    <section className="confirmation-section">
      <div className="confirmation-container">
        <div className="confirmation-content">
          <div className="success-icon" aria-hidden="true">
            ✓
          </div>
          <h1>Booking Confirmed!</h1>
          <p className="confirmation-message">
            🎉 Thank you for choosing Little Lemon! Your table reservation has been successfully confirmed.
          </p>
          
          <div className="confirmation-details-card">
            <h3>What's Next?</h3>
            <div className="next-steps">
              <div className="step">
                <span className="step-icon">📧</span>
                <span>You'll receive a confirmation email shortly</span>
              </div>
              <div className="step">
                <span className="step-icon">📱</span>
                <span>We'll send a reminder 24 hours before your visit</span>
              </div>
              <div className="step">
                <span className="step-icon">🍽️</span>
                <span>Arrive 10 minutes early for the best experience</span>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <h3>Need to Make Changes?</h3>
            <p>Contact us if you need to modify your reservation:</p>
            <div className="contact-methods">
              <div className="contact-method">
                <span className="contact-icon">📞</span>
                <span className="contact-info">(555) 123-4567</span>
              </div>
              <div className="contact-method">
                <span className="contact-icon">✉️</span>
                <span className="contact-info">info@littlelemon.com</span>
              </div>
            </div>
          </div>
          
          <div className="confirmation-actions">
            <Link to="/booking" className="book-again-btn" aria-label="Make another reservation">
              📅 Book Another Table
            </Link>
            <Link to="/" className="home-btn" aria-label="Return to homepage">
              🏠 Return Home
            </Link>
          </div>

          <div className="social-share">
            <p>Share your experience with us!</p>
            <div className="social-icons">
              <span>📱 #LittleLemonExperience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmedBooking; 