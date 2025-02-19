
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
      <div className="flex flex-col items-center justify-center">
        <img 
          src="./lovable-uploads/720c07f4-ff7d-421e-9f49-f444be11ebc9.png"
          alt="ChatSites Logo"
          className="w-[300px] mb-8 mt-4"
        />
        <Calculator />
      </div>
    </div>
  );
};

export default Index;
