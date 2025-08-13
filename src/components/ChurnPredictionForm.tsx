import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Calculator, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomerData {
  age: string;
  tenure: string;
  monthlyCharges: string;
  totalCharges: string;
  contract: string;
  paymentMethod: string;
  internetService: string;
  techSupport: string;
}

const ChurnPredictionForm = () => {
  const { toast } = useToast();
  const [customerData, setCustomerData] = useState<CustomerData>({
    age: "",
    tenure: "",
    monthlyCharges: "",
    totalCharges: "",
    contract: "",
    paymentMethod: "",
    internetService: "",
    techSupport: "",
  });
  const [prediction, setPrediction] = useState<{
    churnProbability: number;
    riskLevel: string;
    prediction: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const simulateMLPrediction = (): { churnProbability: number; riskLevel: string; prediction: string } => {
    // Simulate ML model prediction with realistic logic
    const age = parseInt(customerData.age) || 0;
    const tenure = parseInt(customerData.tenure) || 0;
    const monthlyCharges = parseFloat(customerData.monthlyCharges) || 0;
    
    let baseRisk = 0.3;
    
    // Age factor
    if (age < 30 || age > 65) baseRisk += 0.15;
    
    // Tenure factor - longer tenure = lower risk
    if (tenure < 12) baseRisk += 0.2;
    else if (tenure > 36) baseRisk -= 0.15;
    
    // Monthly charges factor
    if (monthlyCharges > 80) baseRisk += 0.1;
    
    // Contract type factor
    if (customerData.contract === "Month-to-month") baseRisk += 0.2;
    else if (customerData.contract === "Two year") baseRisk -= 0.15;
    
    // Payment method factor
    if (customerData.paymentMethod === "Electronic check") baseRisk += 0.1;
    
    // Tech support factor
    if (customerData.techSupport === "No") baseRisk += 0.1;
    
    const churnProbability = Math.min(Math.max(baseRisk + (Math.random() - 0.5) * 0.1, 0.05), 0.95);
    
    let riskLevel = "Low";
    let prediction = "Will Stay";
    
    if (churnProbability > 0.7) {
      riskLevel = "High";
      prediction = "Likely to Churn";
    } else if (churnProbability > 0.4) {
      riskLevel = "Medium";
      prediction = "At Risk";
    }
    
    return {
      churnProbability: churnProbability * 100,
      riskLevel,
      prediction
    };
  };

  const handlePredict = async () => {
    if (!customerData.age || !customerData.tenure || !customerData.monthlyCharges) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least age, tenure, and monthly charges.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = simulateMLPrediction();
    setPrediction(result);
    setIsLoading(false);
    
    toast({
      title: "Prediction Complete",
      description: `Customer churn probability: ${result.churnProbability.toFixed(1)}%`,
    });
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "High": return "text-ml-danger";
      case "Medium": return "text-ml-warning";
      case "Low": return "text-ml-success";
      default: return "text-foreground";
    }
  };

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case "High": return "destructive";
      case "Medium": return "outline";
      case "Low": return "secondary";
      default: return "outline";
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-ml-primary/30 text-ml-primary">
            Live Prediction
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Predict Customer <span className="text-ml-accent">Churn Risk</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter customer information to get instant churn predictions powered by our ML model
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gradient-card border-primary/10 p-8">
            <div className="flex items-center mb-6">
              <Calculator className="w-6 h-6 mr-3 text-ml-primary" />
              <h3 className="text-2xl font-bold">Customer Information</h3>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="35"
                    value={customerData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <Label htmlFor="tenure">Tenure (months)</Label>
                  <Input
                    id="tenure"
                    type="number"
                    placeholder="24"
                    value={customerData.tenure}
                    onChange={(e) => handleInputChange("tenure", e.target.value)}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyCharges">Monthly Charges ($)</Label>
                  <Input
                    id="monthlyCharges"
                    type="number"
                    step="0.01"
                    placeholder="65.50"
                    value={customerData.monthlyCharges}
                    onChange={(e) => handleInputChange("monthlyCharges", e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <Label htmlFor="totalCharges">Total Charges ($)</Label>
                  <Input
                    id="totalCharges"
                    type="number"
                    step="0.01"
                    placeholder="1500.00"
                    value={customerData.totalCharges}
                    onChange={(e) => handleInputChange("totalCharges", e.target.value)}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Contract Type</Label>
                  <Select value={customerData.contract} onValueChange={(value) => handleInputChange("contract", value)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select contract" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Month-to-month">Month-to-month</SelectItem>
                      <SelectItem value="One year">One year</SelectItem>
                      <SelectItem value="Two year">Two year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Payment Method</Label>
                  <Select value={customerData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronic check">Electronic check</SelectItem>
                      <SelectItem value="Mailed check">Mailed check</SelectItem>
                      <SelectItem value="Bank transfer">Bank transfer</SelectItem>
                      <SelectItem value="Credit card">Credit card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Internet Service</Label>
                  <Select value={customerData.internetService} onValueChange={(value) => handleInputChange("internetService", value)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DSL">DSL</SelectItem>
                      <SelectItem value="Fiber optic">Fiber optic</SelectItem>
                      <SelectItem value="No">No internet service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tech Support</Label>
                  <Select value={customerData.techSupport} onValueChange={(value) => handleInputChange("techSupport", value)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handlePredict} 
                disabled={isLoading}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg py-6"
              >
                {isLoading ? (
                  <>
                    <Brain className="w-5 h-5 mr-2 animate-spin" />
                    Processing with ML Model...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Predict Churn Risk
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card className="bg-gradient-card border-primary/10 p-8">
            <div className="flex items-center mb-6">
              <Brain className="w-6 h-6 mr-3 text-ml-accent" />
              <h3 className="text-2xl font-bold">Prediction Results</h3>
            </div>

            {prediction ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-ml-primary to-ml-accent bg-clip-text text-transparent">
                    {prediction.churnProbability.toFixed(1)}%
                  </div>
                  <p className="text-muted-foreground">Churn Probability</p>
                </div>

                <Progress value={prediction.churnProbability} className="h-4" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                    <span className="font-medium">Risk Level</span>
                    <Badge variant={getRiskBadgeVariant(prediction.riskLevel)} className={getRiskColor(prediction.riskLevel)}>
                      {prediction.riskLevel} Risk
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                    <span className="font-medium">Prediction</span>
                    <div className="flex items-center">
                      {prediction.prediction === "Will Stay" ? (
                        <CheckCircle className="w-5 h-5 mr-2 text-ml-success" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 mr-2 text-ml-warning" />
                      )}
                      <span className={prediction.prediction === "Will Stay" ? "text-ml-success" : "text-ml-warning"}>
                        {prediction.prediction}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-ml-primary/10 border border-ml-primary/20 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Recommended Actions
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {prediction.riskLevel === "High" && (
                      <>
                        <li>• Immediate intervention required</li>
                        <li>• Offer retention incentives</li>
                        <li>• Schedule personal consultation</li>
                      </>
                    )}
                    {prediction.riskLevel === "Medium" && (
                      <>
                        <li>• Monitor customer closely</li>
                        <li>• Improve service quality</li>
                        <li>• Send satisfaction survey</li>
                      </>
                    )}
                    {prediction.riskLevel === "Low" && (
                      <>
                        <li>• Customer is stable</li>
                        <li>• Focus on upselling opportunities</li>
                        <li>• Maintain current service level</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Enter customer information and click "Predict Churn Risk" to see results
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChurnPredictionForm;