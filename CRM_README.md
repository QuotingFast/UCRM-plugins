# Modern CRM System

A comprehensive Customer Relationship Management system built with modern web technologies. This full-stack application provides a complete solution for managing customers, leads, deals, tasks, and business relationships.

## 🚀 Features

### Core CRM Functionality
- **Dashboard**: Overview with statistics, charts, and recent activity
- **Companies**: Manage company records and information
- **Contacts**: Track individual contacts and relationships  
- **Leads**: Capture and nurture potential customers
- **Deals**: Manage sales pipeline and opportunities
- **Tasks**: Track follow-ups and to-do items
- **Activities**: Log and view interaction history

### Technical Features
- **Authentication**: Secure JWT-based user authentication
- **Modern UI**: Responsive design with Tailwind CSS
- **Real-time Updates**: Dynamic data updates
- **Data Visualization**: Charts and analytics dashboard
- **RESTful API**: Well-structured backend API
- **Database**: SQLite for easy setup and portability

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query** for data fetching
- **React Hook Form** for form handling
- **Recharts** for data visualization
- **Lucide React** for icons
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **SQLite** database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Morgan** for logging
- **Helmet** for security headers
- **CORS** for cross-origin requests

## 📁 Project Structure

```
modern-crm/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth, etc.)
│   │   ├── pages/          # Page components
│   │   └── main.tsx        # App entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── database/       # Database connection and migrations
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API route handlers
│   │   ├── types/          # TypeScript type definitions
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
└── package.json           # Root package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or set up the project**
   ```bash
   # The project files are already created in your workspace
   cd /workspace
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env file with your configurations
   ```

4. **Initialize the database**
   ```bash
   cd server
   npm run db:migrate
   ```

5. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:3000

## 🔐 Authentication

### Default Admin Account
- **Email**: admin@crm.com
- **Password**: admin123

You can also register new accounts through the signup form.

## 📊 Database Schema

The CRM uses SQLite with the following main tables:
- `users` - User accounts and authentication
- `companies` - Company records
- `contacts` - Individual contact information
- `leads` - Lead management
- `deals` - Sales opportunities
- `tasks` - Tasks and follow-ups
- `activities` - Activity logging

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run install:all` - Install dependencies for all packages

### Server
- `npm run dev` - Start backend in development mode
- `npm run build` - Build backend for production
- `npm run start` - Start production server
- `npm run db:migrate` - Run database migrations

### Client
- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build locally

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Express Validator for API input validation
- **CORS Configuration**: Controlled cross-origin requests
- **Helmet**: Security headers for Express
- **SQL Injection Protection**: Parameterized queries

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean, professional design
- **Dark/Light Theme Ready**: Structure supports theming
- **Accessible**: Built with accessibility in mind
- **Fast Navigation**: Client-side routing for smooth UX
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages

## 📈 Future Enhancements

### Potential Features to Add
- **Email Integration**: Send and track emails
- **Calendar Integration**: Meeting scheduling
- **File Attachments**: Document management
- **Advanced Reporting**: Custom report builder
- **Team Management**: User roles and permissions
- **API Integration**: Third-party service integrations
- **Mobile App**: React Native mobile application
- **Real-time Notifications**: WebSocket notifications
- **Advanced Search**: Full-text search capabilities
- **Data Export**: CSV/Excel export functionality

### Technical Improvements
- **Database Migration**: PostgreSQL for production
- **Caching**: Redis for improved performance
- **Background Jobs**: Queue system for heavy tasks
- **Monitoring**: Application performance monitoring
- **Testing**: Comprehensive test suite
- **Docker**: Containerization for deployment
- **CI/CD**: Automated deployment pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the console for error messages
2. Ensure all dependencies are installed correctly
3. Verify database migrations have been run
4. Check that environment variables are set correctly

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Companies
- `GET /api/companies` - Get all companies
- `POST /api/companies` - Create new company
- `GET /api/companies/:id` - Get company by ID
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Contacts
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create new contact
- `GET /api/contacts/:id` - Get contact by ID
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create new lead
- `GET /api/leads/:id` - Get lead by ID
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Deals
- `GET /api/deals` - Get all deals
- `POST /api/deals` - Create new deal
- `GET /api/deals/:id` - Get deal by ID
- `PUT /api/deals/:id` - Update deal
- `DELETE /api/deals/:id` - Delete deal

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

---

**Built with ❤️ using Modern Web Technologies**