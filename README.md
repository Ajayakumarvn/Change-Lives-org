Change-Lives-Org Documentation :

Table of Contents

Introduction
Technologies Used
System Architecture
Modules
Donor Module
Sponsor Module
Volunteer Module
Admin Module
Installation


Usage
Conclusion
1. Introduction
Change-Lives-Org is a charity website built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that aims to connect donors, sponsors, volunteers, and individuals in need. The platform allows users to donate funds, sponsor projects, volunteer their time, and seek help. It provides a centralized platform for individuals and organizations to make a positive impact on society and change lives.

2. Technologies Used
The following technologies have been used to develop Change-Lives-Org:

Frontend:

React.js: A JavaScript library for building user interfaces.
HTML/CSS: Markup language for structuring web pages and styling.
Bootstrap: CSS framework for responsive and mobile-first web development.
Backend:

Node.js: A JavaScript runtime environment for executing server-side code.
Express.js: A web application framework for building RESTful APIs.
MongoDB: A NoSQL document database for storing data.
Additional Tools:

Mongoose: An object modeling tool for MongoDB.
Axios: A library for making HTTP requests from Node.js and the browser.
3. System Architecture
Change-Lives-Org follows a client-server architecture, where the frontend and backend are decoupled. The frontend is responsible for handling user interactions and rendering the user interface, while the backend manages data storage, business logic, and API endpoints.

The frontend is built using React.js, which communicates with the backend via HTTP requests to the RESTful API endpoints provided by the Express.js server. The server interacts with the MongoDB database using Mongoose to perform CRUD (Create, Read, Update, Delete) operations on the data.

4. Modules

4.1 Donor Module
The Donor module allows individuals or organizations to donate funds to various projects or causes. It provides the following features:

Browse ongoing projects and campaigns.
View project details, including its description, progress, and funding status.
Make donations to specific projects.
View a history of past donations.
Receive acknowledgments and updates on donated projects.


4.2 Sponsor Module
The Sponsor module enables individuals or businesses to sponsor projects or initiatives. It provides the following features:

Explore available projects and initiatives seeking sponsorship.
Access detailed information about each project, including its goals and impact.
Submit sponsorship requests for specific projects.
Track the status of sponsorship requests.
Receive notifications and updates on sponsored projects.


4.3 Volunteer Module
The Volunteer module allows users to offer their time and skills for various charitable activities. It provides the following features:

Browse volunteer opportunities and events.
View details about each opportunity, such as location, time, and required skills.
Sign up as a volunteer for specific events.
Manage upcoming and past volunteer activities.
Receive confirmations and reminders about scheduled volunteer work.


4.4 Admin Module

The Admin module is designed for administrators who oversee and manage the Change-Lives-Org platform. It provides the following features:

Manage user accounts and roles.
Create, update, and delete projects, initiatives, and events.
Track and analyze donation, sponsorship, and volunteer activities.
Communicate with users via notifications or emails.
Generate reports and statistics about the platform's performance.


5. Installation
To install and run the Change-Lives-Org project locally, follow these steps:

Clone the project repository from GitHub.
Install Node.js and MongoDB on your system, if not already installed.
Navigate to the project directory in the terminal.
Install backend dependencies by running the command: npm install.
Install frontend dependencies by navigating to the client directory and running npm install.
Create a .env file in the project root directory and configure the necessary environment variables (e.g., MongoDB connection URL, API keys, etc.).
Start the backend server by running npm start in the project root directory.
Start the frontend development server by navigating to the client directory and running npm start.
Access the website in your browser at http://localhost:3000.

6. Usage
Once the Change-Lives-Org project is installed and running, users can access the website and interact with the different modules based on their role. Here are some common usage scenarios:

Donors: Users can browse ongoing projects, select a project of interest, and donate funds to support the cause. They can also view their donation history and receive updates on donated projects.

Sponsors: Individuals or businesses can explore available projects seeking sponsorship, submit sponsorship requests, and track the status of their requests. They receive notifications and updates on the projects they sponsor.

Volunteers: Users can browse volunteer opportunities, sign up for specific events, and manage their upcoming and past volunteer activities. They receive confirmations and reminders about scheduled volunteer work.

Admins: Administrators have access to the admin module, where they can manage user accounts, create and manage projects and initiatives, track platform activities, communicate with users, and generate reports.

Users can navigate the website using the provided user interface and interact with the different modules according to their role and preferences.

7. Conclusion
Change-Lives-Org is a comprehensive charity website built using the MERN stack, providing a platform for donors, sponsors, volunteers, and individuals in need to connect and make a positive impact on society. The documentation above provides an overview of the project, its modules, installation instructions, and usage guidelines. By following these instructions, users can set up and use the Change-Lives-Org platform to contribute to charitable causes, seek help, and change lives for the better.
