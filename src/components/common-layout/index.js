/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../navbar";
import MediaRow from "../media-row";
import Banner from "../banner";
export default function CommonLayout({ mediaData }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <header>
        <title>Netflix Clone</title>
        {}
      </header>
      <>
        <Navbar />
        <div className="relative pl-4 pb-24 lg:space-y-24">
          <Banner media={mediaData && mediaData.length ? mediaData[0].medias : []}/>
          <section className="md:space-y-16">
            {mediaData && mediaData.length
              ? mediaData.map((item) => (
                  <MediaRow title={item.title} medias={item.medias} />
                ))
              : null}
          </section>
        </div>
      </>
    </motion.div>
  );
}
