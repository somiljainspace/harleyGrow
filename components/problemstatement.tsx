import React from "react";

type ProblemStatementProps = {
  title: string;
  description: string;
};

const problemStatements: ProblemStatementProps[] = [
  {
    title: "Inefficient Water Use",
    description: "Traditional agriculture uses inefficient water practices, resulting in water wastage and rising concerns over scarcity.",
  },
  {
    title: "Soil Degradation",
    description: "Over-farming and poor soil practices have caused severe soil degradation, reducing agricultural productivity.",
  },
  {
    title: "Labor Dependency",
    description: "Agriculture’s heavy reliance on manual labor makes it vulnerable to workforce shortages and rising costs.",
  },
  {
    title: "Reliance on Chemical Pesticides",
    description: "Excessive pesticide use not only harms the environment but also poses health risks to consumers.",
  },
  {
    title: "Logistical Inefficiencies in Urban Areas",
    description: "Cities face significant logistical challenges when it comes to delivering fresh produce quickly and efficiently.",
  },
  {
    title: "Stagnant Rural Productivity",
    description: "Many rural areas still face stagnant agricultural productivity, contributing to widespread food insecurity.",
  },
  {
    title: "The Need for Sustainable Solutions",
    description: "To solve these issues, a more sustainable, efficient, and health-conscious farming approach is essential.",
  },
];

const ProblemStatement = () => (
  <section className="problem-container p-8 bg-black text-white rounded-xl">
    <h2 className="section-title text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-100">The Big Challenges We're Tackling</h2>
    <p className="text-xl text-center mb-8 text-gray-300">Innovative solutions for the world’s most pressing problems.</p>
    <div className="space-y-8">
      {problemStatements.map((statement, index) => (
        <div key={index} className="problem-statement bg-gray-800 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold mb-4 text-blue-400">{statement.title}</h3>
          <p className="text-lg">{statement.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ProblemStatement;
