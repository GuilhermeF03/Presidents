import 'dotenv/config'
import { drizzle } from 'drizzle-orm/bun-sqlite';

export const bootstrapDb = ()=> {

  const db = drizzle(process.env.DB_FILE_NAME!)
}