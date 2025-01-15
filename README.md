# Meeting Scheduler API
Description

A simple Node.js and MySQL-powered API for scheduling and managing meetings.

Table of Contents
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Postman Tests](#postman-tests)
- [Running Locally](#running-locally)
- [Database Schema](#database-schema)

Installation
## Installation
1. Clone this repository.
   ```bash
   git clone https://github.com/genyarko/scheduling-app.git
   cd meeting-scheduler-api
Install dependencies.
bash
Copy code
npm install
Set up the database by importing the provided schema.sql file in database/.
Create a .env file with your database credentials:
makefile
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=scheduling_app
DB_PORT=3306
Running Locally

## Running Locally
Start the server with:
```bash
node server.js
The API will be accessible at http://localhost:4000.

API Endpoints
## API Endpoints

### 1. Get All Meetings
- **Endpoint**: `GET /api/meetings`
- **Description**: Retrieves all scheduled meetings.
- **Response**:
  ```json
  [
      {
          "id": 1,
          "title": "Project Discussion",
          "description": "Discuss the new project requirements",
          "client_id": 1,
          "freelancer_id": 2,
          "date_time": "2025-01-15T14:00:00",
          "duration": 60,
          "status": "scheduled"
      }
  ]
2. Create a Meeting
Endpoint: POST /api/meetings
Description: Creates a new meeting.
Request:
json
Copy code
{
    "title": "Project Discussion",
    "description": "Discuss the new project requirements",
    "client_id": 1,
    "freelancer_id": 2,
    "date_time": "2025-01-15T14:00:00",
    "duration": 60
}
Response:
json
Copy code
{
    "message": "Meeting created successfully",
    "meetingId": 1
}

Postman Tests
## Postman Tests

To test the API using Postman:
1. Import the `api-tests.postman_collection.json` file from the `postman-tests/` folder.
2. If needed, import the `environment.postman_environment.json` file for environment variables.
3. Run the collection or individual requests.

Database Schema
## Database Schema

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    time_zone VARCHAR(50) NOT NULL
);

CREATE TABLE meetings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    client_id INT NOT NULL,
    freelancer_id INT NOT NULL,
    date_time DATETIME NOT NULL,
    duration INT NOT NULL,
    status ENUM('scheduled', 'canceled') DEFAULT 'scheduled',
    FOREIGN KEY (client_id) REFERENCES users(id),
    FOREIGN KEY (freelancer_id) REFERENCES users(id)
);