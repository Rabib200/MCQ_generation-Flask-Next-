"use client";
import axios from "axios";
import { useState } from "react";
import MCQ from "../components/MCQ";

export default function Mcq() {
  const [paragraph, setParagraph] = useState("");
  const [selectedWords, setSelectedWords] = useState([]);
  const [enableHighlight, setEnableHighlight] = useState(false);
  const [randomID, setRandomID] = useState("");
  const [mcqDataList, setMcqDataList] = useState([]);

  let generatedIds = new Set();
  function generateUniqueId() {
    let randomId;
    do {
      randomId = Math.floor(Math.random() * 9999) + 1;
    } while (generatedIds.has(randomId));

    generatedIds.add(randomId);
    return randomId;
  }

  const handleWordSelection = (word: string) => {
    if (enableHighlight && !selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
    }
  };
  const handleDeleteWordSelection = () => {
    const updatedSelectedWords = [...selectedWords];
    updatedSelectedWords.pop();
    setSelectedWords(updatedSelectedWords);
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
      let random_ID = generateUniqueId();
      setRandomID(randomID);
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

        try {
          const response = await axios.post("http://localhost:3001/api/mcq", {
            email: "rabibhaque200@gmail.com",
            ques_id: random_ID,
            question: data.question,
            answer: data.answer,
          });
        } catch (error) {
          console.error("Error adding Question:", error);
        }
      }

      setMcqDataList(newMcqDataList);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const selectOption = (index: number, selectedOption: string) => {
    console.log(selectedOption);
  };
  const savedOptions = (additionalOptions: string[] | null) => {
    console.log(additionalOptions);
  };

  const deleteQuestion = (index: number) => {
    const updatedMcqDataList = [...mcqDataList];
    updatedMcqDataList.splice(index, 1);
    setMcqDataList(updatedMcqDataList);
  };

  return (
    <div className="flex-col  gap-10 bg-gray">
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
              justifyContent: "center",
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
          <button type="button" onClick={handleDeleteWordSelection}>
            Delete Latest Highlight
          </button>
        </div>
      </form>

      {mcqDataList.length > 0 && (
        <div className="flex-col justify-center gap-10">
          <h3>Generated MCQ Data:</h3>
          {mcqDataList.map((mcqData, index) => (
            <MCQ
              key={index}
              index={index}
              ques_id={parseInt(randomID)}
              paragraph={paragraph}
              question={mcqData.question}
              options={mcqData.distractors}
              answer={mcqData.answer}
              onDelete={() => deleteQuestion(index)}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center">Confirm</div>
    </div>
  );
}
