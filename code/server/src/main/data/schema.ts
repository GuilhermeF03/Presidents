
import { jsonb, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import {v4 as uuid4} from 'uuid';
import type { Card } from '@core/model/game/card.ts';

export const gamesTable = pgTable("games", {
  id: uuid().primaryKey().unique().$defaultFn(() => uuid4()).notNull(),
  hostId: uuid().notNull(),
  players: uuid().array().default([]),
  roles: uuid().array().default([]),
  pile: jsonb().$type<Card[]>().default([]),
  state: varchar({enum: ['pending', 'active', 'closed']}).notNull()
})