"use client";

import ManageAccounts from "@/src/components/manage-accounts";
import { useSession } from "next-auth/react";
import UnauthPage from "@/src/components/unauth-page";
import { GlobalContext } from "@/src/context";
import React, { useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import { getSearchResults } from "@/src/utils";
import { motion } from "framer-motion";
import CircleLoader from "@/src/components/circle-loader";
import Navbar from "@/src/components/navbar";
import MediaItem from "@/src/components/media-item";

export default function Search() {
  const {
    loggedInAccount,
    searchResults,
    pageLoader,
    setSearchResults,
    setPageLoader,
  } = useContext(GlobalContext);
  const { data: session } = useSession();

  const params = useParams();

  useEffect(() => {
    async function getSearch() {
      const tvShows = await getSearchResults("tv", params.query);
      const movies = await getSearchResults("movie", params.query);

      setSearchResults([
        ...tvShows
          .filter(
            (item) => item.backdrop_path !== null && item.poster_path !== null
          )
          .map((tvShowItem) => ({
            ...tvShowItem,
            type: "tv",
            addedToFavorites: false,
          })),
        ...movies
          .filter(
            (item) => item.backdrop_path !== null && item.poster_path !== null
          )
          .map((movieShowItem) => ({
            ...movieShowItem,
            type: "movie",
            addedToFavorites: false,
          })),
      ]);
      setPageLoader(false);
      
    }

    getSearch();
  }, [loggedInAccount]);

  if (session === null) return <UnauthPage />;
  if (loggedInAccount === null) return <ManageAccounts />;
  if (pageLoader) return <CircleLoader />;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Navbar />
      <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
        <h2 className=" cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
          Showing Results for {decodeURI(params.query)}
        </h2>
        <div className=" grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
          {searchResults && searchResults.length
            ? searchResults.map((searchItem) => (
                <MediaItem
                  key={searchItem.id}
                  media={searchItem}
                  searchView={true}
                />
              ))
            : null}
        </div>
      </div>
    </motion.div>
  );
}
