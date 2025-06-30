import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from './BookingForm';

// Mock functions
const mockDispatch = jest.fn();
const mockSubmitForm = jest.fn();

// Default props
const defaultProps = {
  availableTimes: ['17:00', '18:00', '19:00', '20:00'],
  dispatch: mockDispatch,
  submitForm: mockSubmitForm
};

describe('BookingForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders booking form with all required fields', () => {
    render(<BookingForm {...defaultProps} />);
    
    expect(screen.getByRole('heading', { name: /reserve a table/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /make your reservation/i })).toBeInTheDocument();
  });

  test('has correct HTML5 validation attributes', () => {
    render(<BookingForm {...defaultProps} />);
    
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);

    expect(dateInput).toHaveAttribute('required');
    expect(dateInput).toHaveAttribute('type', 'date');
    expect(dateInput).toHaveAttribute('min');

    expect(timeSelect).toHaveAttribute('required');

    expect(guestsInput).toHaveAttribute('required');
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');

    expect(occasionSelect).toHaveAttribute('required');
  });

  test('submit button is disabled when form is invalid', () => {
    render(<BookingForm {...defaultProps} />);
    
    const submitButton = screen.getByRole('button', { name: /make your reservation/i });
    expect(submitButton).toBeDisabled();
  });

  test('submit button is enabled when form is valid', async () => {
    render(<BookingForm {...defaultProps} />);
    
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    const submitButton = screen.getByRole('button', { name: /make your reservation/i });

    fireEvent.change(dateInput, { target: { value: '2024-12-25' } });
    fireEvent.change(timeSelect, { target: { value: '18:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });
    fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  test('updates available times when date changes', () => {
    render(<BookingForm {...defaultProps} />);
    
    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: '2024-12-25' } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_TIMES',
      date: '2024-12-25'
    });
  });

  test('resets time selection when date changes', async () => {
    render(<BookingForm {...defaultProps} />);
    
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);

    // First select a time
    fireEvent.change(timeSelect, { target: { value: '18:00' } });
    expect(timeSelect.value).toBe('18:00');

    // Then change the date
    fireEvent.change(dateInput, { target: { value: '2024-12-25' } });

    // Time should be reset
    await waitFor(() => {
      expect(timeSelect.value).toBe('');
    });
  });

  test('displays error messages for invalid inputs', async () => {
    render(<BookingForm {...defaultProps} />);
    
    const submitButton = screen.getByRole('button', { name: /make your reservation/i });
    
    // Try to submit empty form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
      expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
      expect(screen.getByText(/please select an occasion/i)).toBeInTheDocument();
    });
  });

  test('validates number of guests range', async () => {
    render(<BookingForm {...defaultProps} />);
    
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const submitButton = screen.getByRole('button', { name: /make your reservation/i });

    // Test with invalid number (0)
    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/number of guests must be between 1 and 10/i)).toBeInTheDocument();
    });

    // Test with invalid number (11)
    fireEvent.change(guestsInput, { target: { value: '11' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/number of guests must be between 1 and 10/i)).toBeInTheDocument();
    });
  });

  test('clears error messages when user starts typing', async () => {
    render(<BookingForm {...defaultProps} />);
    
    const dateInput = screen.getByLabelText(/choose date/i);
    const submitButton = screen.getByRole('button', { name: /make your reservation/i });

    // Submit to trigger error
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
    });

    // Start typing in date field
    fireEvent.change(dateInput, { target: { value: '2024-12-25' } });

    await waitFor(() => {
      expect(screen.queryByText(/please select a date/i)).not.toBeInTheDocument();
    });
  });

  test('calls submitForm with correct data on valid submission', async () => {
    mockSubmitForm.mockReturnValue(true);
    render(<BookingForm {...defaultProps} />);
    
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    const submitButton = screen.getByRole('button', { name: /make your reservation/i });

    fireEvent.change(dateInput, { target: { value: '2024-12-25' } });
    fireEvent.change(timeSelect, { target: { value: '18:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });
    fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalledWith({
        date: '2024-12-25',
        time: '18:00',
        guests: '4',
        occasion: 'Birthday'
      });
    });
  });

  test('displays alert on submission failure', async () => {
    window.alert = jest.fn();
    mockSubmitForm.mockReturnValue(false);
    render(<BookingForm {...defaultProps} />);
    
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    const submitButton = screen.getByRole('button', { name: /make your reservation/i });

    fireEvent.change(dateInput, { target: { value: '2024-12-25' } });
    fireEvent.change(timeSelect, { target: { value: '18:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });
    fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Booking failed. Please try again.');
    });
  });

  test('renders available time options correctly', () => {
    const availableTimes = ['17:00', '17:30', '18:00', '18:30'];
    render(<BookingForm {...defaultProps} availableTimes={availableTimes} />);
    
    const timeSelect = screen.getByLabelText(/choose time/i);
    
    availableTimes.forEach(time => {
      expect(screen.getByRole('option', { name: time })).toBeInTheDocument();
    });
  });

  test('has proper accessibility attributes', () => {
    render(<BookingForm {...defaultProps} />);
    
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);

    expect(dateInput).toHaveAttribute('aria-invalid', 'false');
    expect(timeSelect).toHaveAttribute('aria-invalid', 'false');
    expect(guestsInput).toHaveAttribute('aria-invalid', 'false');
    expect(occasionSelect).toHaveAttribute('aria-invalid', 'false');
  });

  test('sets aria-invalid to true for fields with errors', async () => {
    render(<BookingForm {...defaultProps} />);
    
    const submitButton = screen.getByRole('button', { name: /make your reservation/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const dateInput = screen.getByLabelText(/choose date/i);
      const timeSelect = screen.getByLabelText(/choose time/i);
      const occasionSelect = screen.getByLabelText(/occasion/i);

      expect(dateInput).toHaveAttribute('aria-invalid', 'true');
      expect(timeSelect).toHaveAttribute('aria-invalid', 'true');
      expect(occasionSelect).toHaveAttribute('aria-invalid', 'true');
    });
  });
}); 