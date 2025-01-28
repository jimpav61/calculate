import Calculator from "@/components/Calculator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white relative">
      <div className="fixed top-4 right-4 z-50">
        <Button 
          variant="outline"
          onClick={() => navigate('/login')}
          className="bg-white shadow-sm border"
        >
          Admin Login
        </Button>
      </div>
      <Calculator />
    </div>
  );
};

export default Index;