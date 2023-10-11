import { useState } from 'react'
import './App.css'
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Cards } from './components/Cards';
import Data from './Data.json';
import { compareTwoStrings } from 'string-similarity';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [previousIndex, setPreviousIndex] = useState(null); // add state variable for previous index
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [input, setInput] = useState('');
  const [correctAns, setCorrectAns] = useState('');
  const [shuffleData, setShuffleData] = useState(Data);
  const [masterData, setMasterData] = useState([]);

  const getNextCard = () => {
    // const randomIndex = Math.floor(Math.random() * Data.length)
    // setPreviousIndex(currentIndex); // store the current index as the previous index
    setCurrentIndex(currentIndex < shuffleData.length - 1 ? currentIndex + 1 : 0);
    setInput('');
    setShowAnswer(false);
  }

  const getPreviousCard = () => {
    // const previousCard = (previousIndex != null) ? previousIndex : currentIndex; // use the previous index if available, otherwise use the current index
    // setPreviousIndex(currentIndex - 1); // store the current index as the previous index
    setCurrentIndex(currentIndex - 1);
    setInput('');
    setShowAnswer(false);
  }

  const checkAnswer = (e) => {
    e.preventDefault();
    const similarityThreshold = 0.8; // set a threshold for similarity
    const similarity = compareTwoStrings(input.toLowerCase(), shuffleData[currentIndex].answers[0].toLowerCase());

    if (similarity >= similarityThreshold) {
      setCurrentStreak(currentStreak + 1);
      setCorrectAns('correct');
    } else {
      setCurrentStreak(0);
      setCorrectAns('incorrect');
      setLongestStreak((prevState) => {
        if (currentStreak > prevState) {
          return currentStreak;
        }
        else {
          return prevState;
        }
      });
    }
  }

  const shuffleCards = () => {
    const shuffleData = Data.sort(() => Math.random() - 0.5);
    setShuffleData(shuffleData);
  }

  const markCard = () => {
    const card = shuffleData[currentIndex];
    setMasterData([...masterData, card]); // add the card to the master data
    const newData = shuffleData.filter((item) => item !== card); // remove the card from the data
    setShuffleData(newData);
    setCurrentIndex(0);
    setInput('');
  }

  return (
    <div className="App">
      <h1>Fun Food and Drink Trivia Questions</h1>
      <h2>Test your knowledge of the culinary world with these fun and fascinating food and drink trivia questions.</h2>
      <h3>Number of cards: {shuffleData.length}</h3>

      <h4>Current Streak: {currentStreak}</h4>
      <h4>Longest Streak: {longestStreak}</h4>

      <Cards cards={shuffleData[currentIndex]} setShowAnswer={setShowAnswer} showAnswer={showAnswer} />
      <form>
        <label>Give the answer here</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          name='input'
          id={correctAns}
        />
        <button onClick={checkAnswer}>Submit</button>
      </form>
      <div className='buttons-container'>
        <button onClick={getPreviousCard} disabled={currentIndex === 0 ? true : false}><FaChevronLeft /></button>
        <button onClick={getNextCard}><FaChevronRight /></button>
        <button onClick={shuffleCards}>Shuffle Cards</button>
        <button onClick={markCard} title="Mastered it? Remove it from the pool">Mark Card</button>
      </div>
    </div>
  )
}

export default App
