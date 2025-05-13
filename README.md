# InternGenie Backend

This is the backend service for the InternGenie project, a platform designed to help students find and manage internship opportunities.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (if using MongoDB as database)

### Installation

1. Clone the repository
```bash
git clone https://github.com/pu-raihan/InternGenie.git
cd InternGenie/backend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── utils/         # Utility functions
│   └── config/        # Configuration files
├── tests/             # Test files
└── package.json
```

## API Documentation

API documentation will be available at `/api-docs` when the server is running.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 