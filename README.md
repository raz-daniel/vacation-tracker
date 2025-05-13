# Vacation Tracker

A web application for browsing and managing vacation packages with real-time updates.

## Features

- Browse vacation destinations with details and pricing
- User authentication (login/register)
- Admin panel for managing vacation listings
- Real-time updates using Socket.io
- Like/follow favorite vacations
- Filter vacations by various criteria

## Technologies

- **Frontend**: React, TypeScript, CSS
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Storage**: LocalStack S3 (for images)
- **Real-time**: Socket.io
- **Containerization**: Docker

## Setup Instructions

### Prerequisites
- Docker and Docker Compose
- Node.js (v14+)

### Installation
1. Clone the repository
2. Run `docker-compose up -d` to start the database and LocalStack
3. In the project directory, run `npm install`
4. Start the backend: `npm run server`
5. Start the frontend: `npm run client`

## Usage
- Regular users can browse and like vacations
- Admins can add, edit, and delete vacation listings
- Login credentials:
  - Admin: daniel@raz.com (password: 123456)
  - User: tal@raz.com (password: 123456)