import React from "react";
import { useNavigate } from "react-router-dom";

function InstructionScreen() {
  const navigate = useNavigate();
  const handleClickBackButton = () => {
    console.log("clicked back button");
    navigate("/");
  };
  const handleClickNextButton = () => {
    console.log("clicked next button");
    navigate("/activity");
  };
  return (
    <div className="main-wrapper instruction-container">
      <button
        type="button"
        className="button-goback"
        title="Go to back"
        onClick={handleClickBackButton}
      >
        <img src="images/button-back.png" alt="back button" />
      </button>
      <div className="progress-wrapper disabled">
        <div
          className="banana-progress"
          role="progressbar"
          aria-label="Warning striped example"
          aria-valuenow={75}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-bar progress-bar-striped bg-warning"
            style={{ width: "18%" }}
          ></div>
        </div>
        <img
          src="images/medium-banana.png"
          className="banana-endposition"
          alt="banana"
        />
      </div>
      <div className="cards-container" style={{ marginTop: "-20px" }}>
        <img src="images/curve.png" className="image-curve" alt="" />
        <div className="card card-1">
          <div className="card-header">
            <img
              src="images/pink_card.png"
              className="img1"
              width="20"
              alt="mizo"
            />
            <img
              src="images/card_apple.png"
              className="img2"
              width="20"
              alt="mizo"
            />
          </div>
          <div className="card-body">
            <div className="card-number">01</div>
            <h5 className="card-title">
              <strong>
                Select a <br /> pink card.
              </strong>
            </h5>
            <p className="card-text">It has images.</p>
          </div>
        </div>
        <div className="card card-2">
          <div className="card-header">
            <img
              src="images/blue_card.png"
              className="img1"
              width="20"
              alt="mizo"
            />
          </div>
          <div className="card-body">
            <div className="card-number">02</div>
            <h5 className="card-title">
              <strong>
                Select a <br /> blue card.
              </strong>
            </h5>
            <p className="card-text">It has alphabets.</p>
          </div>
        </div>
        <div className="card card-3">
          <div className="card-header">
            <img
              src="images/pink_card.png"
              className="img1"
              width="20"
              alt="mizo"
            />
            <img
              src="images/blue_card.png"
              className="img2"
              width="20"
              alt="mizo"
            />
          </div>
          <div className="card-body">
            <div className="card-number">03</div>
            <p className="card-text">If they’re same</p>
            <h5 className="card-title">
              <strong>Its a match !</strong>
            </h5>
            <p className="card-text">otherwise retry :(</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="button-image mt-2"
        onClick={handleClickNextButton}
      >
        <img src="images/button-play.png" alt="next button" />
      </button>
    </div>
  );
}

export default InstructionScreen;
