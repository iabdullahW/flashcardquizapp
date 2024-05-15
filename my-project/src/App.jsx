
import  { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&type=boolean');
        setFlashcards(response.data.results);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const handleNextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="bg-gray-500 min-h-screen flex items-center justify-center">
    <h1></h1>
      <div className="bg-white rounded-lg overflow-hidden shadow-md w-96">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Flashcard Quiz</h1>
          <div className="mb-8">
            <p className="text-lg mb-2">{flashcards.length > 0 && flashcards[currentCard].question}</p>
            {showAnswer && (
              <p className="text-lg font-semibold text-green-500">{flashcards.length > 0 && flashcards[currentCard].correct_answer}</p>
            )}
          </div>
          <div className="flex justify-between">
            <button onClick={handlePrevCard} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none">Previous</button>
            <button onClick={handleShowAnswer} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg focus:outline-none">Show Answer</button>
            <button onClick={handleNextCard} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
