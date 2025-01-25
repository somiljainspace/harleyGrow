import React from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Somil Jain',
    position: 'CEO',
    photo: '/images/somil-jain.jpg',
    description: 'Visionary leader with a passion for sustainable innovation.',
  },
  {
    name: 'Rakesh Gadupudi',
    position: 'CFO',
    photo: '/images/rakesh-gadupudi.jpg',
    description: 'Finance expert ensuring operational efficiency and profitability.',
  },
];

const Team = () => {
  return (
    <div className="team-container bg-white p-8 rounded-lg shadow-md">
      <h2 className="team-heading text-3xl font-bold text-center mb-8 text-gray-800">Meet Our Team</h2>
      <div className="team-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            className="team-card bg-gray-50 p-6 rounded-lg shadow-sm text-center"
          >
            <Image
              src={member.photo}
              alt={member.name}
              width={150}
              height={150}
              className="team-photo mx-auto mb-4 rounded-full border border-gray-200"
            />
            <h3 className="team-name text-xl font-semibold text-gray-700">{member.name}</h3>
            <p className="team-position text-sm font-medium text-green-600 mb-2">{member.position}</p>
            <p className="team-description text-sm text-gray-600">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;