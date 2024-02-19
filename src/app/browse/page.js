"use client";
import CircleLoader from "@/src/components/circle-loader";
import CommonLayout from "@/src/components/common-layout";
import ManageAccounts from "@/src/components/manage-accounts";
import UnauthPage from "@/src/components/unauth-page";
import { GlobalContext } from "@/src/context";
import {
  getPopularMedias,
  getTopRatedMedias,
  getTrendingMedias,
} from "@/src/utils";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";

export default function Browse() {
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
      const trendingTvShows = await getTrendingMedias("tv");
      const popularTvShows = await getPopularMedias("tv");
      const topratedTvShows = await getTopRatedMedias("tv");

      const trendingMovieShows = await getTrendingMedias("movie");
      const popularMovieShows = await getPopularMedias("movie");
      const topratedMovieShows = await getTopRatedMedias("movie");

      setMediaData([
        ...[
          {
            title: "Trending TV Shows",
            medias: trendingTvShows,
          },
          {
            title: "Popular TV Shows",
            medias: popularTvShows,
          },
          {
            title: "Top rated TV Shows",
            medias: topratedTvShows,
          },
        ].map(item => ({
          ...item,
          medias : item.medias.map(mediaItem => ({
            ...mediaItem,
            type: "tv"
          }))
        })),
        ...[
          {
            title: "Trending Movies",
            medias: trendingMovieShows,
          },
          {
            title: "Popular Movies",
            medias: popularMovieShows,
          },
          {
            title: "Top rated Movies",
            medias: topratedMovieShows,
          },
        ].map(item => ({
          ...item,
          medias : item.medias.map(mediaItem => ({
            ...mediaItem,
            type: "movies"
          }))
        })),
      ]);
      setPageLoader(false)
    }
    getAllMedias()
  }, []);

  if (session === null) return <UnauthPage />;
  if (loggedInAccount === null) return <ManageAccounts />;
  if(pageLoader) return <CircleLoader />

  return (
    <main className="flex min-h-screen flex-col ">
      <CommonLayout mediaData={mediaData} />
    </main>
  );
}
