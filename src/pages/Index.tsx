import { useState } from "react";
import ChurnHero from "@/components/ChurnHero";
import ModelMetrics from "@/components/ModelMetrics";
import ChurnPredictionForm from "@/components/ChurnPredictionForm";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleGetStarted = () => {
    setShowDashboard(true);
    // Smooth scroll to the prediction form
    setTimeout(() => {
      document.getElementById('prediction-form')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <ChurnHero onGetStarted={handleGetStarted} />
      <ModelMetrics />
      <div id="prediction-form">
        <ChurnPredictionForm />
      </div>
    </div>
  );
};

export default Index;