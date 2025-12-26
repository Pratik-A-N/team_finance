import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Shield, Heart, Calculator, ArrowRight, RefreshCw, ExternalLink } from "lucide-react";
import logoImage from "@assets/WhatsApp_Image_2025-12-26_at_16.46.12_1766748068781.png";

const MUTUAL_FUND_INVEST_LINK = "http://p.njw.bz/41983";

interface CalculatorInputs {
  monthlyIncome: number;
  currentSavings: number;
  age: number;
  goal: string;
  goalValue: number;
  tenure: number;
}

interface CalculationResult {
  mutualFundMonthly: number;
  mutualFundTotal: number;
  termInsurancePremium: number;
  termInsuranceCover: number;
  healthInsurancePremium: number;
  healthInsuranceCover: number;
  totalMonthlyInvestment: number;
  percentageOfIncome: number;
}

const goalOptions = [
  { value: "retirement", label: "Retirement" },
  { value: "house", label: "Buying a House" },
  { value: "car", label: "Buying a Car" },
  { value: "child-education", label: "Child's Education" },
  { value: "wealth-creation", label: "Wealth Creation" },
];

interface FinancialCalculatorProps {
  onConsultClick?: (serviceId: string) => void;
}

export default function FinancialCalculator({ onConsultClick }: FinancialCalculatorProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyIncome: 50000,
    currentSavings: 100000,
    age: 30,
    goal: "",
    goalValue: 5000000,
    tenure: 10,
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)} K`;
    }
    return amount.toFixed(0);
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setShowResult(false);
  };

  const calculatePlan = () => {
    const { monthlyIncome, currentSavings, age, goal, goalValue, tenure } = inputs;

    const yearsToRetirement = Math.max(60 - age, 0);
    const monthsToGoal = tenure * 12;
    const targetAmount = goalValue - currentSavings;

    const expectedReturn = goal === "retirement" ? 0.12 : 0.10;
    const monthlyRate = expectedReturn / 12;

    let mutualFundMonthly: number;
    if (monthlyRate > 0 && monthsToGoal > 0) {
      mutualFundMonthly = (targetAmount * monthlyRate) / (Math.pow(1 + monthlyRate, monthsToGoal) - 1);
      mutualFundMonthly = Math.max(0, Math.ceil(mutualFundMonthly / 100) * 100);
    } else {
      mutualFundMonthly = Math.ceil(targetAmount / monthsToGoal / 100) * 100;
    }

    const mutualFundTotal = targetAmount;

    const termInsuranceCover = monthlyIncome * 12 * 15;
    let termInsurancePremium: number;
    if (age < 30) {
      termInsurancePremium = Math.ceil((termInsuranceCover / 1000000) * 400);
    } else if (age < 40) {
      termInsurancePremium = Math.ceil((termInsuranceCover / 1000000) * 600);
    } else if (age < 50) {
      termInsurancePremium = Math.ceil((termInsuranceCover / 1000000) * 1000);
    } else {
      termInsurancePremium = Math.ceil((termInsuranceCover / 1000000) * 1800);
    }
    termInsurancePremium = Math.ceil(termInsurancePremium / 12 / 100) * 100;

    let healthInsuranceCover: number;
    if (age < 35) {
      healthInsuranceCover = 500000;
    } else if (age < 45) {
      healthInsuranceCover = 1000000;
    } else {
      healthInsuranceCover = 1500000;
    }

    let healthInsurancePremium: number;
    if (age < 35) {
      healthInsurancePremium = Math.ceil(healthInsuranceCover * 0.015 / 12);
    } else if (age < 45) {
      healthInsurancePremium = Math.ceil(healthInsuranceCover * 0.02 / 12);
    } else {
      healthInsurancePremium = Math.ceil(healthInsuranceCover * 0.03 / 12);
    }
    healthInsurancePremium = Math.ceil(healthInsurancePremium / 100) * 100;

    const totalMonthlyInvestment = mutualFundMonthly + termInsurancePremium + healthInsurancePremium;
    const percentageOfIncome = (totalMonthlyInvestment / monthlyIncome) * 100;

    setResult({
      mutualFundMonthly,
      mutualFundTotal,
      termInsurancePremium,
      termInsuranceCover,
      healthInsurancePremium,
      healthInsuranceCover,
      totalMonthlyInvestment,
      percentageOfIncome,
    });
    setShowResult(true);
  };

  const resetCalculator = () => {
    setInputs({
      monthlyIncome: 50000,
      currentSavings: 100000,
      age: 30,
      goal: "",
      goalValue: 5000000,
      tenure: 10,
    });
    setResult(null);
    setShowResult(false);
  };

  const isFormValid = inputs.goal !== "" && inputs.monthlyIncome > 0 && inputs.goalValue > 0;

  return (
    <section id="calculator" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src={logoImage}
              alt="Team Finance"
              className="h-20 w-auto opacity-90"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            Financial Planning Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your details to get a personalized breakdown of how much you should invest 
            in mutual funds, term insurance, and health insurance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Enter Your Details
              </CardTitle>
              <CardDescription>
                Fill in your financial information to get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="monthly-income">Monthly Income</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    INR
                  </span>
                  <Input
                    id="monthly-income"
                    type="number"
                    value={inputs.monthlyIncome}
                    onChange={(e) => handleInputChange("monthlyIncome", Number(e.target.value))}
                    className="pl-12"
                    data-testid="input-monthly-income"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-savings">Current Savings</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    INR
                  </span>
                  <Input
                    id="current-savings"
                    type="number"
                    value={inputs.currentSavings}
                    onChange={(e) => handleInputChange("currentSavings", Number(e.target.value))}
                    className="pl-12"
                    data-testid="input-current-savings"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Age: {inputs.age} years</Label>
                </div>
                <Slider
                  value={[inputs.age]}
                  onValueChange={(value) => handleInputChange("age", value[0])}
                  min={18}
                  max={60}
                  step={1}
                  className="w-full"
                  data-testid="slider-age"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>18 years</span>
                  <span>60 years</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Financial Goal</Label>
                <Select
                  value={inputs.goal}
                  onValueChange={(value) => handleInputChange("goal", value)}
                >
                  <SelectTrigger data-testid="select-goal">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal-value">Target Amount (Goal Value)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    INR
                  </span>
                  <Input
                    id="goal-value"
                    type="number"
                    value={inputs.goalValue}
                    onChange={(e) => handleInputChange("goalValue", Number(e.target.value))}
                    className="pl-12"
                    data-testid="input-goal-value"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Target: {formatCurrency(inputs.goalValue)}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Time to Achieve Goal: {inputs.tenure} years</Label>
                </div>
                <Slider
                  value={[inputs.tenure]}
                  onValueChange={(value) => handleInputChange("tenure", value[0])}
                  min={1}
                  max={30}
                  step={1}
                  className="w-full"
                  data-testid="slider-tenure"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={calculatePlan}
                  disabled={!isFormValid}
                  className="flex-1 gap-2"
                  data-testid="button-calculate"
                >
                  Calculate Plan
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={resetCalculator}
                  size="icon"
                  data-testid="button-reset"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {showResult && result ? (
              <>
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm opacity-80 mb-2">Total Monthly Investment</p>
                      <p className="text-4xl font-bold mb-2" data-testid="text-total-monthly">
                        INR {result.totalMonthlyInvestment.toLocaleString()}
                      </p>
                      <p className="text-sm opacity-80">
                        {result.percentageOfIncome.toFixed(1)}% of your monthly income
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">Mutual Fund Investment</h3>
                        <p className="text-2xl font-bold text-primary mb-1" data-testid="text-mutual-fund-monthly">
                          INR {result.mutualFundMonthly.toLocaleString()}/month
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          To reach your goal of {formatCurrency(result.mutualFundTotal + inputs.currentSavings)} in {inputs.tenure} years
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            size="sm"
                            className="gap-1"
                            onClick={() => window.open(MUTUAL_FUND_INVEST_LINK, "_blank")}
                            data-testid="button-result-invest-mutual-funds"
                          >
                            Start Investing
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1"
                            onClick={() => onConsultClick?.("mutual-funds")}
                            data-testid="button-result-consult-mutual-funds"
                          >
                            Get Consultation
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-secondary/20 flex-shrink-0">
                        <Shield className="w-6 h-6 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">Term Insurance</h3>
                        <p className="text-2xl font-bold text-secondary mb-1" data-testid="text-term-insurance-monthly">
                          INR {result.termInsurancePremium.toLocaleString()}/month
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Coverage: {formatCurrency(result.termInsuranceCover)} (15x annual income)
                        </p>
                        <Button
                          size="sm"
                          className="gap-1"
                          onClick={() => onConsultClick?.("term-insurance")}
                          data-testid="button-result-consult-term-insurance"
                        >
                          Get Consultation
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-accent/20 flex-shrink-0">
                        <Heart className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">Health Insurance</h3>
                        <p className="text-2xl font-bold text-accent mb-1" data-testid="text-health-insurance-monthly">
                          INR {result.healthInsurancePremium.toLocaleString()}/month
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Coverage: {formatCurrency(result.healthInsuranceCover)} (recommended for age {inputs.age})
                        </p>
                        <Button
                          size="sm"
                          className="gap-1"
                          onClick={() => onConsultClick?.("health-insurance")}
                          data-testid="button-result-consult-health-insurance"
                        >
                          Get Consultation
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <p className="text-xs text-muted-foreground text-center">
                  * This is an approximate calculation. Actual values may vary based on market conditions and insurance policies.
                  Please consult our advisors for a detailed analysis.
                </p>
              </>
            ) : (
              <Card className="bg-background h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Enter Your Details</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Fill in your financial information on the left to get your personalized 
                    investment breakdown.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
