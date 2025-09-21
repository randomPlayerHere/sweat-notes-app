# SweatNotes Simple Frontend 🏋️

This is a simple, educational frontend for the SweatNotes AI fitness application. It's built with pure HTML, CSS, and JavaScript to help you learn web development fundamentals.

## What You'll Learn

### HTML Structure
- Semantic HTML elements (`<header>`, `<main>`, `<section>`)
- Forms and input validation
- Accessibility best practices
- Meta tags and document structure

### CSS Styling
- CSS Grid and Flexbox layouts
- Modern design techniques (glassmorphism, gradients)
- Responsive design with media queries
- CSS animations and transitions
- Component-based styling approach

### JavaScript Programming
- DOM manipulation and event handling
- Async/await for API calls
- Error handling and user feedback
- Form data processing
- Dynamic content rendering

## Features

### 1. Calorie Calculator
- **Input Fields:** Age, gender, weight, height, workout type, body fat %, workout frequency
- **API Integration:** Connects to FastAPI `/predict/` endpoint
- **Results Display:** Shows daily calorie needs with explanatory information
- **Validation:** Client-side form validation with user-friendly error messages

### 2. Workout Generator  
- **Natural Language Input:** Describe your ideal workout in plain English
- **AI Processing:** Connects to FastAPI `/generate/` endpoint
- **Formatted Results:** Displays structured workout plans with exercises, sets, reps, and rest times
- **Smart Display:** Handles different workout structures gracefully

### 3. Modern UI/UX
- **Responsive Design:** Works on desktop, tablet, and mobile devices
- **Loading States:** Visual feedback during API calls
- **Error Handling:** Clear error messages when things go wrong
- **Glassmorphism Design:** Modern, attractive visual style

## How to Run

### Prerequisites
1. **Backend Running:** Make sure your FastAPI backend is running on `http://localhost:8000`
2. **Web Browser:** Any modern browser (Chrome, Firefox, Safari, Edge)

### Simple Setup (No Dependencies!)
1. **Open the file:** Double-click `index.html` or open it in your browser
2. **Start using:** The app will work immediately - no build process required!

### Alternative: Local Server (Recommended)
If you want to avoid CORS issues, you can serve the file through a local server:

```bash
# Using Python (if you have it installed)
cd /path/to/frontend/simple
python -m http.server 3000

# Then open http://localhost:3000 in your browser
```

## Code Structure Explained

### File Organization
```
frontend/simple/
├── index.html          # Everything in one file for simplicity
└── README.md          # This documentation
```

### HTML Sections
```html
<!-- Document setup with meta tags and title -->
<head>...</head>

<!-- Main container with responsive layout -->
<div class="container">
  <!-- App header with branding -->
  <header class="header">...</header>
  
  <!-- Two-column grid for main features -->
  <main class="main-grid">
    <!-- Calorie calculator form -->
    <section class="card">...</section>
    
    <!-- Workout generator form -->
    <section class="card">...</section>
  </main>
  
  <!-- Informational section -->
  <section class="card">...</section>
</div>
```

### CSS Architecture
```css
/* Reset and base styles */
* { ... }
body { ... }

/* Layout components */
.container { ... }
.main-grid { ... }

/* UI components */
.card { ... }
.btn { ... }
.form-input { ... }

/* Responsive design */
@media (max-width: 768px) { ... }
```

### JavaScript Organization
```javascript
// Configuration
const API_BASE_URL = 'http://localhost:8000';

// Utility functions
function showMessage() { ... }
function hideMessage() { ... }

// Feature implementations
async function handleCalorieSubmit() { ... }
async function handleWorkoutSubmit() { ... }

// Event listeners
document.addEventListener('DOMContentLoaded', ...);
```

## API Integration

### Calorie Calculator Endpoint
- **URL:** `POST http://localhost:8000/predict/`
- **Request Body:**
```json
{
  "user_id": "string",
  "age": 25,
  "gender": "Male",
  "weight": 70.0,
  "height": 1.75,
  "workout_type": "Running",
  "fat_percentage": 15.0,
  "workout_frequency": 3
}
```

### Workout Generator Endpoint
- **URL:** `POST http://localhost:8000/generate/`
- **Request Body:**
```json
{
  "query": "I want a 3-day upper body workout using dumbbells for a beginner"
}
```

## Learning Exercises

### Beginner Level
1. **Change Colors:** Modify the CSS gradient colors
2. **Add Fields:** Add new form inputs for additional user data
3. **Update Text:** Change button text and form labels
4. **Style Tweaks:** Adjust padding, margins, and font sizes

### Intermediate Level
1. **Form Validation:** Add client-side validation for edge cases
2. **Local Storage:** Save user preferences between sessions
3. **Dark Mode:** Add a toggle for light/dark themes
4. **Animations:** Enhance loading states and transitions

### Advanced Level
1. **Progressive Web App:** Add service worker and manifest
2. **Offline Support:** Cache data for offline use
3. **Advanced Layouts:** Experiment with CSS Grid and Flexbox
4. **Performance:** Optimize loading and rendering

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Make sure your backend has CORS enabled
   - Try using a local server instead of opening file directly

2. **API Connection Failed:**
   - Verify backend is running on `http://localhost:8000`
   - Check browser console for specific error messages

3. **Form Not Submitting:**
   - Check browser console for JavaScript errors
   - Ensure all required fields are filled

4. **Styling Issues:**
   - Try hard refresh (Ctrl+F5 or Cmd+Shift+R)
   - Check browser developer tools for CSS conflicts

### Debug Tips
- Open browser Developer Tools (F12)
- Check Console tab for JavaScript errors
- Use Network tab to see API requests
- Inspect HTML elements to understand structure

## Next Steps

Once you're comfortable with this simple version, you can:

1. **Split into separate files:** Move CSS to `.css` file, JavaScript to `.js` file
2. **Add a build process:** Use tools like Vite, Webpack, or Parcel
3. **Use a framework:** Convert to React, Vue, or Angular
4. **Add more features:** User accounts, data persistence, advanced visualizations
5. **Deploy:** Host on Netlify, Vercel, or GitHub Pages

## Resources for Learning More

- **HTML:** [MDN HTML Guide](https://developer.mozilla.org/en-US/docs/Web/HTML)
- **CSS:** [CSS Tricks](https://css-tricks.com/) and [MDN CSS Guide](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **JavaScript:** [JavaScript.info](https://javascript.info/) and [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **APIs:** [Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Happy coding! 🚀