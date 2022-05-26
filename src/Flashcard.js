import React, { useState, useEffect, useRef } from "react";

export default function Flashcard({ card }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");

  const frontEl = useRef();
  const backEl = useRef();
  const abcd = ["A. ", "B. ", "C. ", "D. ", "E. "];

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(setMaxHeight, [card.question, card.answer, card.options]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);
  return (
    <>
      <div
        className={`card ${flip ? "flip" : ""}`}
        onClick={() => setFlip(!flip)}
        style={{ height: height }}
      >
        <div className="card__front" ref={frontEl}>
          {card.question}
          <div className="card__options">
            {card.options.map((option, i) => {
              return (
                <div>
                  {abcd[i]}
                  {option}
                </div>
              );
            })}
          </div>
        </div>
        <div className="card__back" ref={backEl}>
          {abcd[card.correct]}
          {card.answer}
        </div>
      </div>
    </>
  );
}
