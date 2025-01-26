// components/SessionWrapper.tsx
"use client"; // This is a client component

import { SessionProvider } from "next-auth/react";

import { ReactNode } from "react";

const SessionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default SessionWrapper;
