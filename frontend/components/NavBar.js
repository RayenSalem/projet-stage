import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const NavBar = () => {
  const router = useRouter();
  const isActive = (r) => {
    if (r === router.pathname) {
      return "active";
    } else {
      return "";
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">Name </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        ></div>
      </div>
    </nav>
  );
};

export default NavBar;
