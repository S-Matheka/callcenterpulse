# Call Center Executive Dashboard

A comprehensive, executive-level Call Center Dashboard built with React, TypeScript, and Tailwind CSS. This dashboard provides C-level users with operational, customer, and agent insights using AI-enhanced data.

## Features

- 📊 Real-time KPI monitoring
- 👥 Agent performance tracking
- 🎯 Customer insights and analytics
- 📞 Call review and analysis
- 💼 Business outcomes measurement
- 🌙 Dark mode support
- 📱 Responsive design

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons
- React Router DOM
- Vite

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/callcenter-dashboard.git
cd callcenter-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
src/
  components/
    layout/         # Layout components (Sidebar, Header)
    dashboard/      # Dashboard-specific components
    shared/        # Shared/reusable components
  pages/           # Page components
  context/         # React Context providers
  data/           # Mock data and types
  hooks/          # Custom React hooks
  utils/          # Utility functions
  App.tsx         # Main App component
  main.tsx        # Application entry point
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 