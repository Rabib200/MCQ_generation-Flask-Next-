import { useState } from "react";
import { RxCheck, RxCross2 } from "react-icons/rx";

interface QuestionProps {
  index: number;
  question: string;
  options: string[][];
  correct: string;
  context: string;
  onOptionChange: (index: number, selectedOption: string) => void;
  submittedAnswers: string[] | null;
  isSubmitted: boolean;
}

function shuffleArray(array: string[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function Question({
  index,
  question,
  options,
  correct,
  context,
  onOptionChange,
  submittedAnswers,
  isSubmitted,
}: QuestionProps) {
  const [shuffledOptions, setShuffledOptions] = useState<string[][]>([]);

  // useEffect(() => {
  //   const shuffledOptions = options.map((optionSet) => ({
  //     ...optionSet, // Spread existing properties
  //     options: [...optionSet], // Shuffle inner options
  //   }));
  //   setShuffledOptions(shuffledOptions);
  // }, [options]);

  const showCorrectAnswer =
    isSubmitted && submittedAnswers && submittedAnswers[index] !== correct;

  return (
    <div className="bg-[#F7F4F4] md:w-[75%] flex-1 shadow-lg mx-5 my-10 p-5 rounded-md">
      <p>
        {index + 1}. {question}
      </p>
      <div>
        {options.map((optionSet, optionIndex) => (
          <div key={optionIndex} className="py-2">
            {optionSet.map((option, innerOptionIndex) => (
              <div key={innerOptionIndex} className="flex items-center py-3">
                <input
                  type="radio"
                  name={`question_${index}`}
                  value={option}
                  onChange={() => onOptionChange(index, option)}
                  className="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2"
                  disabled={isSubmitted}
                />
                <div>{option}</div>
                {submittedAnswers && submittedAnswers[index] === option && (
                  <span
                    className={
                      submittedAnswers[index] === option &&
                      submittedAnswers[index] === correct
                        ? "text-green-500 ml-2 text-xl"
                        : "text-red ml-2 text-xl"
                    }
                  >
                    {submittedAnswers[index] === option &&
                    submittedAnswers[index] === correct ? (
                      <RxCheck />
                    ) : (
                      <RxCross2 />
                    )}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
        {showCorrectAnswer && (
          <>
            <p className="text-red-500 mt-2">Correct answer: {correct}</p>
            <p className="rounded-lg p-5 bg-white">{context}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Question;
