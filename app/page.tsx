"use client";
import { useState } from "react";

// const YourPage = () => {
//   const [word, setWord] = useState("");
//   const [distractors, setDistractors] = useState([]);
//   const [error, setError] = useState("");

//   const handleGetDistractors = async () => {
//     try {
//       const serverUrl = "http://127.0.0.1:5000";
//       const response = await fetch(
//         `${serverUrl}/api/get_distractors?word=${word}`,
//         {
//           method: "GET",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch distractors");
//       }
//       const respClone = response.clone();
//       console.log(respClone.headers);
//       const data = await response.json();
//       setDistractors(data.distractors);
//       setError("");
//     } catch (error: any) {
//       setError(error.message);
//       setDistractors([]);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={word}
//         onChange={(e) => setWord(e.target.value)}
//         placeholder=""
//       />
//       <button onClick={handleGetDistractors}>Get Distractors</button>

//       {error && <p>Error: {error}</p>}

//       {distractors.length > 0 && (
//         <div>
//           <h3>Distractors:</h3>
//           <ul>
//             {distractors.map((distractor, index) => (
//               <li key={index}>{distractor}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YourPage;

export default function Mcq() {
  const [paragraph, setParagraph] = useState("");

  const [mcqDataList, setMcqDataList] = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const sentenceWithMarks = paragraph
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
          Paragraph:
          <textarea
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            className="text-black"
          />
        </label>
        <br />

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
