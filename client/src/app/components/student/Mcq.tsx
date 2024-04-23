"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Question from "./Questions";

interface QuestionProps {
  question: string;
  answer: string;
  context: string;
  ques_id: number;
  options: string[][];
}

export default function Mcq() {
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const email = "rabibhaque200@gmail.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionRes = await axios.get(
          `http://localhost:3001/api/mcq/${email}`
        );

        if (questionRes.status !== 200) {
          throw new Error("Failed to fetch Data");
        }

        const questionsData = questionRes.data.map((question: any) => ({
          ...question,
          options: question.options.map((opt: any) => opt.options),
        }));
        console.log(questionsData);

        setQuestions(questionsData);
        setAnswers(new Array(questionsData.length).fill(""));
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOptionChange = (index: number, selectedOption: string) => {
    if (!isSubmitted) {
      const newAnswers = [...answers];
      newAnswers[index] = selectedOption;
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col md:flex-row bg-pink-100 bg-opacity-20 px-5 min-h-[100vh]">
      <div className="flex-1">
        <div className="flex justify-center">
          <button>Show Questions</button>
        </div>
        <form action="" className="flex-1">
          {questions.map((question, index) => (
            <Question
              key={index}
              index={index}
              question={question.question}
              options={question.options}
              correct={question.answer}
              context={question.context}
              onOptionChange={handleOptionChange}
              submittedAnswers={isSubmitted ? answers : []}
              isSubmitted={isSubmitted}
            />
          ))}
        </form>
        <div className="flex justify-center m-5 md:w-[75%]">
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className={` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded text-lg ${
              isSubmitted ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
