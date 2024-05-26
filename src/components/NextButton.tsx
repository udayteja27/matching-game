import React from "react";

function NextButton({
  handleClickNextButton,
  buttonText,
}: {
  handleClickNextButton: () => void;
  buttonText: string;
}) {
  return (
    <div className="button-container">
      <button
        onClick={() => {
          handleClickNextButton();
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default NextButton;
