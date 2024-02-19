"use client";

import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import CircleLoader from "../components/circle-loader";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [mediaData, setMediaData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [MediaInfoIdAndType, setMediaInfoAndType] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [mediaDetails, setMediaDetails] = useState(null);
  const [similarMedias, setSimilarMedias] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    setLoggedInAccount(JSON.parse(sessionStorage.getItem("loggedInAccount")));
  }, []);

  if (session === undefined) {
    return <CircleLoader />;
  }

  return (
    <GlobalContext.Provider
      value={{
        mediaData,
        setMediaData,
        pageLoader,
        setPageLoader,
        loggedInAccount,
        setLoggedInAccount,
        accounts,
        setAccounts,
        searchResults,
        setSearchResults,
        MediaInfoIdAndType,
        setMediaInfoAndType,
        showDetailsPopup,
        setShowDetailsPopup,
        mediaDetails,
        setMediaDetails,
        similarMedias,
        setSimilarMedias,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
