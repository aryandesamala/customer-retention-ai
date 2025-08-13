import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Brain, TrendingUp } from "lucide-react";

const ChurnHero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-ml-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-ml-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-ml-primary via-ml-accent to-ml-success bg-clip-text text-transparent">
            Customer Churn
            <br />
            Prediction System
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Leverage machine learning to predict customer behavior, reduce churn rates, 
            and maximize retention with our comprehensive analytics platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 hover:bg-primary/10 text-lg px-8 py-6"
            >
              View Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card/20 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 hover:shadow-ml transition-all duration-300">
              <BarChart3 className="w-12 h-12 text-ml-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-muted-foreground">Monitor customer behavior patterns with live dashboards and insights.</p>
            </div>
            
            <div className="bg-card/20 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 hover:shadow-ml transition-all duration-300">
              <Brain className="w-12 h-12 text-ml-secondary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">ML Predictions</h3>
              <p className="text-muted-foreground">Advanced algorithms predict churn probability with 95%+ accuracy.</p>
            </div>
            
            <div className="bg-card/20 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 hover:shadow-ml transition-all duration-300">
              <TrendingUp className="w-12 h-12 text-ml-success mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Retention Boost</h3>
              <p className="text-muted-foreground">Increase customer lifetime value by 40% with proactive interventions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChurnHero;