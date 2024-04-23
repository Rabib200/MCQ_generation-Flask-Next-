"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const buttonHandler1 = () => {
    router.push("/Adaptive/");
  };
  const buttonHandler2 = () => {
    router.push("/student/");
  };

  return (
    <div>
      <button onClick={buttonHandler1}>Adaptive Learning Feature</button>
      <button onClick={buttonHandler2}>Student Side</button>
    </div>
  );
}
