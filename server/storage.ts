import {
  users,
  investments,
  type User,
  type UpsertUser,
  type UpdateUserProfile,
  type Investment,
  type InsertInvestment,
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserProfile(id: string, profile: UpdateUserProfile): Promise<User | undefined>;
  getInvestmentsByUserId(userId: string): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  ensureDefaultInvestments(userId: string): Promise<void>;
  getAllUsers(): Promise<User[]>;
  getAllInvestments(): Promise<Investment[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserProfile(id: string, profile: UpdateUserProfile): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({
        ...profile,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getInvestmentsByUserId(userId: string): Promise<Investment[]> {
    return db.select().from(investments).where(eq(investments.userId, userId));
  }

  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const [created] = await db.insert(investments).values(investment).returning();
    return created;
  }

  async ensureDefaultInvestments(userId: string): Promise<void> {
    const defaultInvestments = [
      { type: "mutual-funds", name: "Mutual Fund SIP" },
      { type: "term-insurance", name: "Term Life Insurance" },
      { type: "health-insurance", name: "Health Insurance Premium" },
    ];

    for (const inv of defaultInvestments) {
      const existing = await db
        .select()
        .from(investments)
        .where(and(eq(investments.userId, userId), eq(investments.type, inv.type)));

      if (existing.length === 0) {
        await db.insert(investments).values({
          userId,
          type: inv.type,
          name: inv.name,
          amount: "0",
          investedDate: new Date().toISOString().split("T")[0],
          status: "active",
        });
      }
    }
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async getAllInvestments(): Promise<Investment[]> {
    return db.select().from(investments);
  }
}

export const storage = new DatabaseStorage();
