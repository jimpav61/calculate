import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface CalculatorFormData {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  minutes: number;
}

const Calculator = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CalculatorFormData>({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    minutes: 0,
  });

  const costPerMinute = 0.05; // This would be admin configurable

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    return (formData.minutes * costPerMinute).toFixed(2);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Calculation Complete",
      description: "Your custom report will be emailed to you shortly.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-white to-gray-50">
      <Card className="w-full max-w-2xl p-8 glass-card animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Chatsites Voice AI Calculator
          </h1>
          <p className="text-gray-600">Calculate your estimated monthly costs</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map((number) => (
              <div key={number} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= number
                      ? "bg-brand text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {number}
                </div>
                {number < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      step > number ? "bg-brand" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <Label htmlFor="minutes">Estimated Monthly Minutes</Label>
                <Input
                  id="minutes"
                  name="minutes"
                  type="number"
                  min="0"
                  value={formData.minutes}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>

              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Estimated Monthly Cost</p>
                  <p className="text-4xl font-bold text-brand">
                    ${calculateTotal()}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Based on ${costPerMinute} per minute
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="transition-all hover:bg-gray-100"
              >
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="ml-auto bg-brand hover:bg-brand-dark transition-colors"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-auto bg-brand hover:bg-brand-dark transition-colors"
              >
                Generate Report
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Calculator;