# Team SEA Web Application

This is the web application for Team SEA, a Danish non-profit organization helping people in need by building wells and bringing hope through donations.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd sea-hope-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`.

## Development

### Project Structure

- `src/` - Source code
  - `components/` - React components
  - `pages/` - Page components
  - `contexts/` - React contexts
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions
  - `services/` - API services
  - `types/` - TypeScript type definitions

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Deployment

The application can be deployed to any static hosting service that supports Node.js applications.

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
