# 🏐 Handball Hub - Sports Web Application

## Introduction

🎯 **Project Aim**: Handball Hub aims to fill the void in the handball community by providing a comprehensive web application dedicated to the sport. Currently, there's a lack of digital infrastructure to track player rankings, tournament results, and general handball information. Handball Hub addresses these needs by offering features like player stats tracking, tournament management, and a score-keeping application for referees.

## Features

- **Player Dashboard**: Allows players to sign in, express interest in tournaments, and register for them.
- **Director Dashboard**: Enables tournament directors to create events, manage tournaments, and update match results.
- **Score Keeping**: A dedicated module for referees to keep track of game scores.
- **Data Management**: Robust backend with Prisma and PostgreSQL to manage player and tournament data effectively.

## Tech Stack

- **Frontend**: React JS, NextJS
- **Backend**: Prisma, PostgreSQL
- **Authentication**: Clerk Auth
- **Styling**: Chakra UI (as inferred from the sidebar component)

## API Highlights

### Matches API

- **GET `/api/matches`**: Retrieve all matches with detailed tournament and player information.
- **POST `/api/matches`**: Create new match entries.
- **PUT `/api/matches`**: Update match details.
- **DELETE `/api/matches`**: Remove match records.

### Players API

- **GET `/api/players`**: Fetch all player details or a single player by ID/email.
- **POST `/api/players`**: Register new players or sign them up for tournaments.
- **PUT `/api/players`**: Update player information.
- **DELETE `/api/players`**: Delete player records.

### Tournament Directors API

- **GET `/api/tournament-directors`**: Access details of all tournament directors or a specific one.
- **POST `/api/tournament-directors`**: Add new tournament directors.
- **PUT `/api/tournament-directors`**: Modify director information.
- **DELETE `/api/tournament-directors`**: Remove director entries.

### Tournaments API

- **GET `/api/tournaments`**: List all tournaments or get details of a specific tournament.
- **POST `/api/tournaments`**: Create a new tournament.
- **PUT `/api/tournaments`**: Update tournament details.
- **DELETE `/api/tournaments`**: Delete tournament records.

## User Interface

### Sidebar Navigation

- Dynamic sidebar that changes based on user role (player or director).
- Key features like tournament management, match assignments, and player registrations are easily accessible.

Here's a dedicated section for the Prisma schema in your `README.md` file, focusing on explaining the database design and the relationships between the different models:

---

## 🗂 Prisma Schema Overview

The Prisma schema defines the structure of the database and the relationships between the different entities in the Handball Hub application. Here’s an overview of the main models and their functionalities:
---

This section highlights the logical structure and relationships within your database, helping readers understand how the application manages and relates its data.

### Player Model

- **Attributes**: Includes basic information like `id`, `name`, `email`, and rankings like `categoryRank` and `overallRank`.
- **Relationships**:
  - **Tournaments**: Players can register for multiple tournaments (`PlayerTournament` relation).
  - **Matches**: Players can be part of multiple matches, either as team A or team B.

### Tournament Director Model

- **Attributes**: Stores information about tournament directors, including `id`, `name`, `email`, and `phoneNumber`.
- **Relationships**:
  - **Tournaments**: A director can manage multiple tournaments.

### Tournament Model

- **Attributes**: Captures details of tournaments like `id`, `name`, `date`, and `location`.
- **Relationships**:
  - **Players**: Maintains a list of players who have registered for the tournament.
  - **Matches**: Contains all matches that are part of the tournament.
  - **Director**: Links to the tournament director managing the event.

### Match Model

- **Attributes**: Includes `id`, `matchType`, `gameType`, `scores`, and `status`.
- **Relationships**:
  - **Players**: Connects to players participating in the match.
  - **Tournament**: Associates the match with a specific tournament.

### PlayerTournament Model (Junction Table)

- **Purpose**: Manages the many-to-many relationship between `Player` and `Tournament` models.
- **Attributes**: Includes `playerId`, `tournamentId`, and `hasPaid` to track registration and payment status.

### Timeout Model

- **Attributes**: Manages timeout information within matches, including `timeoutId`, `timeoutType`, and `timeoutDuration`.
- **Relationships**:
  - **Match**: Links to the match where the timeout occurred.
  - **Player**: Associates the timeout with the player who called it.

### Enums

Defines `GameType`, `MatchType`, and `MatchStatus` to standardize the values in the database and ensure data integrity.


1. **Installation**: Guide the user through setting up the project locally, including cloning the repository, installing dependencies, and setting up the environment variables.
2. **Running the application**: Provide commands to run the app in development mode, build it for production, and start the production server.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
