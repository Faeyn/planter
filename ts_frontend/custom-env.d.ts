declare namespace NodeJS {
      interface ProcessEnv {
        BACKEND_URL: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        NEXTAUTH_SECRET: string;
      }
    }
  