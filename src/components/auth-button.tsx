"use client";

import { authClient } from "@/config/auth-client";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface AuthButtonProps extends ButtonProps {
  provider?: "github" | "google";
  action: "auth" | "signout";
}

const AuthButton = ({ provider, action, children, className, ...props }: AuthButtonProps) => {
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
      className={cn("", className)}
      size={"lg"}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AuthButton;
