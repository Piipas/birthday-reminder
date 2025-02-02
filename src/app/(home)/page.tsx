import AuthButton from "@/components/auth-button";
import BirthdayForm from "@/components/birthday-form";
import BirthdayList from "@/components/birthday-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/config/auth";
import { Cake, Gift, Github } from "lucide-react";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="space-y-4 w-full">
        <div className="text-6xl font-extrabold text-center">Birthday Reminder</div>
        <div className="text-2xl text-gray-400 text-center">Never miss a special day again!</div>
        {session?.user ? (
          <div className="flex gap-4 container w-full max-w-[1000px]">
            <Card className="w-1/2">
              <CardHeader>
                <CardTitle className="flex gap-4 capitalize items-center">
                  <Gift size={30} /> Add new Birthday
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BirthdayForm />
              </CardContent>
            </Card>
            <Card className="w-1/2">
              <CardHeader>
                <CardTitle className="flex gap-4 capitalize items-center">
                  <Cake size={30} /> Upcoming birthdays
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BirthdayList />
              </CardContent>
            </Card>
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
