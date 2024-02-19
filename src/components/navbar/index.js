/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

"use client";

import { GlobalContext } from "@/src/context";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Search from "./search";
import AccountPopup from "./account-popup";
import CircleLoader from "../circle-loader";
import DetailsPopp from "../details-popup";

export default function Navbar() {
  const { data: session } = useSession();
  const {
    PageLoader,
    setPageLoader,
    loggedInAccount,
    setAccounts,
    accounts,
    setLoggedInAccount,
    showDetailsPopup,
    setShowDetailsPopup,
  } = useContext(GlobalContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathName = usePathname();

  const menuItems = [
    {
      id: "home",
      title: "Home",
      path: "/browse",
    },
    {
      id: "tv",
      title: "TV",
      path: "/tv",
    },
    {
      id: "movies",
      title: "Movies",
      path: "/movies",
    },
  ];

  async function getAllAccounts() {
    const res = await fetch(
      `/api/account/get-all-accounts?id=${session?.user?.uid}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    if (data && data.data) {
      setAccounts(data.data);
      setPageLoader(false);
    } else {
      setPageLoader(false);
    }
  }

  useEffect(() => {
    getAllAccounts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  if (PageLoader) return <CircleLoader />;

  return (
    <div className="relative">
      <header
        className={`header ${
          isScrolled && "bg-black"
        } hover:bg-black backdrop-brightness-50 shadow-md `}
      >
        <div className="flex items-center space-x-2 md:space-x-10 ">
          <img
            src="https://rb.gy/ulxxee"
            alt="NETFLIX"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
            onClick={() => router.push("/browse")}
          />
          <ul className=" flex pl-4 flex-row gap-4 cursor-pointer">
            {menuItems.map((item) => (
              <li
                onClick={() => {
                  setPageLoader(true);
                  router.push(item.path);
                  setSearchQuery("");
                  setShowSearchBar(false);
                }}
                key={item.id}
                className=" cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="font-light flex items-center space-x-4 text-sm">
          {showSearchBar ? (
            <Search
              pathName={pathName}
              router={router}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPageLoader={setPageLoader}
              setShowSearchBar={setShowSearchBar}
              showSearchBar={showSearchBar}
            />
          ) : (
            <AiOutlineSearch
              onClick={() => setShowSearchBar(true)}
              className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer"
            />
          )}
          <div
            onClick={() => setShowAccountPopup(!showAccountPopup)}
            className="flex gap-2 items-center cursor-pointer"
          >
            <img
              src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
              alt="Current Profile"
              className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
            />
            <p>{loggedInAccount && loggedInAccount.name}</p>
          </div>
        </div>
      </header>
      <DetailsPopp show={showDetailsPopup} setShow={setShowDetailsPopup} />
      {showAccountPopup && (
        <AccountPopup
          accounts={accounts}
          setPageLoader={setPageLoader}
          signOut={signOut}
          loggedInAccount={loggedInAccount}
          setLoggedInAccount={setLoggedInAccount}
        />
      )}
    </div>
  );
}
