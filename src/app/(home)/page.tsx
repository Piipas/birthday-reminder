import AuthButton from "@/components/auth-button";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <AuthButton provider="github">
        <Github /> Continue With Github
      </AuthButton>
    </div>
  );
}
