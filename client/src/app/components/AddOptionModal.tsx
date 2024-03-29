import { useRef, useState } from "react";

export default function AddOptionModal({
  isOpen,
  onClose,
  onConfirm,
  suggestedOptions,
}) {
  const [newOption, setNewOption] = useState("");
  const textAreaRef = useRef(null);

  const handleChange = (event: any) => {
    setNewOption(event.target.value);
  };

  const handleConfirm = () => {
    const selectedText = textAreaRef.current.value.substring(
      textAreaRef.current.selectionStart,
      textAreaRef.current.selectionEnd
    );
    if (selectedText) {
      onConfirm(selectedText);
    } else {
      onConfirm(newOption);
    }
    setNewOption("");
    onClose();
  };
  return (
    <div>
      <div onClick={onClose} className="cursor-pointer text-right">
        x
      </div>
      <div className="flex flex-col">
        <textarea
          ref={textAreaRef}
          type="text"
          placeholder="Enter new option"
          defaultValue={suggestedOptions}
          onChange={handleChange}
        />
        <button
          onClick={handleConfirm}
          className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
