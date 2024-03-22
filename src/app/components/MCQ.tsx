import { ChangeEvent, useEffect, useState } from "react";

interface MCQProps {
  index: number;
  question: string;
  options: string[];
  answer: string;
}

function MCQ({ index, question, options, answer }: MCQProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const mergedOptions = [...options, answer];
    const shuffled = mergedOptions.sort(() => Math.random() - 0.5);
    const correctIndex = shuffled.indexOf(answer);
    if (correctIndex !== -1 && correctIndex >= 4) {
      const randomIndex = Math.floor(Math.random() * 4);
      const temp = shuffled[randomIndex];
      shuffled[randomIndex] = shuffled[correctIndex];
      shuffled[correctIndex] = temp;
    }
    setShuffledOptions(shuffled);
  }, [options, answer]);

  return (
    <div className="shadow-2xl w-f[900%] p-5 rounded-md bg-white">
      <h3>
        {index + 1}. {question}
      </h3>
      <form className="w-48 grid grid-cols-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {shuffledOptions.map((option, index) => (
          <div
            key={index}
            className="border-b border-gray-200 dark:border-gray-600"
          >
            <label
              htmlFor={`option${index}`}
              className="flex items-center py-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <input
                type="radio"
                id={`option${index}`}
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                className="mr-2 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
            </label>
          </div>
        ))}
      </form>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
}

export default MCQ;
