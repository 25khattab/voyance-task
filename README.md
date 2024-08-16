# Medical Appointment Scheduling and Management App

This application is designed to streamline the process of scheduling and managing medical appointments. Built with modern technologies, it provides a robust platform for users to manage schedules efficiently.

## Technologies Used

- **Next.js:** A powerful React framework for building fast, server-rendered web applications.
- **Drizzle ORM:** A lightweight TypeScript ORM for interacting with databases.
- **SQLite:** A self-contained, high-reliability, embedded, SQL database engine.
- **NextAuth:** A complete authentication solution for Next.js applications.
- **FullCalendar:** An interactive calendar component for scheduling events.
- **Tailwind CSS:** A utility-first CSS framework for styling.

## Getting Started

Follow these steps to set up and run the application locally.

### Prerequisites

- Node.js and npm installed on your system.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/25khattab/voyance-task.git

   cd voyance-task
   ```

2. **Install the dedependencies:**
   ```bash
   npm i
   ```
3. **Set up the database:**

   ```
   cd src/db

   npx drizzle-kit migrate
   ```

4. **Set environment variables:**

   Copy .env.local.example to .env.local and fill the required variables

   ```
   AUTH_SECRET=<can be anything>
   AUTH_GOOGLE_ID= <google client id>
   AUTH_GOOGLE_SECRET=<google client secret>

   ADMIN_SECRET_KEY=<can be anything> #used to switch user to admin
   ```

5. **Run the application:**

   Start the development server:

   ```bash
   npm run dev
   ```

### Admin Endpoint
The application includes an admin endpoint that allows a system user with administrative privileges to manage schedules. To access this endpoint, send a POST request to: 
```
http://localhost:3000/api/auth/admin
```

The request body should be in JSON format and include the following fields:

```JSON
{
  "email": "<the user email>",
  "secretKey": "<ADMIN_SECRET_KEY>"
}
```

## Admin Usage

Admins can approve and reject appointments.

An appointment will appear as orange for the user of that Booking if it's waiting an admin approval.

If an appointment is approved it will be marked as green, if not it will be deleted and will not appear anymore on the calendar.

An Admin can approve and reject on any event on the calendar from any view, unlike the user who can only reserve a slot from week and day view only (because they have time slots).

## Enhancments

There are several features that can be added to improve the functionality and user experience of the application:

- Email Notifications: Implement automated email reminders and notifications for upcoming appointments and cancellations.

- Appointment History: Allow users to view their appointment history (currentyl the user can see his appointments in the calender marked with green or orange)

- Real-time Updates: Integrate real-time updates for appointments using web sockets to reflect changes instantly on all connected clients.

- For admins the appointments can have more details about the user.

- Mobile Responsiveness: Enhance mobile responsiveness and ensure seamless user experience across all devices.
