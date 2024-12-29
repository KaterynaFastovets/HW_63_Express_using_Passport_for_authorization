# Practical work with Docker, Express and MongoDB
____

## Prerequisites

+ Docker 
  
+ Docker Compose

## Installation and launch

### **1.** Clone the repository

`git clone https://github.com/your-repository.git`

`cd your-repository`

### **2.** Install the dependencies

`npm install`

### **3.** Set environment variables

Create an *.env* file in the root directory of the project and set the necessary variables:

SECRET_KEY=your_secret_key

MONGO_DB=your_database_name


### **4.** Build and Start Containers

`docker-compose up --build`

Once the containers are up and running, you can access the application at:

http://localhost:3000

### **5.** Stopping the Containers

To stop and remove the containers, run:

`docker-compose down`

___
### Student on the Fullstack development course
### Kateryna Fastovets
- 📫 How to reach me **katyafastovets@gmail.com**
