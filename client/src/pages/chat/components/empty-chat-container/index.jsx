import Lottie from "react-lottie"
import { animationDefaultOptions } from "@/utils/constants"; // <-- import from utils

const EmptyChatContainer = () => {
  return (
    <div className=" flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
        <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
        />
    </div>
  )
}

export default EmptyChatContainer