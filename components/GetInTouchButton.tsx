import React from "react";

const GetInTouchButton = () => {
  // Replace with your Google Form link
  const googleFormLink = "https://forms.gle/your-google-form-link";

  return (
    <a
      href={googleFormLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
    >
      Get in Touch
    </a>
  );
};

export default GetInTouchButton;
