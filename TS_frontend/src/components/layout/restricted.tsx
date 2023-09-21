import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface RestrictedProps {
  children: ReactNode;
}

export const Restricted: React.FC<RestrictedProps> = ({ children }) => {
  const router = useRouter();
  const { data: sessionData } = useSession({
    required: true,
    onUnauthenticated() {
      void router.push("/");
    },
  });

  if (!sessionData) {
    return null;
  }

  return <div>{children}</div>;
};
