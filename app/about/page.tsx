import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Welcome to Our Story</h1>
        <p className="mt-4 text-lg">Revolutionizing Hydropinics with Innovation and Sustainability</p>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-semibold text-center">Our Journey</h2>
        <p className="mt-6 text-center text-gray-600">
          It all began in 2022, when we set out to solve farming degradation. Over the years, we have achieved milestones that have shaped who we are today.
        </p>
        <div className="mt-8 flex justify-center">
          <img
            src="/images/timeline.png"
            alt="Our Journey Timeline"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="bg-gray-200 py-16 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-semibold text-center">Our Mission and Vision</h2>
        <div className="mt-8 space-y-4 text-center text-gray-700">
          <p>
            <strong>Mission:</strong> To [Your Mission Statement].
          </p>
          <p>
            <strong>Vision:</strong> To [Your Vision Statement].
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-semibold text-center">What We Do</h2>
        <p className="mt-6 text-center text-gray-600">
          At [Your Company], we provide [Products/Services] that address [Key Needs or Benefits].
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold">Service 1</h3>
            <p className="mt-2 text-gray-600">Brief description of Service 1.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold">Service 2</h3>
            <p className="mt-2 text-gray-600">Brief description of Service 2.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold">Service 3</h3>
            <p className="mt-2 text-gray-600">Brief description of Service 3.</p>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="bg-gray-200 py-16 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-semibold text-center">Meet Our Team</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <img
              src="/images/team-member-1.jpg"
              alt="Team Member 1"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h3 className="mt-4 text-xl font-bold">Somil jain</h3>
            <p className="text-gray-600">CEO</p>
          </div>
          <div className="text-center">
            <img
              src="/images/team-member-2.jpg"
              alt="Team Member 2"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h3 className="mt-4 text-xl font-bold">Rakesh </h3>
            <p className="text-gray-600">CTO</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-semibold">Join Us on Our Journey</h2>
        <p className="mt-4 text-lg">
          Be part of our mission to make a difference. Contact us today to learn more!
        </p>
        <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-200">
          Get in Touch
        </button>
      </section>
    </div>
  );
};

export default AboutPage;
