# Kami Task

This is a technical assignment where I had to write a SPA. To implement it, I used these technologies:

- Backend: Node.js, Express, Mongoose, Multer
- Frontend: React, React Route, Redux
- Database: MongoDB
- File Storage: GridFS
- Docker
- UI: Material UI
- Additional: Formik, Yup

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

3. Set up the environment variables, get from env.example, and i will send you mongoDb url. Create .emv file in api directory.

4. Start the backend server: after configuration
   ```bash
    docker build -t api-image . 
    docker run -p 8080:8080 --env-file .env api-image

5. If you want withou docker, write:
      ```bash
       npm run server


## API Endpoints

### Products

GET /api/products - Get all products
GET /api/products/:id - Get a product by ID

POST /api/products - Create a new product
Request Body:
name - Product name
description - Product description
price - Product price
status - Product status
file - File to be uploaded

PUT /api/products/:id - Update a product by ID
Request Body:
name - Product name (optional)
description - Product description (optional)
price - Product price (optional)
status - Product status (optional)
file - File to be uploaded (optional)

DELETE /api/products/:id - Delete a product by ID

##Pages

###Main Page:

There we have tables of products
   You can do search, sort, delete, and create projects
![image](https://github.com/zHannur0/kami_task/assets/94554791/aaa17280-3152-47be-83b9-5d3086f5ee2f)

###Edit Page
Meets all requirements
![image](https://github.com/zHannur0/kami_task/assets/94554791/d46e0770-701d-4c95-aa4a-cd8ab880ac08)

###Create Product Page
Also meets all requirements:
![image](https://github.com/zHannur0/kami_task/assets/94554791/1a0976ac-eb11-4f94-aa38-54f14f544680)





   

   
