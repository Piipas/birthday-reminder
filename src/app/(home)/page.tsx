import AuthButton from "@/components/auth-button";
import BirthdayForm from "@/components/birthday-form";
import BirthdayList from "@/components/birthday-list";
import Google from "@/components/icons/google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/config/auth";
import { cn } from "@/lib/utils";
import { Cake, Gift, Github, LogOut } from "lucide-react";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className={cn("flex justify-center h-screen w-full", session?.user || "items-center")}>
      <div className="space-y-4 w-full">
        <div className="text-6xl font-extrabold text-center pt-16 md:pt-8">Birthday Reminder</div>
        <div className="text-2xl text-gray-700 text-center">Never miss a special day again!</div>
        {session?.user ? (
          <div className="flex gap-4 container w-full max-w-[1000px] pt-8 max-md:flex-wrap">
            <Card className="w-full md:w-1/2 bg-white/80 h-[600px] rounded-t-3xl md:rounded-l-3xl">
              <CardHeader>
                <CardTitle className="flex gap-4 capitalize items-center">
                  <Gift size={30} /> Add new Birthday
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 max-h-[calc(100%-78px)] overflow-auto">
                <BirthdayForm />
              </CardContent>
            </Card>
            <Card className="bg-white/80 flex flex-col rounded-b-3xl md:rounded-r-3xl overflow-hidden max-h-[600px] w-full md:w-1/2 max-md:mb-8">
              <CardHeader>
                <CardTitle className="flex gap-4 capitalize items-center">
                  <Cake size={30} /> Upcoming birthdays
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 max-h-[calc(100%-78px)] overflow-auto">
                <BirthdayList />
              </CardContent>
            </Card>
            <AuthButton
              action="signout"
              className="absolute top-4 right-4"
              size={"icon"}
              variant={"ghost"}
              title="Logout"
            >
              <LogOut className="!w-6 !h-6" />
            </AuthButton>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center pt-4 gap-4 max-md:flex-wrap">
            <AuthButton provider="github" action="auth" className="text-lg py-6">
              <Github className="!size-6" /> Continue With Github
            </AuthButton>
            <AuthButton provider="google" action="auth" className="text-lg py-6 text-primary" variant={"secondary"}>
              <Google className="!size-6" /> Continue With Google
            </AuthButton>
          </div>
        )}
      </div>
    </div>
  );
}
