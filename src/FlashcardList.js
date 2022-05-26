import React, { useEffect } from "react";
import Flashcard from "./Flashcard";

// useEffect(() => {
//   const card = document.getElementsByClassName("card");

// }, [{cards}]);
export default function FlashcardList({ cards }) {
  return (
    <>
      <div className="card__grid">
        {cards.map((card) => {
          return <Flashcard card={card} />;
        })}
      </div>
    </>
  );
}
