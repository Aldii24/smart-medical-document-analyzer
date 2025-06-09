import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 bg-colprimary p-10">
        <h1 className="text-3xl font-bold text-white">Welcome to Medoclyzer</h1>
        <p className="text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          quaerat atque quia. Quos, placeat.
        </p>
      </div>
      <div className="w-1/2 flex justify-center items-center">{children}</div>
    </div>
  );
};

export default AuthLayout;
