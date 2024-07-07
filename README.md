# Kami Task

This is a technical assignment where I had to write a SPA. To implement it, I used these technologies:

- Backend: Node.js, Express, Mongoose, Multer
- Frontend: React, React Route, Redux
- Database: MongoDB
- File Storage: GridFS
- Docker

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zHannur0/kami_task.git

2. Install the dependencies for the backend:
   ```bash
     cd api
     npm install

2. Install the dependencies for the frontend:
   ```bash
     cd frontend
     npm install

3. Set up the environment variables, get from env.example, and i will send you mongoDb url.

4. Start the backend server: after configuration
    docker build -t api-image . 
    docker run -p 8080:8080 --env-file .env api-image

   

   
