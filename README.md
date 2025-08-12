# Blog Aggregator TS

A TypeScript-based command-line blog aggregator that lets users register, add RSS feeds, follow/unfollow feeds, and browse posts. Built with [Drizzle ORM](https://orm.drizzle.team/) and PostgreSQL.

## Features

-   User registration and login
-   Add and follow RSS feeds
-   Unfollow feeds
-   Browse posts from followed feeds
-   Aggregate posts from feeds on a schedule

## Getting Started

### Prerequisites

-   Node.js (see [.nvmrc](.nvmrc))
-   PostgreSQL database

### Installation

```sh
npm install
```

### Configuration

Create a `.gatorconfig.json` in your home directory:

```json
{
    "db_url": "postgres://user:password@localhost:5432/dbname",
    "current_user_name": ""
}
```

### Database Setup

Generate and run migrations:

```sh
npm run generate
npm run migrate
```

### Usage

Run commands using:

```sh
npm start <command> [args...]
```

#### Commands

-   `register <username>`: Register a new user
-   `login <username>`: Log in as a user
-   `addfeed <feedName> <feedUrl>`: Add and follow a new feed
-   `feeds`: List all feeds
-   `follow <feedUrl>`: Follow an existing feed
-   `unfollow <feedUrl>`: Unfollow a feed
-   `following`: List followed feeds
-   `browse [limit]`: Browse posts from followed feeds
-   `agg <duration>`: Aggregate posts from feeds periodically (e.g., `1h`, `30m`, `15s`, `1450ms`)
-   `users`: List all users
-   `reset`: Delete all users

## Project Structure

See [src/](src) for source code. Main entry point: [src/index.ts](src/index.ts)
