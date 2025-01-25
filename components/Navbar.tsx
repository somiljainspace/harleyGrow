"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    const debounceScroll = () => {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          handleScroll();
        }, 100);
      };
    };

    const debouncedHandleScroll = debounceScroll();
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`flex items-center justify-between w-full py-4 px-8 fixed top-0 z-50 bg-black transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Link href="/">
        <Image
          src="/images/HarleyGrow.png"
          alt="HarleyGrow Logo"
          className="logo"
          width={100}
          height={50}
          priority={false}
        />
      </Link>

      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="focus:outline-none"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      <ul
        id="mobile-menu"
        className={`lg:flex lg:flex-row absolute lg:static bg-black lg:bg-transparent transition-transform duration-300 ease-in-out lg:gap-8 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } lg:translate-y-0 top-16 left-0 w-full lg:w-auto`}
      >
        {NAV_LINKS.map((link) => (
          <li key={link.key} className="w-full lg:w-auto text-center lg:text-left">
            <Link
              href={link.href}
              className="text-white hover:text-gray-500 transition-colors py-2 px-4 block"
            >
              {link.label}
            </Link>
          </li>
        ))}
        {session && (
          <li className="w-full lg:w-auto text-center lg:text-left">
            <Link
              href="/dashboard"
              className="text-white hover:text-gray-500 transition-colors py-2 px-4 block"
            >
              Dashboard
            </Link>
          </li>
        )}
      </ul>

      <div className="hidden lg:flex lg:items-center">
        {session ? (
          <Button
            type="button"
            title="Logout"
            variant="button-primary"
            icon="/user.svg"
            onClick={() => signOut()}
          />
        ) : (
          <Button
            type="button"
            title="Login"
            variant="button-primary"
            icon="/user.svg"
            onClick={() => signIn()}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
