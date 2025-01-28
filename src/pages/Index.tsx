import Calculator from "@/components/Calculator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white relative">
      <div className="sticky top-0 right-0 z-50 w-full flex justify-end p-4 bg-white/50 backdrop-blur-sm">
        <Button 
          variant="outline"
          onClick={() => navigate('/login')}
          className="bg-white shadow-md border px-4 py-2 text-sm"
        >
          Admin Login
        </Button>
      </div>
      <Calculator />
    </div>
  );
};

export default Index;