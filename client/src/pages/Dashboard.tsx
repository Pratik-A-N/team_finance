import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp, Shield, Heart, ArrowLeft, Plus, Loader2, Home, Download } from "lucide-react";
import type { Investment } from "@shared/schema";
import logoImage from "@assets/Adobe_Express_-_file_1765473251320.png";

const COLORS = {
  "mutual-funds": "#3B82F6",
  "term-insurance": "#10B981", 
  "health-insurance": "#F43F5E",
};

const ICONS = {
  "mutual-funds": TrendingUp,
  "term-insurance": Shield,
  "health-insurance": Heart,
};

const LABELS = {
  "mutual-funds": "Mutual Funds",
  "term-insurance": "Term Insurance",
  "health-insurance": "Health Insurance",
};

function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)} K`;
  }
  return amount.toLocaleString("en-IN");
}

export default function Dashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: investments = [], isLoading: investmentsLoading } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
    enabled: isAuthenticated,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    setLocation("/");
    return null;
  }

  const investmentsByType = investments.reduce((acc, inv) => {
    const amount = parseFloat(inv.amount) || 0;
    acc[inv.type] = (acc[inv.type] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  const totalInvestment = Object.values(investmentsByType).reduce((sum, val) => sum + val, 0);

  const chartData = Object.entries(investmentsByType).map(([type, amount]) => ({
    name: LABELS[type as keyof typeof LABELS] || type,
    value: amount,
    type,
    color: COLORS[type as keyof typeof COLORS] || "#6B7280",
  }));

  const hasInvestments = investments.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2" data-testid="link-home">
              <img src={logoImage} alt="Team Finance Logo" className="h-12 w-auto" />
            </Link>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setLocation("/")}
              data-testid="button-back-home"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif" data-testid="text-dashboard-title">
              Welcome back, {user?.firstName || "Investor"}!
            </h1>
            <p className="text-muted-foreground">
              Track your investments and financial portfolio
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open("/api/export/users", "_blank")}
              data-testid="button-download-users"
            >
              <Download className="w-4 h-4" />
              Download Users
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open("/api/export/investments", "_blank")}
              data-testid="button-download-investments"
            >
              <Download className="w-4 h-4" />
              Download Investments
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2" data-testid="card-investment-chart">
            <CardHeader>
              <CardTitle>Investment Portfolio</CardTitle>
              <CardDescription>
                Your investment distribution across different categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hasInvestments ? (
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative w-64 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold" data-testid="text-total-investment">
                        {formatCurrency(totalInvestment)}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    {chartData.map((item) => {
                      const Icon = ICONS[item.type as keyof typeof ICONS] || TrendingUp;
                      const percentage = totalInvestment > 0 
                        ? ((item.value / totalInvestment) * 100).toFixed(1) 
                        : "0";
                      return (
                        <div
                          key={item.type}
                          className="flex items-center gap-4"
                          data-testid={`investment-category-${item.type}`}
                        >
                          <div
                            className="w-10 h-10 rounded-md flex items-center justify-center"
                            style={{ backgroundColor: `${item.color}20` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: item.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-medium">{item.name}</p>
                              <p className="font-semibold">{formatCurrency(item.value)}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${percentage}%`,
                                    backgroundColor: item.color,
                                  }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-12 text-right">
                                {percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                    <TrendingUp className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No investments yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Start your investment journey today and watch your wealth grow over time.
                  </p>
                  <Button
                    className="gap-2"
                    onClick={() => window.open("http://p.njw.bz/41983", "_blank")}
                    data-testid="button-start-investing"
                  >
                    <Plus className="w-4 h-4" />
                    Start Investing
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card data-testid="card-quick-actions">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full gap-2 justify-start"
                  variant="outline"
                  onClick={() => window.open("http://p.njw.bz/41983", "_blank")}
                  data-testid="button-invest-now"
                >
                  <TrendingUp className="w-4 h-4" />
                  Invest in Mutual Funds
                </Button>
                <Button
                  className="w-full gap-2 justify-start"
                  variant="outline"
                  onClick={() => setLocation("/")}
                  data-testid="button-get-insurance"
                >
                  <Shield className="w-4 h-4" />
                  Get Insurance Quote
                </Button>
                <Button
                  className="w-full gap-2 justify-start"
                  variant="outline"
                  onClick={() => setLocation("/profile")}
                  data-testid="button-view-profile"
                >
                  <Heart className="w-4 h-4" />
                  View Profile
                </Button>
              </CardContent>
            </Card>

            <Card data-testid="card-investment-summary">
              <CardHeader>
                <CardTitle className="text-lg">Investment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Investments</span>
                    <span className="font-semibold">{investments.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="font-semibold" data-testid="text-summary-total">
                      {formatCurrency(totalInvestment)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Categories</span>
                    <span className="font-semibold">{Object.keys(investmentsByType).length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {hasInvestments && (
          <Card className="mt-6" data-testid="card-recent-investments">
            <CardHeader>
              <CardTitle>Recent Investments</CardTitle>
              <CardDescription>Your latest investment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.slice(0, 5).map((investment) => {
                  const Icon = ICONS[investment.type as keyof typeof ICONS] || TrendingUp;
                  const color = COLORS[investment.type as keyof typeof COLORS] || "#6B7280";
                  return (
                    <div
                      key={investment.id}
                      className="flex items-center gap-4 p-3 rounded-md bg-muted/50"
                      data-testid={`investment-item-${investment.id}`}
                    >
                      <div
                        className="w-10 h-10 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{investment.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {LABELS[investment.type as keyof typeof LABELS]}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(parseFloat(investment.amount))}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(investment.investedDate).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
