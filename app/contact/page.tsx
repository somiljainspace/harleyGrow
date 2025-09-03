"use client";
import { useState } from "react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Contact Us
      </h1>

      {/* Contact Form Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Get in Touch
          </h2>
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Write your message here"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d6933.77688551019!2d75.02061101925763!3d15.389838334871232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d15.393696799999999!2d75.0242463!4m5!1s0x3bb8d303159a6b09%3A0x4c6fc7e17ee14d13!2sIIIT-Dharwad%20Pond!3m2!1d15.393113699999999!2d75.0228037!5e0!3m2!1sen!2sin!4v1756809458068!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
