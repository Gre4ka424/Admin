// import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import OnboardingStepper from "../welcome/OnboardingStepper";
import { useState } from "react";

export default function Home() {
  const [onboarding, setOnboarding] = useState(true);
  if (onboarding) {
    return <OnboardingStepper onFinish={() => setOnboarding(false)} />;
  }
  return <Welcome />;
}
