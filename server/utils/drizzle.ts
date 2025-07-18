import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../database/schema';

export { sql, eq, and, or } from 'drizzle-orm';

export const tables = schema;

export function useDrizzle() {
    return drizzle({
        connection: {
            url: process.env.TURSO_DATABASE_URL!,
            authToken: process.env.TURSO_AUTH_TOKEN,
        },
    });
}

export type Page = typeof schema.pages.$inferSelect
export type Passphrase = typeof schema.passphrases.$inferSelect
