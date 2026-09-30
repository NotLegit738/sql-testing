# Caspian Host Staff Application Portal

A production-ready staff application portal for Caspian Host, built with Next.js, TypeScript, and MySQL.

## Features

- **Public Staff Application Form**: Professional form for applicants to join the Caspian Host team
- **Admin Dashboard**: Secure dashboard for managing applications
- **MySQL Database Integration**: Remote MySQL database connection
- **Authentication**: Secure JWT-based admin authentication with rate limiting
- **Search & Filtering**: Advanced search and filter capabilities for applications
- **Status Management**: Update application status (pending, reviewing, accepted, rejected)
- **Responsive Design**: Mobile-friendly, modern UI with Caspian Host branding
- **Production Ready**: Configured for Coolify deployment

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- MySQL (mysql2)
- JWT Authentication (jose)
- Password Hashing (bcryptjs)
- Form Validation (zod)

## Prerequisites

- Node.js 20 or higher
- MySQL database (remote or local)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd staff_mysql
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
DATABASE_HOST=87.76.199.91
DATABASE_PORT=3306
DATABASE_NAME=mysql-database-yy8twvyr7uvifkdksdvrgxp8
DATABASE_USER=mysql
DATABASE_PASSWORD=your_database_password

ADMIN_EMAIL=admin@caspian.host
ADMIN_PASSWORD=your_admin_password

SESSION_SECRET=your_random_session_secret
```

5. Initialize the database:
```bash
npm run init-db
```

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Deployment on Coolify

### Option 1: Using Nixpacks (Recommended)

1. Push your code to GitHub
2. In Coolify, create a new application
3. Connect your GitHub repository
4. Coolify will automatically detect the Nixpacks configuration
5. Set the following environment variables in Coolify:
   - `DATABASE_HOST`
   - `DATABASE_PORT`
   - `DATABASE_NAME`
   - `DATABASE_USER`
   - `DATABASE_PASSWORD`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`

6. Deploy the application

### Option 2: Using Docker

1. Build the Docker image:
```bash
docker build -t caspian-staff-portal .
```

2. Run the container:
```bash
docker run -p 3000:3000 \
  -e DATABASE_HOST=87.76.199.91 \
  -e DATABASE_PORT=3306 \
  -e DATABASE_NAME=mysql-database-yy8twvyr7uvifkdksdvrgxp8 \
  -e DATABASE_USER=mysql \
  -e DATABASE_PASSWORD=your_password \
  -e ADMIN_EMAIL=admin@caspian.host \
  -e ADMIN_PASSWORD=your_admin_password \
  -e SESSION_SECRET=your_secret \
  caspian-staff-portal
```

## Database Configuration

The application connects to a remote MySQL database. Ensure:

- The MySQL server allows remote connections from your application server
- The database user has the necessary permissions (CREATE, SELECT, INSERT, UPDATE, DELETE)
- The database credentials are stored as environment variables, not in code

## Security Features

- **Password Hashing**: Admin passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Login attempts are rate limited to prevent brute force attacks
- **SQL Injection Prevention**: All database queries use parameterized statements
- **Input Validation**: All user inputs are validated using Zod schemas
- **Environment Variables**: Sensitive data is stored in environment variables
- **HTTP-only Cookies**: Session cookies are HTTP-only and secure in production

## Application Routes

- `/` - Home page with navigation
- `/staff-application` - Public staff application form
- `/admin/login` - Admin login page
- `/admin/applications` - Admin dashboard

## API Endpoints

- `POST /api/applications` - Submit a new application
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/applications` - Get all applications (with search/filter)
- `GET /api/admin/applications/:id` - Get application details
- `PATCH /api/admin/applications/:id` - Update application status
- `DELETE /api/admin/applications/:id` - Delete application
- `GET /api/admin/stats` - Get application statistics

## License

This project is proprietary software for Caspian Host.
