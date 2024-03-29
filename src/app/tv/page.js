"use client";

import ManageAccounts from "@/src/components/manage-accounts";
import { useSession } from "next-auth/react";
import UnauthPage from "@/src/components/unauth-page";
import { GlobalContext } from "@/src/context";
import React, { useContext, useEffect } from "react";
import CommonLayout from "@/src/components/common-layout";
import { getTVorMoviesByGenre } from "@/src/utils";
import CircleLoader from "@/src/components/circle-loader";

export default function TV() {
  const {
    loggedInAccount,
    mediaData,
    setMediaData,
    setPageLoader,
    pageLoader,
  } = useContext(GlobalContext);
  const { data: session } = useSession();

  useEffect(() => {
    async function getAllMedias() {
      const actionAdventure = await getTVorMoviesByGenre("tv", 10759);
      const crime = await getTVorMoviesByGenre("tv", 80);
      const comedy = await getTVorMoviesByGenre("tv", 35);
      const family = await getTVorMoviesByGenre("tv", 10751);
      const mystery = await getTVorMoviesByGenre("tv", 9648);
      const reality = await getTVorMoviesByGenre("tv", 10764);
      const scifiAndFantasy = await getTVorMoviesByGenre("tv", 10765);
      const war = await getTVorMoviesByGenre("tv", 10768);
      const western = await getTVorMoviesByGenre("tv", 37);
      const dramaMovies = await getTVorMoviesByGenre("tv", 18);

      setMediaData(
        [
          {
            title: "Action and adventure",
            medias: actionAdventure,
          },
          {
            title: "Crime",
            medias: crime,
          },
          {
            title: "Comedy",
            medias: comedy,
          },
          {
            title: "Family",
            medias: family,
          },
          {
            title: "Mystery",
            medias: mystery,
          },
          {
            title: "Reality",
            medias: reality,
          },
          {
            title: "Sci-Fi and Fantasy",
            medias: scifiAndFantasy,
          },
          {
            title: "Western",
            medias: western,
          },
          {
            title: "War",
            medias: war,
          },
          {
            title: "Dramas",
            medias: dramaMovies,
          },
        ].map((item) => ({
          ...item,
          medias: item.medias.map((mediaItem) => ({
            ...mediaItem,
            type: "tv",
            addedToFavorites: false,
          })),
        }))
      );
      setPageLoader(false);
    }

    getAllMedias();
  }, [loggedInAccount]);

  if (session === null) return <UnauthPage />;
  if (loggedInAccount === null) return <ManageAccounts />;
  if (pageLoader) return <CircleLoader />;

  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout mediaData={mediaData} />
    </main>
  );
}
