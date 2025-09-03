"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import Button from "./Button";
import { useState, useEffect, useCallback } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

// Type-safe debounce utility
const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Scroll hide/show navbar
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={`flex items-center justify-between w-full py-4 px-8 fixed top-0 z-50 bg-black transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <Link href="/">
        <Image
          src="/images/HarleyGrow.png"
          alt="HarleyGrow Logo"
          className="logo"
          width={100}
          height={50}
          priority
        />
      </Link>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="focus:outline-none"
          aria-expanded={isOpen ? "true" : "false"}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <FontAwesomeIcon icon={faBars} size="lg" className="text-white" />
        </button>
      </div>

      {/* Navigation links */}
      <ul
        id="mobile-menu"
        className={`lg:flex lg:flex-row absolute lg:static bg-black lg:bg-transparent transition-transform duration-300 ease-in-out lg:gap-8 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } lg:translate-y-0 top-16 left-0 w-full lg:w-auto`}
      >
        {NAV_LINKS.map((link) => (
          <li
            key={link.href}
            className="w-full lg:w-auto text-center lg:text-left"
          >
            <Link
              href={link.href}
              className="text-white hover:text-gray-500 transition-colors py-2 px-4 block"
            >
              {link.label}
            </Link>
          </li>
        ))}

        {/* Dashboard for logged-in users */}
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

      {/* Auth button (desktop only) */}
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
