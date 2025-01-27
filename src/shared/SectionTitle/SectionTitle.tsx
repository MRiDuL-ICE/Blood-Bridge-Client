const SectionTitle = ({ heading }: any) => {
  return (
    <div>
      <h2 className="md:text-4xl text-xl text-center uppercase font-bold text-[#2C3E50]">
        ---{heading}---
      </h2>
    </div>
  );
};

export default SectionTitle;
