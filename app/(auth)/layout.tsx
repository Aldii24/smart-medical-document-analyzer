import Image from "next/image";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex">
      <div className="xl:w-1/2 md:flex flex-col hidden bg-background border-r border-colprimary p-10 gap-5 rounded-r-xl">
        <h1 className="text-3xl font-bold text-foreground">
          Selamat Datang di <span className="text-colprimary">Medoc</span>lyzer
        </h1>
        <p className="text-foreground">
          Medoclyzer adalah aplikasi berbasis web yang memudahkan Anda memahami
          dokumen medis Anda dengan bahasa yang mudah dimengerti dan beragam
          fitur yang berguna lainnya
        </p>
        <Image
          src="/images/authbg.png"
          alt="authbg"
          width={500}
          height={500}
          className="w-[500px]"
        />
      </div>
      <div className="xl:w-1/2 w-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
