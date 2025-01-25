import Image from "next/image";

const First = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-black text-white text-center">
      {/* Large Logo */}
      <Image src="/images/HarleyGrow.png" alt="HarleyGrow Logo" width={300} height={100}  />

      {/* One-liner */}
      <h1 className="mt-8 text-4xl font-bold">"Growing the future, powered by AI"</h1>

      {/* Funding Partners */}
      <div className="mt-12">
        <h2 className="text-2xl mb-6">Our Funding Partners</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* MEITY Startup Hub logo */}
          <Image src="/images/meitY.png" alt="MEITY Startup Hub" width={150} height={100} />
        </div>
      </div>
    </section>
  );
};

export default First;
