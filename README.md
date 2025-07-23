# Style Wasail

#Group Members:
#Muhammad Hamid Sarfraz 453812
#Syed Momin Shah 470776

A modern web application built with React and Express, featuring a beautiful UI and robust backend functionality.

## 🚀 Features

- Modern React-based frontend with Vite
- Express.js backend server
- MongoDB database integration with Mongoose ODM
- Advanced database relationships and data modeling
- User authentication and authorization
- Cloudinary integration for image handling
- Responsive design with Tailwind CSS
- Interactive UI components with Framer Motion
- Masonry layout for content display
- Date picking functionality
- Three.js and Vanta.js for advanced visual effects

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- React Icons
- Three.js
- Vanta.js

### Backend
- Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- Cloudinary for image storage
- Multer for file uploads

### Database
- MongoDB Atlas for cloud hosting
- Mongoose for schema validation and modeling
- Advanced indexing for optimized queries
- Data relationships and references
- Aggregation pipeline for complex queries

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd style-wasail
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🚀 Running the Application

### Development Mode
To run both frontend and backend concurrently:
```bash
npm run dev
```

### Backend Server Only
```bash
npm run server
```

### Production Build
```bash
npm run build
npm run serve
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run server` - Run backend server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run serve` - Serve production build
- `npm run lint` - Run ESLint

## 🔧 Development

The project uses ESLint for code linting and follows modern React best practices. The frontend is built with Vite for optimal development experience, while the backend uses Express.js for API endpoints.

## 📊 Database Structure

### Models
- User Model
  - Authentication details
  - Profile information
  - Role-based access control
  - Timestamps for tracking

- Product Model
  - Product details
  - Pricing information
  - Inventory tracking
  - Category relationships

- Order Model
  - Order status tracking
  - Customer references
  - Product references
  - Payment information

### Database Features
- Schema validation using Mongoose
- Indexed fields for optimized queries
- Proper data relationships using references
- Timestamps for data tracking
- Middleware for data processing
- Aggregation pipelines for complex queries

### Data Relationships
- One-to-Many relationships
- Many-to-Many relationships
- Referenced documents
- Embedded documents where appropriate

## 📁 Project Structure

```
style-wasail/
├── src/               # Frontend source code
│   ├── components/    # React components
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── context/      # React context
│   └── ...
├── server/           # Backend source code
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Custom middleware
│   └── ...
├── public/           # Static files
└── ...
```

## 🔐 Environment Variables

Make sure to set up the following environment variables:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. Please contact the repository owner for contribution guidelines. 
