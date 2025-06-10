import { ModeToggle } from "@/components/ModeToggle";
import HeaderBar from "./HeaderBar";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

const NavbarDashboard = async () => {
  const { userId } = await auth();
  return (
    <nav className="navbar">
      <div className="flex justify-between items-center px-4 py-1 h-16">
        <HeaderBar />
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
