# Blood Bridge BD

Blood Bridge BD is a comprehensive blood donation management system that connects blood donors with those in need. The platform facilitates blood donation requests, donor management, and streamlines the process of finding blood donors in Bangladesh.

## 🚀 Features

### Public Features

- **Search Donors**: Search blood donors by blood group, district, and upazila
- **Blood Donation Requests**: View and create blood donation requests
- **Blog Section**: Read and stay updated with blood donation related articles
- **Contact System**: Get in touch with the platform administrators

### User Dashboard

- **Donor Profile Management**: Manage donor profile and donation history
- **Donation Request Management**: Create, edit, and track donation requests
- **My Donation Requests**: View and manage personal donation requests

### Admin Dashboard

- **User Management**: Manage all users and their roles
- **Content Management**: Manage blogs and website content
- **Donation Request Overview**: Monitor and manage all donation requests
- **Analytics**: Track platform statistics and donor activities

## 🛠️ Technologies Used

### Frontend

- **React** (v18.3.1) - Core frontend framework
- **TypeScript** - For type-safe code
- **Vite** - Build tool and development server
- **React Router DOM** (v7.1.1) - For routing and navigation
- **React Hook Form** - Form handling and validation
- **Axios** - HTTP client for API requests

### UI Components & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Shadcn/UI** - UI components library
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **SweetAlert2** - Beautiful alerts
- **Lottie React** - Animation library

### State Management & Data Fetching

- **TanStack Query** - Server state management
- **Firebase** - Authentication and cloud services

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript ESLint** - TypeScript linting

## 📁 Project Structure

```
blood-bridge-bd-client/
├── src/
│   ├── assets/           # Static assets
│   ├── components/
│   │   └── ui/          # Reusable UI components
│   ├── firebase/        # Firebase configuration
│   ├── hooks/           # Custom React hooks
│   ├── layout/          # Layout components
│   ├── lib/             # Utility functions
│   ├── pages/
│   │   ├── Dashboard/   # Admin dashboard pages
│   │   ├── DonorDashboard/ # Donor dashboard pages
│   │   └── Home/        # Public pages
│   ├── provider/        # Context providers
│   ├── routes/          # Route configurations
│   └── shared/          # Shared components
├── public/              # Public assets
└── .vscode/            # VS Code configuration
```

## 🎨 Theme Customization

The project uses a customized Tailwind CSS configuration with:

- Custom color schemes
- Dark mode support
- Customized border radius
- Chart color variables
- Animation utilities

## 🚀 Getting Started

1. Install dependencies:

```bash
cd blood-bridge-bd-client
npm install
```

2. Set up environment variables:

Fill in the required environment variables.

3. Start the development server:

```bash
npm run dev
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped this project grow
- Special thanks to the open source community for the amazing tools and libraries
