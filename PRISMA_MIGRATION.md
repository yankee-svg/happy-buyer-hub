Prisma migration and setup

Steps to migrate from Supabase direct client to Prisma ORM:

1. Install packages

   npm install

2. Introspect the existing database schema (uses DATABASE_URL in `.env`):

   npx prisma db pull

3. Generate the Prisma client:

   npx prisma generate

4. (Optional) Create migrations if you plan to manage schema with Prisma:

   - Update `prisma/schema.prisma` models
   - Run `npx prisma migrate dev --name init` (requires DIRECT_URL for direct DB connection)

Notes:
- This project currently uses `DATABASE_URL` for runtime connections (pooling) and `DIRECT_URL` for migrations.
- Replace usages of the Supabase client (`src/lib/supabase.ts`) with `src/lib/prisma.ts` server-side only. Prisma must run in a Node environment (server or serverless functions). For client-side interactions, continue using Supabase if you need realtime/auth/storage.
