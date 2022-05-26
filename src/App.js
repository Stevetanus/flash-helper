import React, { useState, useEffect, useRef } from "react";
import FlashcardList from "./FlashcardList";
import "./stylesheets/app.css";
import axios from "axios";
const CARDDATA = [
  {
    id: 1,
    question: "What is 1 + 1?",
    answer: 2,
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "What is 4 + 5?",
    answer: 2,
    options: ["2", "3", "4", "5"],
  },
  {
    id: 1,
    question: "What is 1 + 1?",
    answer: 2,
    options: ["2", "3", "4", "5"],
  },
];

function App() {
  const [cards, setCards] = useState(CARDDATA);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/tests/${categoryEl.current.value}`, {
        // params: {
        //   category: categoryEl.current.value,
        // },
      })
      .then((res) => {
        setCards(
          res.data.map((data, index) => {
            const answer = data.answer;
            const options = [...data.incorrect_answers, answer];
            return {
              id: data._id,
              question: data.question,
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
              correct: options.indexOf(answer),
            };
          })
        );
      });
  }

  useEffect(() => {
    axios.get("http://localhost:5000/tests/category").then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/tests").then((res) => {
      setCards(
        res.data.map((data, index) => {
          const answer = data.answer;
          const options = [...data.incorrect_answers, answer];
          return {
            id: data._id,
            question: data.question,
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
            correct: options.indexOf(answer),
          };
        })
      );
    });
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="header">
          <div className="logo">
            <h1>Flashquiiz</h1>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="search">
              <label htmlFor="category">題型</label>
              <select name="category" id="category" ref={categoryEl}>
                {categories.map((category) => {
                  return (
                    <option value={category._id} key={category._id}>
                      {category._id}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="submit">
              <button className="btn">Generate</button>
            </div>
          </form>
        </div>
        <FlashcardList cards={cards} />
      </div>
    </>
  );
}

export default App;
