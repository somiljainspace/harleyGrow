// app/careers/page.tsx
export default function CareersPage() {
  const jobs = [
    {
      id: "software-engineer",
      title: "Software Engineer",
      description: "Looking for a skilled software engineer to join our team.",
    },
    {
      id: "product-manager",
      title: "Product Manager",
      description: "Help us define and deliver our product roadmap.",
    },
    {
      id: "ux-designer",
      title: "UX Designer",
      description: "Create user-friendly interfaces for our products.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-20 px-6 md:px-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Careers at HarleyGrow</h1>
        <p className="text-lg text-gray-600 mt-4">
          Join our team and help us build amazing products!
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Open Positions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
              <p className="text-gray-600 mt-3">{job.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
