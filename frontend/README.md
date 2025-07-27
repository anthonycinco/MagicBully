# MagicBully Frontend

A React-based frontend for the MagicBully AI cyberbullying detection system. This application provides a clean, user-friendly interface for analyzing text and images for harmful content.

## Features

- **Text Analysis**: Direct text input for cyberbullying detection
- **Image Upload**: Drag-and-drop image upload with OCR text extraction
- **Real-time Results**: Instant analysis with confidence scores and theme detection
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Ethical Considerations**: Built-in disclaimers and crisis support information

## Technologies Used

- **React 18**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Tesseract.js**: OCR library for text extraction from images
- **React Dropzone**: Drag-and-drop file upload functionality
- **Lucide React**: Beautiful icon library
- **Axios**: HTTP client for API communication

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── TextInput.js          # Text input form component
│   ├── ImageUpload.js        # Image upload with OCR
│   ├── ResultsPanel.js       # Analysis results display
│   └── Disclaimer.js         # Ethical disclaimers
├── App.js                    # Main application component
├── index.js                  # React entry point
└── index.css                 # Global styles and Tailwind imports
```

## API Integration

The frontend communicates with the backend API at `http://localhost:5000` (configured via proxy in package.json).

### Endpoints Used

- `POST /api/classify-text`: Submit text for cyberbullying analysis
- `POST /api/feedback`: Submit user feedback on analysis results (future)

## Key Features

### Text Analysis
- Clean text input interface
- Character count display
- Real-time validation

### Image Processing
- Drag-and-drop file upload
- Support for PNG, JPG, JPEG formats
- Automatic OCR text extraction
- Image preview with removal option

### Results Display
- Clear classification (Safe/Cyberbullying)
- Confidence score visualization
- Theme detection (racial slurs, gender harassment, etc.)
- Keyword highlighting
- Special warnings for suicidal content

### Ethical Features
- Prominent disclaimers about AI limitations
- Crisis support hotline information
- Privacy protection notices
- User feedback collection

## Styling

The application uses Tailwind CSS with custom color schemes:
- **Primary**: Blue shades for main actions
- **Danger**: Red shades for cyberbullying detection
- **Success**: Green shades for safe content
- **Warning**: Amber/orange for disclaimers and warnings

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run test suite
- `npm eject`: Eject from Create React App (not recommended)

### Code Style

- Use functional components with hooks
- Follow React best practices
- Maintain consistent naming conventions
- Include proper error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the MagicBully AI system and follows the same licensing terms.

## Support

For support or questions about the frontend, please refer to the main project documentation or create an issue in the repository. 