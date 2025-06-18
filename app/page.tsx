"use client";
import {  UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("https://magnetic-parakeet-2.accounts.dev");
    }
  }, [isLoaded, isSignedIn]);

  return (
    <>
    <UserButton/>
    </>
  );
}
