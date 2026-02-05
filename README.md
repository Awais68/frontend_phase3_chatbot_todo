This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Running with Docker

You can run this project using Docker and Docker Compose for a consistent production-like environment.

### Requirements
- Docker and Docker Compose installed
- Node.js version: `22.13.1` (as specified in the Dockerfile)

### Build and Run Instructions

1. (Optional) Create a `.env` file in the project root if you need to set environment variables for your app. Uncomment the `env_file` line in `docker-compose.yml` if you use this file.
2. Build and start the app using Docker Compose:

```bash
docker compose up --build
```

This will build the Docker image and start the Next.js app in a container named `ts-app`.

### Ports
- The app is exposed on port `3000` (host: `localhost:3000`)

### Special Configuration
- The Dockerfile installs system dependencies required for Prisma (`openssl`).
- The app runs as a non-root user for improved security.
- The build process prunes dev dependencies to keep the image size small.
- If you need to add a database or other services, update `docker-compose.yml` accordingly.

---
