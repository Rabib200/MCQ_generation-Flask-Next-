import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import AddOptionModal from "./AddOptionModal";

interface MCQProps {
  index: number;
  ques_id: number;
  paragraph: string;
  question: string;
  options: string[];
  answer: string;
  onDelete: (index: number) => void;
}

function MCQ({
  index,
  ques_id,
  paragraph,
  question,
  options,
  answer,
  onDelete,
}: MCQProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [additionalOptions, setAdditionalOptions] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addOption = async (newOption: string) => {
    const updatedOptions = [...additionalOptions, newOption];
    setAdditionalOptions(updatedOptions);
    // console.log(ques_id);

    closeModal();
    if (newOption.trim() !== "") {
      try {
        await axios.put("http://localhost:3001/api/options", {
          options: [newOption],
          ques_id: ques_id,
        });
      } catch (error) {
        console.error("Error updating option:", error);
      }
    } else {
      console.log("No questions available");
    }
  };

  const deleteOption = async () => {
    const updatedOptions = [...additionalOptions];
    updatedOptions.pop();
    setAdditionalOptions(updatedOptions);

    try {
      await axios.delete(`http://localhost:3001/api/options/${ques_id}`);
    } catch (error) {
      console.error("Error Deleting option:", error);
    }
  };

  const handleDelete = (index: number) => {
    onDelete(index);
    // console.log(question);
  };

  useEffect(() => {
    const mergedOptions = [...additionalOptions, answer];
    const shuffled = mergedOptions.sort(() => Math.random() - 0.5);
    const correctIndex = shuffled.indexOf(answer);
    if (correctIndex !== -1 && correctIndex >= 4) {
      const randomIndex = Math.floor(Math.random() * 4);
      const temp = shuffled[randomIndex];
      shuffled[randomIndex] = shuffled[correctIndex];
      shuffled[correctIndex] = temp;
    }
    setShuffledOptions(shuffled);
  }, [additionalOptions, answer]);

  return (
    <div>
      <div className="shadow-2xl w-f[900%] p-5 rounded-md bg-white">
        <h3>
          {index + 1}. {question}
        </h3>
        <div>
          <form className="justify-left w-48 grid grid-cols-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
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
                  value={answer}
                  checked={selectedOption === answer}
                  onChange={handleOptionChange}
                  className="mr-2 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span>{answer.charAt(0).toUpperCase() + answer.slice(1)}</span>
              </label>
            </div>

            {/* Shuffled options */}
            {/* {shuffledOptions.map((option, index) => (
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
          </div> */}
            {/* ))} */}
            {/* Additional options */}

            {additionalOptions.map((option, index) => (
              <div
                key={options.length + index}
                className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
              >
                <div className="flex items-center py-1">
                  <input
                    type="radio"
                    id={`option${options.length + index}`}
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                    className="w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`option${options.length + index}`}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {option}
                  </label>
                </div>
              </div>
            ))}
          </form>
        </div>

        {isModalOpen && (
          <AddOptionModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={addOption}
            suggestedOptions={options}
          />
        )}

        <button
          onClick={openModal}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Option
        </button>
        <button
          onClick={() => deleteOption(selectedOption)}
          className="mt-2 bg-dimgray hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Latest Option
        </button>
        <button
          onClick={() => handleDelete(index)}
          className="mt-2 bg-red hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Question
        </button>
        <p>Selected option: {selectedOption}</p>
        <p>
          Added option serial to be saved in DATABASE:{" "}
          {shuffledOptions.join(", ")}
        </p>
      </div>
    </div>
  );
}

export default MCQ;
