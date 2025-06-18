import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import { navItems } from "./NavItems";
import Link from "next/link";



const MobileNavbar = ({ userId }: { userId: string | null }) => {
  return (
    <div className="lg:hidden block">
      <Sheet>
        <SheetTrigger>
          <Menu className="cursor-pointer mt-2" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="hidden">Menu</SheetTitle>
            <div className="flex items-center gap-2">
              <Image
                src="/images/smda.png"
                alt="logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h3 className="text-2xl">
                <span className="font-semibold text-colprimary">Medoc</span>
                lyzer
              </h3>
            </div>
          </SheetHeader>
          <div className="flex flex-col gap-4 p-4">
            {navItems.map(({ label, href }) => (
              <Link
                href={href}
                key={label}
                className="border px-6 py-3 rounded-full"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="w-full px-4">
            {userId ? (
              <Link href="/dashboard/medical-report">
                <button className="px-6 py-3 rounded-full bg-colprimary cursor-pointer w-full">
                  Dashboard
                </button>
              </Link>
            ) : (
              <Link href="/sign-in">
                <button className="px-6 py-3 w-full rounded-full bg-colprimary cursor-pointer text-white">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
