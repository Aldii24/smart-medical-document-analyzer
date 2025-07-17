import Link from "next/link";

export const navItems = [
  {
    label: "Fitur",
    href: "/#fitur",
  },
  {
    label: "Faq",
    href: "/#faq",
  },
];

const NavItems = () => {
  return (
    <nav className="lg:flex hidden items-center gap-8">
      {navItems.map(({ label, href }) => (
        <Link href={href} key={label}>
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
