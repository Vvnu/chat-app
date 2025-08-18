import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import Background from "@/assets/login1.png";
import Victory from "@/assets/victory.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants"; 
import { useAppStore } from "@/store"; // Import the app store 


const Auth = () => {
  const  navigate = useNavigate();
  const {setUserInfo} = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  
const validateLogin = () => {
  if(!email.length) {
    toast.error("Email is required");
    return false;
  }
  if(!password.length) {
    toast.error("Password is required");
    return false;
  }
  return true;
};




const validateSignup = () => {
  if(!email.length)
{
  toast.error("Email is required");
  return false;
}
  if(!password.length)
{ 
  toast.error("Password is required");
  return false;
  };
    if(password !== confirmPassword){
    toast.error(" Password and Confirm Password should be same");
    return false;
    }
    return true;
  };
  
    const handlelogin = async () => {
      // Handle login logic here  
    if (validateLogin()) {
        try {
          const response = await apiClient.post(LOGIN_ROUTE, {email, password}, {withCredentials:true }); // FIXED: Use imported constant instead of string
          if(response.data.user.id){
            setUserInfo(response.data.user); // Store user info in the app store
            if(response.data.user.profileSetup){
              navigate("/chat"); // Redirect to chat page after successful login
            } else {
              navigate("/profile"); // Redirect to profile page after successful login
            }
          }
          console.log({ response });
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data || "login failed");
        }
      } 
    };
    
    const handlesignup = async () => {
      // Handle signup logic here
      if (validateSignup()) {
        try {
          const response = await apiClient.post(SIGNUP_ROUTE, {email, password}, {withCredentials:true }); // FIXED: Use imported constant instead of string
          console.log({ response });
          if (response.status === 201) {
            toast.success("Signup successful!");
            setUserInfo(response.data.user); // Store user info in the app store
            navigate("/profile"); // Redirect to home page after successful signup
          }
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data || "Signup failed");
        }
      }
    };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl flex items-center justify-center">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-row">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="victory emoji" className="h-[150px]"/>
            </div>
            <p className="font-medium text-center">
              Fill in the details to get start with chat app!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="login" className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 border-transparent rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 border-transparent rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input placeholder="Email"
                 type="email" 
                 className="rounded-full p-6" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)} 
                 />
          
                 <Input placeholder="Password"
                 type="password" 
                 className="rounded-full p-6" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)} 
                 />

                 <Button onClick={handlelogin} className="rounded-full p-6">
                   Login
                 </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5 mt-10" value="signup">
                <Input placeholder="Email"
                 type="email"   
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                 />
                <Input placeholder="Password"
                 type="password"
                  className="rounded-full p-6"  
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                <Input placeholder="Confirm Password"
                 type="password"
                  className="rounded-full p-6"  
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                 />
                <Button onClick={handlesignup} className="rounded-full p-6">
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt=" background login" className="h-[450px]"/>
        </div>
      </div>
    </div>
  );
};

export default Auth;