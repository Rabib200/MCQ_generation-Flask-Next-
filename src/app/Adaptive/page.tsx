"use client";
import { useState } from "react";
import MCQ from "../components/MCQ";

export default function Mcq() {
  const [paragraph, setParagraph] = useState("");
  const [selectedWords, setSelectedWords] = useState([]);
  const [enableHighlight, setEnableHighlight] = useState(false);
  let index = 0;
  const [mcqDataList, setMcqDataList] = useState([]);

  const handleWordSelection = (word: string) => {
    if (enableHighlight && !selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let sentenceWithoutMarks = paragraph;
    selectedWords.forEach((phrase) => {
      const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedPhrase, "g");
      sentenceWithoutMarks = sentenceWithoutMarks.replace(
        regex,
        `**${phrase}**`
      );
    });

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
    <div className="flex-col justify-center gap-10 bg-gray">
      <form onSubmit={handleSubmit}>
        <label className="gap-10">
          <textarea
            name=""
            id=""
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            style={{
              width: "90%",
              height: "400px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              resize: "none",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              color: "#000",
              backgroundColor: "#fff",
            }}
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
        <div>Selected Highlights: {selectedWords.join(", ")}</div>

        <div className="flex justify-center text-center  ">
          <button
            type="button"
            className="bg-gray-300 h-[40px] px-5 flex items-center"
            onClick={() => {
              setEnableHighlight(!enableHighlight);
            }}
          >
            {enableHighlight ? "Disable Highlight" : "Enable Highlight"}
          </button>{" "}
          <button type="submit">Generate MCQ</button>
        </div>
      </form>

      {mcqDataList.length > 0 && (
        <div className="flex-col justify-center gap-10">
          <h3>Generated MCQ Data:</h3>
          {mcqDataList.map((mcqData) => (
            // <div>
            //   {" "}
            //   <p>Question: {mcqData.question}</p>
            //   <p>Answer: {mcqData.answer}</p>
            //   <p>Meaning: {mcqData.meaning}</p>
            //   <p>Distractors: {mcqData.distractors.join(", ")}</p>

            // </div>
            <MCQ
              key={index}
              index={index}
              question={mcqData.question}
              options={mcqData.distractors}
              answer={mcqData.answer}
            />
          ))}
        </div>
      )}
    </div>
  );
}
