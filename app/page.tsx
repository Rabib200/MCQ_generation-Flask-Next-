"use client";
import { useState } from "react";

export default function Mcq() {
  const [paragraph, setParagraph] = useState("");
  const [selectedWords, setSelectedWords] = useState([]);
  const [enableHighlight, setEnableHighlight] = useState(false);

  const [mcqDataList, setMcqDataList] = useState([]);

  const handleWordSelection = (word: string) => {
    if (enableHighlight && !selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const sentenceWithoutMarks = paragraph
      .split(/\s+/)
      .map((word) => (selectedWords.includes(word) ? `**${word}**` : word))
      .join(" ");

    console.log(sentenceWithoutMarks);
    const sentenceWithMarks = sentenceWithoutMarks
      .split(".")
      .filter((sentence) => sentence.includes("**"));

    try {
      const newMcqDataList = [];
      for (const sentence of sentenceWithMarks) {
        const serverUrl = "http://127.0.0.1:5000";
        const response = await fetch(`${serverUrl}/api/generate_mcq`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ sentence }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate MCQ");
        }

        const data = await response.json();
        newMcqDataList.push(data);
      }

      setMcqDataList(newMcqDataList);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="flex-col justify-center gap-10">
      <form onSubmit={handleSubmit}>
        <label className="gap-10">
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            className="bg-gray-100 
            h-[400px] 
            w-[90%] 
            p-5 
            border-0
            text-black
            rounded-b-lg"
            onSelect={(event) => {
              const selectedText = event.target.value.substring(
                event.target.selectionStart,
                event.target.selectionEnd
              );
              handleWordSelection(selectedText);
            }}
          />
        </label>
        <br />
        <div>Selected Words: {selectedWords.join(", ")}</div>

        <div className="flex text-center justify-end mr-28">
          <button
            className="bg-gray-300 h-[40px] px-5 flex items-center"
            onClick={() => {
              setEnableHighlight(!enableHighlight);
            }}
          >
            {enableHighlight ? "Disable Highlight" : "Enable Highlight"}
          </button>
        </div>
        <button type="submit">Generate MCQ</button>
      </form>

      {mcqDataList.length > 0 && (
        <div className="flex-col justify-center gap-10">
          <h3>Generated MCQ Data:</h3>
          {mcqDataList.map((mcqData) => (
            <div>
              {" "}
              <p>Question: {mcqData.question}</p>
              <p>Answer: {mcqData.answer}</p>
              <p>Meaning: {mcqData.meaning}</p>
              <p>Distractors: {mcqData.distractors.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
