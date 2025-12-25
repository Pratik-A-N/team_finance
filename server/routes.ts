import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./auth";
import { updateUserProfileSchema, insertInvestmentSchema, updateInvestmentSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  // Update user profile with personal details
  app.patch("/api/auth/profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
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
      const userId = req.session.userId;
      await storage.ensureDefaultInvestments(userId);
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
      const userId = req.session.userId;
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

  // Update investment
  app.patch("/api/investments/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const investmentId = req.params.id;
      const validatedData = updateInvestmentSchema.parse(req.body);
      const investment = await storage.updateInvestment(investmentId, userId, validatedData);
      if (!investment) {
        return res.status(404).json({ message: "Investment not found" });
      }
      res.json(investment);
    } catch (error: any) {
      console.error("Error updating investment:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid investment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update investment" });
    }
  });

  // Export users data as CSV
  app.get("/api/export/users", isAuthenticated, async (req: any, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      
      const headers = ["ID", "Email", "First Name", "Last Name", "Date of Birth", "Phone", "Address", "City", "State", "Pincode", "Occupation", "Annual Income", "Created At"];
      
      const csvRows = [headers.join(",")];
      
      for (const user of allUsers) {
        const row = [
          user.id,
          user.email || "",
          user.firstName || "",
          user.lastName || "",
          user.dateOfBirth || "",
          user.phone || "",
          `"${(user.address || "").replace(/"/g, '""').replace(/\n/g, ' ')}"`,
          user.city || "",
          user.state || "",
          user.pincode || "",
          user.occupation || "",
          user.annualIncome || "",
          user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "",
        ];
        csvRows.push(row.join(","));
      }
      
      const csv = csvRows.join("\n");
      
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=team_finance_users.csv");
      res.send(csv);
    } catch (error) {
      console.error("Error exporting users:", error);
      res.status(500).json({ message: "Failed to export users" });
    }
  });

  // Export investments data as CSV
  app.get("/api/export/investments", isAuthenticated, async (req: any, res) => {
    try {
      const allInvestments = await storage.getAllInvestments();
      
      const headers = ["ID", "User ID", "Type", "Name", "Amount", "Created At"];
      
      const csvRows = [headers.join(",")];
      
      for (const inv of allInvestments) {
        const row = [
          inv.id,
          inv.userId,
          inv.type,
          `"${(inv.name || "").replace(/"/g, '""')}"`,
          inv.amount,
          inv.createdAt ? new Date(inv.createdAt).toLocaleDateString() : "",
        ];
        csvRows.push(row.join(","));
      }
      
      const csv = csvRows.join("\n");
      
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=team_finance_investments.csv");
      res.send(csv);
    } catch (error) {
      console.error("Error exporting investments:", error);
      res.status(500).json({ message: "Failed to export investments" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
