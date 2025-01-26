import React from 'react';
import First from '@/components/first';
import ProblemStatement from '@/components/problemstatement';
import Objectives from '@/components/objectives';

export default function Home() {
  return (
    <div className="font-bold text-teal-500 text-2xl">
      <First />
      <ProblemStatement />
      <Objectives />
    </div>
  );
}
