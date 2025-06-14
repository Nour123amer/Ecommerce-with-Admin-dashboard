import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const FeedbackContext = createContext();

export function FeedbackContextProvider({ children }) {
  const [reviews, setReviews] = useState([]);
  async function getReviews() {
    let res = await fetch("http://localhost:3001/reviews");
    let data = await res.json();
    setReviews(data);
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <FeedbackContext.Provider value={{ reviews }}>
      {children}
    </FeedbackContext.Provider>
  );
}
