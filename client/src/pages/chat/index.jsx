import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import ChatContainer from "./components/chat-container";
import ContactsContainer from "./components/contacts-container";
import EmptyChatContainer from "./components/empty-chat-container";

const Chat = () => {
  const { userInfo, selectedChat } = useAppStore(); // assuming you track selected chat in store
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      toast("Please setup your profile.");
      navigate("/auth");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex h-screen text-white overflow-hidden">
      {/* Sidebar with contacts */}
      <ContactsContainer />

      {/* Show empty container OR chat container based on state */}
      {selectedChat ? <ChatContainer /> : <EmptyChatContainer />}
    </div>
  );
};

export default Chat;
