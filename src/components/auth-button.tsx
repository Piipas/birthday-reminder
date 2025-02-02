"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const AuthButton = ({
  provider,
  action,
  children,
  className,
}: {
  provider?: "github" | "google";
  action: "auth" | "signout";
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) => {
  const router = useRouter();
  const handleOAuth2 = async () => {
    if (provider) await authClient.signIn.social({ provider });
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <Button
      onClick={action === "auth" ? handleOAuth2 : handleLogout}
      className={cn("text-lg py-6", className)}
      size={"lg"}
    >
      {children}
    </Button>
  );
};

export default AuthButton;
