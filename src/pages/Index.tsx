import Calculator from "@/components/Calculator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute top-4 right-4">
        <Button 
          variant="outline"
          onClick={() => navigate('/login')}
        >
          Admin Login
        </Button>
      </div>
      <Calculator />
    </div>
  );
};

export default Index;