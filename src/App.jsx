import { useState } from 'react'
import './App.css'
import { FaChevronRight, FaChevronLeft  } from "react-icons/fa";
import { Cards } from './components/Cards';
import Data from './data.json';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null); // add state variable for previous index
  const [showAnswer, setShowAnswer] = useState(false);

  const getNextCard = () => {
    const randomIndex = Math.floor(Math.random() * Data.length)
    setPreviousIndex(currentIndex); // store the current index as the previous index
    setCurrentIndex(randomIndex);
    setShowAnswer(false);
  }

  const getPreviousCard = () => {
    const previousCard = (previousIndex != null) ? previousIndex : currentIndex; // use the previous index if available, otherwise use the current index
    setPreviousIndex(currentIndex); // store the current index as the previous index
    setCurrentIndex(previousCard);
    setShowAnswer(false);
  }

  return (
    <div className="App">
      <h1>Fun Food and Drink Trivia Questions</h1>
      <h2>Test your knowledge of the culinary world with these fun and fascinating food and drink trivia questions.</h2>
      <h2>Number of cards: {Data.length}</h2>

      <Cards cards={Data[currentIndex]} setShowAnswer={setShowAnswer} showAnswer={showAnswer}/>
      <div className='buttons'>
        <button onClick={getPreviousCard}><FaChevronLeft /></button>
        <button onClick={getNextCard}><FaChevronRight /></button>
      </div>
    </div>
  )
}

export default App
