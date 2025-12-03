import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-1 bg-white p-6 sm:p-0 dark:bg-gray-900">
      <ThemeProvider>
        <div className="relative flex h-screen w-full flex-col justify-center sm:p-0 lg:flex-row dark:bg-gray-900">
          {children}
          <div className="hidden h-full w-full items-center bg-[#81BF2A] lg:grid lg:w-3/5 dark:bg-white">
            <div className="relative z-1 flex items-center justify-center">
              {/* <!-- ===== Common Grid Shape Start ===== --> */}
              <div className="flex max-w-xl flex-col items-center">
                <Image
                  width={1000}
                  height={600}
                  src="/images/logo/logo-branca.png"
                  alt="Logo"
                  className="block dark:hidden"
                />
                {/* Logo para modo escuro */}
                <Image
                  width={1000}
                  height={600}
                  src="/images/logo/logo-preta.png"
                  alt="Logo"
                  className="hidden dark:block"
                />
              </div>
            </div>
          </div>
          <div className="fixed right-6 bottom-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
