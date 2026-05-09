import 'dotenv/config';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL);

console.log('Database connection initialized');

const db = drizzle(sql);

export { db, sql };