import { CiUser } from "react-icons/ci";
import { FaRegCopyright } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IoHomeOutline, IoMailUnread } from "react-icons/io5";
import { MdOutlinePolicy } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";

function Footer() {
  return (
    <div className="flex flex-col relative">
      <ul className="flex px-2 gap-3 justify-center items-center flex-wrap bg-blue-500 py-5">
        <li className="flex gap-1 items-center justify-center text-slate-50">
          <IoHomeOutline />
          Home
        </li>
        <li className="flex gap-1 items-center justify-center text-slate-50">
          <CiUser />
          About
        </li>
        <li className="flex gap-1 items-center justify-center text-slate-50">
          <RiOrganizationChart />
          Sitemap
        </li>
        <li className="flex gap-1 items-center justify-center text-slate-50">
          <IoMailUnread />
          Contact
        </li>
        <li className="flex gap-1 items-center justify-center text-slate-50">
          <HiOutlineDocumentText />
          Disclaimer
        </li>
        <li className="flex gap-1 items-center justify-center text-slate-50">
          <MdOutlinePolicy />
          Privacy & Policy
        </li>
      </ul>
      <div
        className="bg-blue-800 flex justify-between flex-wrap gap-3 text-white py-5 px-3 text-xs sm:text-sm lg:text-base
      "
      >
        <div className="flex h-full gap-2 items-center">
          Copyright
          <FaRegCopyright /> Toserbanet
        </div>
        <div className="flex h-full gap-2 items-center">
          Made with <FiCoffee /> by: Toserbanet
        </div>
      </div>
    </div>
  );
}

export default Footer;
