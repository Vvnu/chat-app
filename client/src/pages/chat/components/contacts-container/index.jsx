const ContactContainer = () => {
  return (
    <div
      className="relative 
      w-1/3          
      md:w-[35vw]     
      lg:w-[30vw]     
      xl:w-[20vw]     
      bg-[#1b1c24] 
      border-r-4"
    >
      <div className="pt-3">
        <Logo />

        </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channel" />
        </div>
      </div>

    </div>
  );
};

export default ContactContainer;

const Logo = () => {
  return (
    <div className="flex items-center justify-center p-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        viewBox="0 0 70 40"  // narrower than 100 → pulls I closer to V
        fill="none"
      >
        <defs>
          <linearGradient id="gradV" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8338ec" />
            <stop offset="100%" stopColor="#a16ee8" />
          </linearGradient>
          <linearGradient id="gradI" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#975aed" />
            <stop offset="100%" stopColor="#8338ec" />
          </linearGradient>
        </defs>

        {/* V */}
        <path
          d="M10 5 L25 35 L40 5 Z"
          fill="url(#gradV)"
          stroke="#975aed"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* I → moved closer (x=45 instead of 55) */}
        <rect
          x="45"
          y="5"
          width="10"
          height="30"
          rx="3"
          fill="url(#gradI)"
        />
      </svg>

      {/* text with small margin */}
      <span className="ml-2 text-2xl font-semibold text-white">VAAG</span>
    </div>
  );
};


const Title = ({ text }) => {
  return ( 
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};
