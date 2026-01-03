import {
  users,
  investments,
  passwordResetTokens,
  consultations,
  type User,
  type UpsertUser,
  type UpdateUserProfile,
  type Investment,
  type InsertInvestment,
  type PasswordResetToken,
  type Consultation,
  type InsertConsultation,
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(userData: { email: string; password: string }): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserProfile(id: string, profile: UpdateUserProfile): Promise<User | undefined>;
  updateUserPassword(id: string, password: string): Promise<User | undefined>;
  getInvestmentsByUserId(userId: string): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  ensureDefaultInvestments(userId: string): Promise<void>;
  getAllUsers(): Promise<User[]>;
  getAllInvestments(): Promise<Investment[]>;
  createPasswordResetToken(userId: string, token: string, expiresAt: Date): Promise<PasswordResetToken>;
  getPasswordResetToken(token: string): Promise<PasswordResetToken | undefined>;
  markTokenAsUsed(token: string): Promise<void>;
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getConsultationsByUserId(userId: string): Promise<Consultation[]>;
  getAllConsultations(): Promise<Consultation[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: { email: string; password: string }): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
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

  async updateInvestment(id: string, userId: string, data: { amount?: string; investedDate?: string; name?: string }): Promise<Investment | undefined> {
    const [updated] = await db
      .update(investments)
      .set(data)
      .where(and(eq(investments.id, id), eq(investments.userId, userId)))
      .returning();
    return updated;
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
          investedDate: "1970-01-01",
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

  async updateUserPassword(id: string, password: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ password, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async createPasswordResetToken(userId: string, token: string, expiresAt: Date): Promise<PasswordResetToken> {
    const [created] = await db
      .insert(passwordResetTokens)
      .values({ userId, token, expiresAt })
      .returning();
    return created;
  }

  async getPasswordResetToken(token: string): Promise<PasswordResetToken | undefined> {
    const [resetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));
    return resetToken;
  }

  async markTokenAsUsed(token: string): Promise<void> {
    await db
      .update(passwordResetTokens)
      .set({ used: "true" })
      .where(eq(passwordResetTokens.token, token));
  }

  async createConsultation(consultation: InsertConsultation): Promise<Consultation> {
    const [created] = await db
      .insert(consultations)
      .values(consultation)
      .returning();
    return created;
  }

  async getConsultationsByUserId(userId: string): Promise<Consultation[]> {
    const userConsultations = await db
      .select()
      .from(consultations)
      // .where(eq(consultations.userId, userId));
    return userConsultations;
  }

  async getAllConsultations(): Promise<Consultation[]> {
    return await db.select().from(consultations);
  }
}

export const storage = new DatabaseStorage();
