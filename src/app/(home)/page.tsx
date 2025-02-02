import AuthButton from "@/components/auth-button";
import BirthdayForm from "@/components/birthday-form";
import BirthdayList from "@/components/birthday-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/config/auth";
import { Cake, Gift, Github, LogOut } from "lucide-react";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="space-y-4 w-full">
        <div className="text-6xl font-extrabold text-center">Birthday Reminder</div>
        <div className="text-2xl text-gray-700 text-center">Never miss a special day again!</div>
        {session?.user ? (
          <div className="flex gap-4 container w-full max-w-[1000px] pt-8">
            <Card className="w-1/2 bg-white/80 h-[600px] rounded-l-3xl">
              <CardHeader>
                <CardTitle className="flex gap-4 capitalize items-center">
                  <Gift size={30} /> Add new Birthday
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BirthdayForm />
              </CardContent>
            </Card>
            <Card className="bg-white/80 flex flex-col rounded-r-3xl overflow-hidden max-h-[600px] w-1/2">
              <CardHeader>
                <CardTitle className="flex gap-4 capitalize items-center">
                  <Cake size={30} /> Upcoming birthdays
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 max-h-[calc(100%-78px)] overflow-auto">
                <BirthdayList />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="w-full flex justify-center pt-4">
            <AuthButton provider="github" action="auth" className="mx-auto text-lg py-6">
              <Github className="!size-6" /> Continue With Github
            </AuthButton>
          </div>
        )}
      </div>
      <AuthButton action="signout" className="absolute top-4 right-4" size={"icon"} variant={"ghost"} title="Logout">
        <LogOut className="!w-6 !h-6" />
      </AuthButton>
    </div>
  );
}
