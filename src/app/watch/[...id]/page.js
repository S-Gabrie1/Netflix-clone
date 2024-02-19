"use client";

import CircleLoader from "@/src/components/circle-loader";
import { GlobalContext } from "@/src/context";
import { getTvorMovieTrailersByID } from "@/src/utils";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Watch() {
  const [mediaDetails, setMediaDetails] = useState(null);
  const [key, setKey] = useState(null);

  const { pageLoader, setPageLoader } = useContext(GlobalContext);

  const params = useParams();

  useEffect(() => {
    async function getMediaDetails() {
      const extractMediaDetails = await getTvorMovieTrailersByID(
        params.id[0],
        params.id[1]
      );

      if (extractMediaDetails) {
        const findIndexOfTrailer = extractMediaDetails.results?.findIndex(
          (item) => item.type === "Trailer"
        );

        const findIndexOfClip = extractMediaDetails.results?.findIndex(
          (item) => item.type === "Clip"
        );
        setMediaDetails(extractMediaDetails);
        setKey(
          findIndexOfTrailer !== -1
            ? extractMediaDetails.results[findIndexOfTrailer]?.key
            : findIndexOfClip !== -1
            ? extractMediaDetails.results[findIndexOfClip]?.key
            : ""
        );

        setPageLoader(false);
      }
    
    }

    getMediaDetails();
  }, [params]);

  if (pageLoader && mediaDetails === null) return <CircleLoader />;

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
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${key}`}
        width={"100%"}
        height={"100%"}
        style={{ position: "absolute", top: "0", left: "0" }}
        playing
        controls
      />
    </motion.div>
  );
}
