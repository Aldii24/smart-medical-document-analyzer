import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import { ModeToggle } from "./ModeToggle";
import { auth } from "@clerk/nextjs/server";
import MobileNavbar from "./MobileNavbar";
import { syncUser } from "@/actions/user.action";

const Navbar = async () => {
  const { userId } = await auth();

  if (userId) await syncUser();

  return (
    <nav className="navbar">
      <div className="sub-navbar">
        <div className="flex items-center gap-24">
          <Link href="/#hero" className="flex items-center">
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
          </Link>
          <NavItems />
        </div>
        <div className="lg:flex hidden items-center gap-4 justify-end">
          {userId ? (
            <Link href="/dashboard/medical-report">
              <button className="btn-cta">Dashboard</button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <button className="btn-cta">Sign In</button>
            </Link>
          )}
          <ModeToggle />
        </div>
        <div className="lg:hidden flex items-center gap-4">
          <ModeToggle />
          <MobileNavbar userId={userId} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
