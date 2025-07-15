import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const pages = sqliteTable('pages', {
    slug: text('slug').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
});