import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, AlertTriangle, CheckCircle } from "lucide-react";

const ModelMetrics = () => {
  const metrics = [
    { name: "Accuracy", value: 94.2, icon: Target, color: "text-ml-success" },
    { name: "Precision", value: 91.8, icon: CheckCircle, color: "text-ml-primary" },
    { name: "Recall", value: 89.3, icon: TrendingUp, color: "text-ml-secondary" },
    { name: "F1-Score", value: 90.5, icon: AlertTriangle, color: "text-ml-accent" },
  ];

  return (
    <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-ml-primary/30 text-ml-primary">
            Model Performance
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Industry-Leading <span className="text-ml-primary">Accuracy</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our XGBoost model achieves state-of-the-art performance on customer churn prediction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.name} className="bg-gradient-card border-primary/10 p-6 hover:shadow-glow transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${metric.color}`} />
                  <Badge variant="secondary" className="bg-primary/10">
                    {metric.value}%
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">{metric.name}</h3>
                <Progress value={metric.value} className="h-2" />
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-card border-primary/10 p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-ml-success" />
              ROC-AUC Analysis
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Training Set</span>
                <Badge className="bg-ml-success/20 text-ml-success">0.972</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Validation Set</span>
                <Badge className="bg-ml-primary/20 text-ml-primary">0.948</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Test Set</span>
                <Badge className="bg-ml-secondary/20 text-ml-secondary">0.942</Badge>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border-primary/10 p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-ml-accent" />
              Cross-Validation
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">5-Fold CV Score</span>
                <Badge className="bg-ml-accent/20 text-ml-accent">94.1 ± 1.2%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Best Parameters</span>
                <Badge variant="outline">Optimized</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Training Time</span>
                <Badge variant="secondary">2.3 seconds</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ModelMetrics;