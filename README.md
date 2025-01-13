# Queue Management System

A modern fullstack application for managing message queues with updates and a clean user interface.

## Demo

<div align="center">
  <a href="https://youtu.be/Y1Auc1JyPLE" target="_blank">
    <img src="https://img.youtube.com/vi/Y1Auc1JyPLE/maxresdefault.jpg" alt="Queue Management System Demo" width="600">
  </a>
</div>

Click the image above to watch the demo video on YouTube.

## Features

- **Queue Management**
  - Create and manage multiple queues
  - Push messages to specific queues
  - Fetch messages from queues (FIFO)
  - Configurable message fetch timeout
  - Message count tracking per queue

- **Modern UI**
  - Clean and responsive design
  - Interactive queue list with updates
  - Modal-based message management
  - Customizable fetch timeout settings
  - Loading states and animations
  - Toast notifications for feedback
  - Error handling with user-friendly messages

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Axios for API calls
- React Hot Toast for notifications
- Vite for development and building

### Backend
- NestJS framework
- TypeScript
- RESTful API architecture
- In-memory queue implementation
- Configurable timeout handling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd Queue-Management
```

2. Install Backend Dependencies:
```bash
cd backend
npm install
```

3. Install Frontend Dependencies:
```bash
cd frontend
npm install
```

### Running the Application

1. Start the Backend Server:
```bash
cd backend
npm run start:dev
```
The server will start on `http://localhost:3000`

2. Start the Frontend Development Server:
```bash
cd frontend
npm run dev
```
The frontend will be available on `http://localhost:5173`

## API Endpoints

### Queue Management
- `GET /queue-management/queues` - Get all queues and their status
- `POST /queue-management/api` - Push a message to a queue
- `GET /queue-management/api/:queueName` - Fetch next message from a queue
  - Query Parameters:
    - `timeout` (optional): Timeout in milliseconds (default: 1000)

## Project Structure

### Frontend
```
frontend/
├── src/
│   ├── components/              # React components
│   │   ├── QueueList.tsx       # Queue list display
│   │   ├── QueueItem.tsx       # Individual queue item
│   │   ├── QueueDetailsModal.tsx # Queue details and message fetching
│   │   ├── Modal.tsx           # Reusable modal component
│   │   └── ...
│   ├── types/                  # TypeScript interfaces
│   ├── urls.ts                 # API endpoint configurations
│   └── App.tsx                 # Main application component
```

### Backend
```
backend/
├── src/
│   ├── queue-management/        # Queue management module
│   ├── utils/                  # Utility functions
│   └── main.ts                 # Application entry point
```

## Usage

1. **View Queues**
   - The main page displays all active queues with their message counts
   - Updates when messages are pushed or fetched
   - If a queue is empty, it will be displayed with a "No message found" status
2. **Push Messages**
   - Click "Push to Queue" to open the message form
   - Enter queue name and message content
   - Submit to add message to queue

3. **Fetch Messages**
   - Click on any queue to open the details modal
   - Set desired timeout value (default: 1000ms)
   - Click "Fetch Next Message" to retrieve the next message
   - Messages are retrieved in FIFO order

4. **Manage Messages**
   - View message content in the modal
   - Clear message display when needed
   - Close modal to return to queue list
