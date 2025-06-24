import Image from "next/image";
import logo from "../../public/logo.svg";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav>
      <div className="flex items-center justify-between p-4  text-white">
        <div>
          <Image src={logo} width={100} height={100} alt="Logo This Site" />
        </div>
        <div className="flex items-center space-x-4 ">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
