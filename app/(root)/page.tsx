import Image from "next/image";
import First from '@/components/first'
import Solution from "@/components/solution";
import Team from "@/components/team";
import Response from "@/components/response";
import ProblemStatement from "@/components/problemstatement" 
import Objectives from "@/components/objectives"


export default function Home() {
  return (
    <div className="font-bold text-teal-500 text-2xl">
      <>
        <First />
        <ProblemStatement/>
        <Objectives/>
      </>
    </div>
    
  );
}
