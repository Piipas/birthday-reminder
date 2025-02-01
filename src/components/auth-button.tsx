"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const AuthButton = ({provider, children, className}: {provider: "github" | "google", children: React.ReactNode | React.ReactNode[], className?: string}) => {
  const handleOAuth2 = async () => {
    await authClient.signIn.social({ provider  })
  }
  return (
    <Button onClick={handleOAuth2} className={cn(className)}>
      {children}
    </Button>
  )
}

export default AuthButton