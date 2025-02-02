import AuthButton from "@/components/auth-button";
import { auth } from "@/lib/auth";
import { Github } from "lucide-react";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="space-y-4">
        <div className="text-6xl font-extrabold text-center">Birthday Reminder</div>
        <div className="text-2xl text-gray-400 text-center">Never miss a special day again!</div>
        {session?.user ? (
          <div className="text-center">
            Hi {session.user.name}. <AuthButton action="signout">Logout</AuthButton>
          </div>
        ) : (
          <div className="w-full flex justify-center pt-4">
            <AuthButton provider="github" action="auth" className="mx-auto text-lg">
              <Github className="!size-6" /> Continue With Github
            </AuthButton>
          </div>
        )}
      </div>
    </div>
  );
}
