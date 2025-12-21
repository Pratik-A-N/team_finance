import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp, Shield, Heart, Plus, Loader2, User, MapPin, Briefcase, IndianRupee, Calendar, Phone, CheckCircle, Target, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import ThemeToggle from "@/components/ThemeToggle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Investment } from "@shared/schema";

const goalTimelines = [
  "1-3 Years",
  "3-5 Years",
  "5-10 Years",
  "10-15 Years",
  "15+ Years"
];

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
  const { toast } = useToast();
  const [goalAmount, setGoalAmount] = useState("");
  const [goalTimeline, setGoalTimeline] = useState("");
  const [isEditingGoal, setIsEditingGoal] = useState(false);

  const { data: investments = [], isLoading: investmentsLoading } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
    enabled: isAuthenticated,
  });

  const updateGoal = useMutation({
    mutationFn: async (data: { financialGoal: string; goalTimeline: string }) => {
      const response = await apiRequest("PATCH", "/api/auth/profile", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setIsEditingGoal(false);
      setGoalAmount("");
      setGoalTimeline("");
      toast({
        title: "Goal Updated",
        description: "Your financial goal has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save your goal. Please try again.",
        variant: "destructive",
      });
    },
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
      <Header />

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
                    <span className="font-semibold">{investments.filter(inv => parseFloat(inv.amount) > 0).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="font-semibold" data-testid="text-summary-total">
                      {formatCurrency(totalInvestment)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Categories</span>
                    <span className="font-semibold">{Object.values(investmentsByType).filter(val => val > 0).length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {user?.financialGoal && !isEditingGoal ? (
          <Card className="mt-6" data-testid="card-goal-progress">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Goal Progress
                </CardTitle>
                <CardDescription>Track your journey towards your financial goal</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setGoalAmount(user.financialGoal || "");
                  setGoalTimeline(user.goalTimeline || "");
                  setIsEditingGoal(true);
                }}
                data-testid="button-edit-goal"
              >
                Edit Goal
              </Button>
            </CardHeader>
            <CardContent>
              {(() => {
                const goalAmountValue = parseFloat(user.financialGoal) * 100000;
                const mutualFundInvestment = investments
                  .filter(inv => inv.type === 'mutual-funds')
                  .reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
                const termInsuranceInvestment = investments
                  .filter(inv => inv.type === 'term-insurance')
                  .reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
                
                const goalRelevantInvestment = mutualFundInvestment + termInsuranceInvestment;
                const currentProgress = ((goalRelevantInvestment / goalAmountValue) * 100);
                const progressPercent = Math.min(currentProgress, 100);
                
                const calculateYearsToGoal = () => {
                  if (goalRelevantInvestment >= goalAmountValue) return 0;
                  
                  const monthlySIP = mutualFundInvestment / 12;
                  const annualGrowth = 0.12;
                  
                  const totalTermInvestmentNeeded = 5000000;
                  const termInvestmentComplete = termInsuranceInvestment >= totalTermInvestmentNeeded;
                  const termYearsInvested = Math.min(Math.floor(termInsuranceInvestment / 500000), 10);
                  
                  let projectedValue = goalRelevantInvestment;
                  let years = 0;
                  
                  while (projectedValue < goalAmountValue && years < 50) {
                    projectedValue = projectedValue * (1 + annualGrowth) + (monthlySIP * 12);
                    
                    if (termInvestmentComplete || (termYearsInvested + years >= 10 && termInsuranceInvestment > 0)) {
                      projectedValue += 200000;
                    }
                    years++;
                  }
                  
                  return years;
                };
                
                const yearsToGoal = calculateYearsToGoal();
                
                return (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Current Progress</span>
                        <span className="font-medium">{progressPercent.toFixed(1)}%</span>
                      </div>
                      <Progress value={progressPercent} className="h-3" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{formatCurrency(goalRelevantInvestment)}</span>
                        <span className="text-muted-foreground">Goal: {formatCurrency(goalAmountValue)}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 rounded-md bg-muted/50 text-center">
                        <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                        <p className="text-lg font-bold" data-testid="text-years-to-goal">
                          {yearsToGoal === 0 ? "Done!" : `~${yearsToGoal}Y`}
                        </p>
                        <p className="text-xs text-muted-foreground">To Goal</p>
                      </div>
                      <div className="p-3 rounded-md bg-blue-500/10 text-center">
                        <TrendingUp className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {formatCurrency(mutualFundInvestment)}
                        </p>
                        <p className="text-xs text-muted-foreground">Mutual Funds</p>
                      </div>
                      <div className="p-3 rounded-md bg-green-500/10 text-center">
                        <Shield className="w-5 h-5 text-green-500 mx-auto mb-1" />
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(termInsuranceInvestment)}
                        </p>
                        <p className="text-xs text-muted-foreground">Term Insurance</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        ) : (
          <Card className="mt-6" data-testid="card-set-goal">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  {isEditingGoal ? "Edit Your Goal" : "Set Your Financial Goal"}
                </CardTitle>
                <CardDescription>
                  {isEditingGoal ? "Update your financial target" : "Define your target to track progress"}
                </CardDescription>
              </div>
              {isEditingGoal && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsEditingGoal(false);
                    setGoalAmount("");
                    setGoalTimeline("");
                  }}
                  data-testid="button-cancel-edit"
                >
                  Cancel
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="goal-amount">Goal Amount (in Lakhs)</Label>
                  <Input
                    id="goal-amount"
                    type="number"
                    placeholder="e.g., 50"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    data-testid="input-goal-amount"
                  />
                  {goalAmount && (
                    <p className="text-xs text-primary font-medium">
                      = {formatCurrency(parseFloat(goalAmount) * 100000)}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-timeline">Timeline</Label>
                  <Select value={goalTimeline} onValueChange={setGoalTimeline}>
                    <SelectTrigger id="goal-timeline" data-testid="select-goal-timeline">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {goalTimelines.map((timeline) => (
                        <SelectItem key={timeline} value={timeline}>
                          {timeline}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={() => {
                    if (goalAmount && goalTimeline) {
                      updateGoal.mutate({ financialGoal: goalAmount, goalTimeline });
                    }
                  }}
                  disabled={!goalAmount || !goalTimeline || updateGoal.isPending}
                  data-testid="button-save-goal"
                >
                  {updateGoal.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Goal"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card data-testid="card-user-profile">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Your Profile
              </CardTitle>
              <CardDescription>Your personal and financial details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium" data-testid="text-profile-name">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-medium" data-testid="text-profile-dob">
                      {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString("en-IN") : "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium" data-testid="text-profile-phone">
                      {user?.phone || "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium" data-testid="text-profile-location">
                      {user?.city && user?.state ? `${user.city}, ${user.state}` : "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Occupation</p>
                    <p className="font-medium capitalize" data-testid="text-profile-occupation">
                      {user?.occupation || "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <IndianRupee className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Income</p>
                    <p className="font-medium" data-testid="text-profile-income">
                      {user?.annualIncome || "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Financial Goal</p>
                    <p className="font-medium" data-testid="text-profile-goal">
                      {user?.financialGoal ? `${user.financialGoal} Lakhs` : "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Goal Timeline</p>
                    <p className="font-medium" data-testid="text-profile-timeline">
                      {user?.goalTimeline || "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-recommended-plans">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Recommended Plans
              </CardTitle>
              <CardDescription>Personalized recommendations based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-md bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-600 dark:text-blue-400">Mutual Fund SIP</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Start a monthly SIP of 10-15% of your income for long-term wealth creation.
                      </p>
                      <Button
                        size="sm"
                        className="mt-3"
                        onClick={() => window.open("http://p.njw.bz/41983", "_blank")}
                        data-testid="button-recommended-sip"
                      >
                        Start SIP
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-600 dark:text-green-400">Term Insurance</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Protect your family with coverage of 10-15x your annual income.
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3"
                        onClick={() => window.open("https://wa.me/919820320216?text=Hi, I am interested in Term Insurance", "_blank")}
                        data-testid="button-recommended-term"
                      >
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-rose-500/10 border border-rose-500/20">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-rose-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-rose-600 dark:text-rose-400">Health Insurance</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Secure your health with a family floater plan covering medical emergencies.
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3"
                        onClick={() => window.open("https://wa.me/919820320216?text=Hi, I am interested in Health Insurance", "_blank")}
                        data-testid="button-recommended-health"
                      >
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {hasInvestments && (
          <Card className="mt-6" data-testid="card-recent-investments">
            <CardHeader>
              <CardTitle>Your Investments</CardTitle>
              <CardDescription>All your investment entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((investment) => {
                  const Icon = ICONS[investment.type as keyof typeof ICONS] || TrendingUp;
                  const color = COLORS[investment.type as keyof typeof COLORS] || "#6B7280";
                  const amount = parseFloat(investment.amount) || 0;
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
                          {formatCurrency(amount)}
                        </p>
                        {amount > 0 && (
                          <p className="text-sm text-muted-foreground">
                            {new Date(investment.investedDate).toLocaleDateString("en-IN")}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
