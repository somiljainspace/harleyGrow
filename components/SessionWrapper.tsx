// components/SessionWrapper.tsx
"use client"; // This is a client component

import { SessionProvider } from "next-auth/react";

const SessionWrapper = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default SessionWrapper;
