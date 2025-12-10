import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { updateUserProfileSchema, insertInvestmentSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  // Get current authenticated user (public - returns null if not authenticated)
  app.get("/api/auth/user", async (req: any, res) => {
    try {
      if (!req.isAuthenticated() || !req.user?.claims?.sub) {
        return res.json(null);
      }
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update user profile with personal details
  app.patch("/api/auth/profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = updateUserProfileSchema.parse(req.body);
      const user = await storage.updateUserProfile(userId, validatedData);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Get user investments
  app.get("/api/investments", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userInvestments = await storage.getInvestmentsByUserId(userId);
      res.json(userInvestments);
    } catch (error) {
      console.error("Error fetching investments:", error);
      res.status(500).json({ message: "Failed to fetch investments" });
    }
  });

  // Create new investment
  app.post("/api/investments", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertInvestmentSchema.parse({
        ...req.body,
        userId,
      });
      const investment = await storage.createInvestment(validatedData);
      res.json(investment);
    } catch (error: any) {
      console.error("Error creating investment:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid investment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create investment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
