import Lottie from "react-lottie";
import GradientAnimation from "@/assets/gradient.json";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PulsingAnimation from "@/assets/Pulsing.json"; // ✅ correct import

import { animationDefaultOptions } from "@/lib/utils";

const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
      {/* JSON animation using react-lottie */}
      {/* <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
      /> */}

      {/* <Lottie
        isClickToPauseDisabled={true}
        height={400}
        width={400}
        options={{
          loop: true,
          autoplay: true,
          animationData: GradientAnimation,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
      /> */}

      {/* .lottie animation using DotLottieReact */}
    <Lottie
        isClickToPauseDisabled={true}
        height={700}
        width={700}
        options={{
          loop: true,
          autoplay: true,
          animationData: PulsingAnimation,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
      />
      <h1 className="text-2xl text-gray-400 font-semibold">
        Select a chat to start messaging
      </h1>
    </div>
  );
};


export default EmptyChatContainer;
