import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      toast("Please Setup Profile ",);
      navigate("/auth");
    }
  }, [userInfo, navigate]);

  return (
    <div> Chat </div>
  );
};

export default Chat;
  
