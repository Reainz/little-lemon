# Little Lemon Restaurant Booking System

A modern, accessible React-based table reservation system for Little Lemon Restaurant. This application allows customers to book tables online with real-time availability checking and form validation.

## 🌟 Features

- **Interactive Booking Form**: User-friendly form with date picker, time selector, guest count, and occasion selection
- **Real-time Availability**: Dynamic time slot updates based on selected date
- **Form Validation**: Comprehensive client-side validation with HTML5 and React
- **Accessibility**: WCAG compliant with proper ARIA attributes and semantic HTML
- **Responsive Design**: Mobile-first design that works on all devices
- **Confirmation System**: Booking confirmation page with success feedback
- **State Management**: Efficient state management using useReducer
- **Unit Testing**: Comprehensive test coverage with React Testing Library

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16.0 or higher)
- npm (version 8.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd little-lemon-booking-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🧪 Testing

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test --watchAll
```

### Run tests with coverage
```bash
npm test --coverage
```

### Test Coverage

The project includes comprehensive unit tests covering:
- Form validation (HTML5 and React validation)
- Component rendering and accessibility
- State management (reducer functions)
- API integration
- User interactions and error handling

## 🏗️ Build and Deployment

### Create production build
```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to static hosting
The built files can be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

## 📁 Project Structure

```
src/
├── components/
│   ├── BookingForm.js          # Main booking form component
│   ├── BookingForm.test.js     # BookingForm unit tests
│   ├── ConfirmedBooking.js     # Booking confirmation page
│   ├── Header.js               # Navigation header
│   ├── Main.js                 # Main component with routing
│   └── Main.test.js            # Main component unit tests
├── api.js                      # API functions for booking operations
├── App.js                      # Root application component
├── App.css                     # Application styles
├── index.js                    # Application entry point
└── index.css                   # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#495E57` - Main brand color
- **Primary Yellow**: `#F4CE14` - Accent and CTA buttons
- **Secondary Orange**: `#EE9972` - Supporting accent
- **Secondary Light**: `#FBDABB` - Light backgrounds
- **Highlight Light**: `#EDEFEE` - Subtle backgrounds
- **Highlight Dark**: `#333333` - Text and dark elements

### Typography
- Primary font: Segoe UI, system fonts
- Responsive font sizing
- Proper contrast ratios for accessibility

## 🔧 API Integration

### Available Functions

#### `fetchAPI(date)`
Retrieves available booking times for a specific date.
- **Parameter**: `date` (Date object)
- **Returns**: Array of available time strings (e.g., `['17:00', '18:30', '19:00']`)

#### `submitAPI(formData)`
Submits booking data to the reservation system.
- **Parameter**: `formData` (Object with booking details)
- **Returns**: Boolean indicating success/failure

### Example Usage
```javascript
import { fetchAPI, submitAPI } from './api';

// Get available times for today
const availableTimes = fetchAPI(new Date());

// Submit a booking
const bookingData = {
  date: '2024-12-25',
  time: '18:00',
  guests: 4,
  occasion: 'Birthday'
};
const success = submitAPI(bookingData);
```

## 🛠️ State Management

The application uses React's `useReducer` hook for state management:

### Reducer Actions
- **UPDATE_TIMES**: Updates available times when date changes

### State Structure
```javascript
{
  availableTimes: ['17:00', '18:00', '19:00', '20:00']
}
```

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of semantic elements
- **ARIA Attributes**: Comprehensive ARIA labeling
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Optimized for assistive technologies
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG compliant color ratios
- **Error Handling**: Accessible error messages

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Form Validation

### Client-side Validation
- **Date**: Must be today or future date
- **Time**: Must select from available options
- **Guests**: Must be between 1-10
- **Occasion**: Must select an option

### Validation Types
- HTML5 validation attributes
- React-based validation functions
- Real-time error feedback
- Submit button state management

## 🚨 Error Handling

- Form validation errors with user-friendly messages
- API failure handling with retry prompts
- Graceful degradation for JavaScript disabled browsers
- Network error recovery

## 🔄 User Flow

1. User navigates to booking page
2. Selects reservation date
3. Available times are fetched and displayed
4. User completes form (time, guests, occasion)
5. Form validation occurs in real-time
6. User submits valid form
7. Booking is processed via API
8. User is redirected to confirmation page
9. Success message is displayed

## 🧑‍💻 Development

### Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Create production build
- `npm run eject` - Eject from Create React App (⚠️ irreversible)

### Code Style

- ES6+ JavaScript
- Functional components with hooks
- Consistent naming conventions
- Comprehensive comments
- ESLint configuration

## 📈 Performance

- Code splitting with React Router
- Optimized bundle size
- Lazy loading for better performance
- Efficient re-rendering with proper dependency arrays

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Contact the development team

---

**Little Lemon Restaurant Booking System** - Making reservations simple and accessible for everyone! 🍋 