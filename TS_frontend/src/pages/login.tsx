import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import type { StaticImageData } from "next/image";
import Image from "next/image";

import navaraLogo from "../assets/navara-logo.svg";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const LoginPage: NextPage = () => (
  <div className="flex h-screen justify-center bg-navaraNavy text-white">
    <Image
      className="absolute pt-12"
      src={navaraLogo as StaticImageData}
      alt="Navara Logo"
    />
    <div className="flex h-full w-[50%] items-center justify-center">
      <div className="z-20 flex max-h-64 w-[420px] flex-col gap-2 rounded-xl bg-white p-[50px] align-middle text-black">
        <h1 className="text-3xl text-navaraNavy">Inloggen</h1>
        <span className="mb-[15px] text-navaraNavy">
          Dit kan met je Navara account.
        </span>
        <GoogleLoginButton
          onClick={() => void signIn("google", { callbackUrl: "/" })}
        />
      </div>
    </div>
  </div>
);

export default LoginPage;
