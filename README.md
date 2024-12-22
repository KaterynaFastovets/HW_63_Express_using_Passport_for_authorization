# Server on Express using Passport for authorization
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

### **5.** This project includes:

+ User registration and login.
+ A secure *dashboard* accessible only to authorized users.
+ Using sessions to store authorization.
+ Using the *Passport* library to handle authentication with a local strategy (email, password).
+ Storing passwords in a secure manner using *bcrypt*.

### **6.** Technical details

### **Dependencies:**

+ **Node.js** - server platform.
+ **Express.js** - web framework for Node.js.
+ **Passport.js** - authentication library.
+ **MongoDB** - database for storing user information.
+ **Mongoose** - ODM for MongoDB.
+ **EJS** - templating engine for displaying HTML.
+ **bcryptjs** - for hashing passwords.
+ **connect-flash** - for transmitting one-time messages.
+ **express-session** - for storing user sessions.

___
### Student on the Fullstack development course
### Kateryna Fastovets
- 📫 How to reach me **KatyaFastovets@gimail.com**

