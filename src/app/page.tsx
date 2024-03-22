"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const buttonHandler = () => {
    router.push("/Adaptive/");
  };

  return (
    <div>
      <button onClick={buttonHandler}>Adaptive Learning Feature</button>
    </div>
  );
}
