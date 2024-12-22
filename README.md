# Integrating MongoDB Atlas with an existing Express server
____
## Installation and launch

### **1.** Clone the repository

`git clone https://github.com/your-repository.git`

`cd your-repository`

### **2.** Install the dependencies

`npm install`

### **3.** Set environment variables

Create an *.env* file in the root directory of the project and set the necessary variables:

SECRET_KEY=your_secret_key

NODE_ENV=development

MONGO_DB=your_database_name

PORT=3010

### **4.** After setting the environment variables, start the server:

`node app.js`

### **5.** Description

This project demonstrates how to implement user authentication using Passport.js and integrate MongoDB Atlas to work with the database. The goal of the project is to create a route to retrieve data from MongoDB and display it on a page.

### **6.** Functionality

**1.** User Authorization

+ New user registration.
+ Login using Passport.js.
+ Protected routes for authorized users.

**2.** Connect to MongoDB Atlas

+ The server uses Mongoose to connect to the database in MongoDB Atlas.

**3.** Data Read Operation

+ User data is retrieved from the database and displayed in the web interface.

### **7.** Technical details

### **Dependencies:**

+ **Node.js** - server platform.
+ **Express.js** - web framework for Node.js.
+ **Passport.js** - authentication library.
+ **MongoDB Atlas** - Cloud Database.
+ **Mongoose** - ODM for MongoDB.
+ **EJS** - templating engine for displaying HTML.
+ **bcryptjs** - for hashing passwords.
+ **connect-flash** - for transmitting one-time messages.
+ **express-session** - for storing user sessions.

___
### Student on the Fullstack development course
### Kateryna Fastovets
- 📫 How to reach me **KatyaFastovets@gimail.com**
