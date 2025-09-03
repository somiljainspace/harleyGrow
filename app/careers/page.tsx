import React from 'react';
import Link from 'next/link';

const Careers: React.FC = () => {
  const jobs = [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      description: 'looking for a skilled software engineer.',
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      description: 'Help us define and deliver our product roadmap.',
    },
    {
      id: 'ux-designer',
      title: 'UX Designer',
      description: 'Create user-friendly interfaces for our products.',
    },
  ];

  const benefits = [
    'Flexible work hours & remote options',
    'Health insurance & wellness benefits',
    'Learning and development programs',
    'Collaborative and inclusive culture',
    'Exciting projects with cutting-edge tech',
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-32 px-6 md:px-16">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Careers at HarleyGrow</h1>
        <p className="text-lg text-gray-600 mt-4">
          Join our team and help us build amazing products!
        </p>
      </header>

      {/* Open Positions */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Open Positions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
              <p className="text-gray-600 mt-3">{job.description}</p>
              <Link
  href={`/careers/${job.id}`}
  className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
>
  Apply Now
</Link>

            </div>
          ))}
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Why Work With Us?
        </h2>
        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-gray-700"
            >
              <span className="text-blue-600 text-lg font-bold">✔</span>
              {benefit}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Careers;
