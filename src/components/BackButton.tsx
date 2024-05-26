import React from "react";

function BackButton({ handleClickBackButton }: { handleClickBackButton: () => void }) {
  return (
    <div className="back-button">
      <button
        type="button"
        className="p-0 m-0"
        onClick={() => {
          handleClickBackButton();
        }}
      >
        <svg className="icon ms-2 me-2 fs-55">
          <use href="#icon_arrow"></use>
        </svg>
      </button>
    </div>
  );
}

export default BackButton;