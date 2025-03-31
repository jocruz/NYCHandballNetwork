# Handball Hub - Sports Web Application

## Project Overview

Handball Hub is designed to enhance the handball community by providing a dedicated digital platform for players, referees, and tournament directors. The application addresses the current lack of structured digital resources for tracking player rankings, tournament results, and general handball information. It includes player statistics, tournament management tools, and a score-keeping interface specifically for referees.

## Key Features

- **Player Dashboard**: Allows player registration, tournament interest indication, and event participation management.
- **Director Dashboard**: Enables tournament directors to manage events, organize tournaments, and update match outcomes.
- **Scorekeeping Module**: Provides referees with a specialized tool for managing live scores.
- **Comprehensive Data Management**: Efficient backend using Prisma and PostgreSQL for secure, reliable data handling.

## Technology Stack

- **Frontend**: React.js, Next.js
- **Backend**: Prisma ORM, PostgreSQL
- **Authentication**: Clerk Auth
- **Styling Framework**: Chakra UI

## API Endpoints

### Matches API
- `GET /api/matches`: Retrieve detailed match information.
- `POST /api/matches`: Create new matches.
- `PUT /api/matches`: Update existing matches.
- `DELETE /api/matches`: Delete match records.

### Players API
- `GET /api/players`: Retrieve player information.
- `POST /api/players`: Register new players or tournament sign-ups.
- `PUT /api/players`: Update player details.
- `DELETE /api/players`: Remove player entries.

### Tournament Directors API
- `GET /api/tournament-directors`: Access director information.
- `POST /api/tournament-directors`: Add tournament directors.
- `PUT /api/tournament-directors`: Update director details.
- `DELETE /api/tournament-directors`: Delete director records.

### Tournaments API
- `GET /api/tournaments`: Retrieve tournament details.
- `POST /api/tournaments`: Create new tournaments.
- `PUT /api/tournaments`: Update tournament details.
- `DELETE /api/tournaments`: Remove tournament records.

## User Interface and Design

### Responsive Navigation
The application features responsive sidebar navigation:
- **Desktop View**: Persistent sidebar for easy navigation.
- **Mobile View**: Collapsible drawer navigation, optimized for mobile usability.

### Technical Implementation
- Built with Chakra UI components for responsive design.
- React Icons enhance navigation clarity.
- Chakra UI's `useDisclosure` hook manages sidebar state transitions seamlessly.

## Database Schema

The application's backend is structured around a clear, relational Prisma schema to efficiently manage and organize data:

### Player
- Stores player information including identifiers, rankings, and tournament associations.

### Tournament Director
- Maintains director details and manages associations with various tournaments.

### Tournament
- Captures tournament-specific information, associated players, matches, and linked tournament directors.

### Match
- Contains match-specific data including types, scores, statuses, and related tournament/player information.

### PlayerTournament (Junction Table)
- Manages player registrations and payment status for tournaments.

### Timeout
- Records details about timeouts in matches, associating them with specific matches and players.

### Enumerations
- Defines standardized enums such as `GameType`, `MatchType`, and `MatchStatus` to ensure consistency and data integrity.

## Installation and Running the Application

1. **Installation**:
   ```bash
   git clone <repository-url>
   cd handball-hub
   npm install
   ```

2. **Environment Setup**:
   Configure necessary environment variables in a `.env` file.

3. **Starting the Development Server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.
