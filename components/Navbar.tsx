import React from "react";
import Link from "next/link";

const Navbar = () => {

  return (
    <div className="navbar bg-base-100 bg-gray-50 dark:text-black">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">StopWasting</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/alimento">Alimento</Link>
          </li>
          <li>
            <Link href="/armazenamento">Armazenamento</Link>
          </li>
          <li>
            <Link href="/configuracao">Configuracao</Link>
          </li>
          <li>
            <Link href="/">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;