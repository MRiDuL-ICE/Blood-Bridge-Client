import { Typewriter } from "react-simple-typewriter";
const Welcome = ({ name, subHeading1, subHeading2, subHeading3 }: any) => {
  return (
    <div className="px-4">
      <h3 className="md:text-4xl text-lg uppercase font-bold text-[#2C3E50]">
        Welcome, <span className="text-[#DC143C]">{name}</span>
      </h3>
      <p className="md:text-2xl ml-1">
        You're{" "}
        <span className="text-[#DC143C]">
          <Typewriter
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={130}
            words={[subHeading1, subHeading2, subHeading3]}
            delaySpeed={1000}
            deleteSpeed={50}
          ></Typewriter>
        </span>
      </p>
    </div>
  );
};

export default Welcome;
