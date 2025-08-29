import React from "react";
import Image from "next/image";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Welcome to Our Story</h1>
        <p className="mt-4 text-lg">
          Revolutionizing Hydroponics with Innovation and Sustainability
        </p>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-semibold text-center">Our Journey</h2>
        <p className="mt-6 text-center text-gray-600">
          It all began in 2022 when we set out to solve farming degradation. Over the years, 
          we have achieved milestones that have shaped who we are today. We have been recognized 
          by MSME and have received awards for our innovation in agriculture. We were also granted 
          ₹5 lakh by the Government of India. We thank our institution for providing us with the 
          platform to showcase our innovation, helping us make a difference in the lives of farmers 
          and consumers alike.
        </p>
        <div className="mt-8 flex justify-center">
          <Image src="/images/timeline.png" width={600} height={350} alt="Timeline" />
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="bg-gray-200 py-16 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-semibold text-center">Our Mission and Vision</h2>
        <div className="mt-8 space-y-4 text-center text-gray-700">
          <p>
            <strong>Mission:</strong> To make agriculture laborless and stress-free.
          </p>
          <p>
            <strong>Vision:</strong> To supply organic food to consumers.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-semibold text-center">What We Do</h2>
        <p className="mt-6 text-center text-gray-600">
          At HarleyGrow, we are a leading polyhouse manufacturer and construction company 
          committed to providing innovative farming solutions that significantly boost crop 
          production while maximizing the use of limited resources. With the right tools, 
          complete knowledge of the process, and training, anyone can engage in farming and 
          build a profitable venture.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold">Polyhouse Construction</h3>
            <p className="mt-2 text-gray-600">High-quality polyhouse structures for optimal crop yield.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold">Hydroponic Solutions</h3>
            <p className="mt-2 text-gray-600">Efficient water-based farming for sustainable agriculture.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold">Training & Consultation</h3>
            <p className="mt-2 text-gray-600">Expert guidance to help farmers adopt modern techniques.</p>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="bg-gray-200 py-16 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-semibold text-center">Meet Our Team</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <Image
              src="/images/team1.jpg"
              width={200}
              height={200}
              alt="Somil Jain"
              className="mx-auto object-cover"
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
            <h3 className="mt-4 text-xl font-bold">Somil Jain</h3>
            <p className="text-gray-600">CEO</p>
          </div>
          <div className="text-center">
            <Image
              src="/images/team-member-2.jpg"
              width={96}
              height={96}
              alt="Rakesh Gadupudi"
              className="rounded-full mx-auto"
            />
            <h3 className="mt-4 text-xl font-bold">Rakesh Gadupudi</h3>
            <p className="text-gray-600">CFO</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;