import Image from "next/image";
import Link from "next/link";
import { navItems } from "./NavItems";

const Footer = () => {
  return (
    <footer className="md:px-16 px-4 py-10 bg-background border-t mt-20">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex items-center">
          <Image
            src="/images/smda.png"
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h3 className="text-2xl">
            <span className="font-semibold text-colprimary">Medoc</span>lyzer
          </h3>
        </div>
        <p className="text-muted-foreground md:w-[500px] text-center">
          Medoclyzer adalah aplikasi berbasis web yang memudahkan Anda memahami
          dokumen medis Anda dengan bahasa yang mudah dimengerti dan beragam
          fitur yang berguna lainnya
        </p>

        <div className="flex items-center gap-5">
          {navItems.map(({ label, href }) => (
            <Link
              href={href}
              key={label}
              className="hover:text-colprimary transition-all duration-300 ease-in"
            >
              {label}
            </Link>
          ))}
        </div>
        <span className="pt-10 text-muted-foreground">
          &copy; {new Date().getFullYear()} Medoclyzer. All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
