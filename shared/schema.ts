import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  date,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  password: varchar("password"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  // Personal details
  dateOfBirth: date("date_of_birth"),
  phone: varchar("phone"),
  address: text("address"),
  city: varchar("city"),
  state: varchar("state"),
  pincode: varchar("pincode"),
  occupation: varchar("occupation"),
  annualIncome: varchar("annual_income"),
  financialGoal: varchar("financial_goal"),
  goalTimeline: varchar("goal_timeline"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Auth schemas
export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

// Schema for updating user profile with personal details
export const updateUserProfileSchema = createInsertSchema(users).pick({
  firstName: true,
  lastName: true,
  dateOfBirth: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  pincode: true,
  occupation: true,
  annualIncome: true,
  financialGoal: true,
  goalTimeline: true,
}).partial();

export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;

// Investments table for tracking user investments
export const investments = pgTable("investments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: varchar("type").notNull(), // 'mutual-funds', 'term-insurance', 'health-insurance'
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull(),
  investedDate: date("invested_date").notNull(),
  status: varchar("status").default("active"), // 'active', 'matured', 'cancelled'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  createdAt: true,
});

export const updateInvestmentSchema = createInsertSchema(investments).pick({
  amount: true,
  investedDate: true,
  name: true,
}).partial();

export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type UpdateInvestment = z.infer<typeof updateInvestmentSchema>;
export type Investment = typeof investments.$inferSelect;
