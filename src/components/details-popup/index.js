"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import MuiModal from "@mui/material/Modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { GlobalContext } from "@/src/context";
import ReactPlayer from "react-player";
import { useEffect } from "react";
import { getSimilarMovies, getTvorMovieDetailsByID } from "@/src/utils";
import MediaItem from "../media-item";

export default function DetailsPopp({ show, setShow }) {
  const [key, setKey] = useState("");
  const {
    mediaDetails,
    setMediaDetails,
    similarMedias,
    setSimilarMedias,
    MediaInfoIdAndType,
    loggedInAccount,
    setMediaInfoAndType,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (MediaInfoIdAndType !== null) {
      async function getMediaDetails() {
        const extractMediaDetails = await getTvorMovieDetailsByID(
          MediaInfoIdAndType.type,
          MediaInfoIdAndType.id
        );

        const extractSimilarMovies = await getSimilarMovies(
          MediaInfoIdAndType.type,
          MediaInfoIdAndType.id
        );

        const findIndexOfTrailer =
          extractMediaDetails &&
          extractMediaDetails.videos &&
          extractMediaDetails.videos.results &&
          extractMediaDetails.videos.results.length
            ? extractMediaDetails.videos?.results.findIndex(
                (item) => item.type === "Trailer"
              )
            : -1;

        console.log(extractMediaDetails);
        const findIndexOfClip =
          extractMediaDetails &&
          extractMediaDetails.videos &&
          extractMediaDetails.videos.results &&
          extractMediaDetails.videos.results.length
            ? extractMediaDetails.videos?.results.findIndex(
                (item) => item.type === "Clip"
              )
            : -1;
        setMediaDetails(extractMediaDetails);
        setKey(
          findIndexOfTrailer !== -1
            ? extractMediaDetails.videos?.results[findIndexOfTrailer]?.key
            : findIndexOfClip !== -1
            ? extractMediaDetails.videos?.results[findIndexOfClip]?.key
            : ""
        );
        setSimilarMedias(
          extractSimilarMovies.map((item) => ({
            ...item,
            type: MediaInfoIdAndType.type === "movie" ? "movie" : "tv",
          }))
        );
      }
      getMediaDetails();
    }
  }, [MediaInfoIdAndType, loggedInAccount]);

  function handleClose() {
    setShow(false);
  }

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
      <MuiModal
        open={show}
        onClose={handleClose}
        className="fixed !top-7 left-0 right-0 z-50 w-full mx-auto max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
        <div>
          <button
            className="modalButton flex items-center justify-center absolute top-5 right-5 bg-[#181818] hover:bg-[#181818] !z-40 border-none h-9 w-9"
            onClick={handleClose}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <div className=" relative pt-[56.25%]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${key}`}
              width={"100%"}
              height={"100%"}
              style={{ position: "absolute", top: "0", left: "0" }}
              playing
              controls
            />
          </div>

          <div className=" rounded-b-md bg-[#181818] p-8">
            <h2 className=" mt-10 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
              More Like This
            </h2>
            <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
              {similarMedias && similarMedias.length
                ? similarMedias
                    .filter(
                      (item) =>
                        item.backdrop_path !== null && item.poster_path !== null
                    )
                    .map((mediaItem) => (
                      <MediaItem
                        key={mediaItem.id}
                        media={mediaItem}
                        similarMovieView={true}
                      />
                    ))
                : null}
            </div>
          </div>
        </div>
      </MuiModal>
    </motion.div>
  );
}
