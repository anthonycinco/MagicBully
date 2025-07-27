# MagicBully Frontend

A Next.js-based frontend for the MagicBully AI cyberbullying detection system. This application provides a clean, user-friendly interface for analyzing text and images for harmful content.

## Features

- **Text Analysis**: Direct text input for cyberbullying detection
- **Image Upload**: Drag-and-drop image upload with OCR text extraction
- **Real-time Results**: Instant analysis with confidence scores and theme detection
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Ethical Considerations**: Built-in disclaimers and crisis support information

## Technologies Used

- **Next.js 14**: React framework with App Router
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
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
npm start
```

This creates an optimized production build and starts the production server.

## Project Structure

```
frontend/
├── pages/                    # Next.js pages
│   ├── _app.js              # App wrapper
│   ├── _document.js         # Custom document
│   └── index.js             # Home page
├── components/               # React components
│   ├── App.js               # Main application component
│   ├── TextInput.js         # Text input form component
│   ├── ImageUpload.js       # Image upload with OCR
│   ├── ResultsPanel.js      # Analysis results display
│   └── Disclaimer.js        # Ethical disclaimers
├── styles/                   # Global styles
│   └── globals.css          # Tailwind CSS and custom styles
├── public/                   # Static assets
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## API Integration

The frontend communicates with the backend API through Next.js API routes and rewrites.

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### API Rewrites

The `next.config.js` file includes API rewrites to proxy requests to the backend:

```javascript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
    },
  ];
}
```

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

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

### Code Style

- Use functional components with hooks
- Follow Next.js best practices
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