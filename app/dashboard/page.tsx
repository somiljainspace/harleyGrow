"use client"; // Ensure this file is treated as a Client Component

import { useSession, signIn } from "next-auth/react";
import SensorData from "../../components/SensorData";
import AIPredictions from "../../components/AIPredictions";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    // If the user is not logged in, redirect to the login page or show a prompt
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>
          You are not logged in.{" "}
          <button onClick={() => signIn()} className="text-blue-500 underline">
            Login here
          </button>
        </p>
      </div>
    );
  }

  // If the user is logged in, display the dashboard
  return (
    <div className="p-8">
      <SensorData />
      <AIPredictions />
    </div>
  );
}