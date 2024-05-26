import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [introSteps, setintroSteps] = useState({
    step: 1,
    totalSteps: 3,
    step1introText: "Welcome Kiddo !",
    step2introText: "Hi , I am Mizo ! and I love bananas",
    step3introText: "Can you help me get some ?",
    step1ButtonText: "START",
    step2ButtonText: "NEXT",
    step3ButtonText: "YES",
  });
  const getCurrStepDetails = () => {
    switch (introSteps.step) {
      case 1:
        return {
          introText: introSteps.step1introText,
          buttonText: introSteps.step1ButtonText,
        };
      case 2:
        return {
          introText: introSteps.step2introText,
          buttonText: introSteps.step2ButtonText,
        };
      case 3:
        return {
          introText: introSteps.step3introText,
          buttonText: introSteps.step3ButtonText,
        };
      default:
        return {
          introText: introSteps.step1introText,
          buttonText: introSteps.step1ButtonText,
        };
    }
  };
  const handleClickBackButton = () => {
    setintroSteps((prev) => {
      return {
        ...prev,
        step: prev.step - 1,
      };
    });
  };
  const handleClickNextButton = () => {
    if (introSteps.step === 3) {
      navigate("/instruction");
    }
    setintroSteps((prev) => {
      return {
        ...prev,
        step: prev.step + 1,
      };
    });
  };
  return (
    <>
      <div className="main-wrapper">
        {introSteps.step !== 1 && (
          <button
            type="button"
            className="button-goback"
            title="Go to back"
            onClick={handleClickBackButton}
          >
            <img src="images/button-back.png" alt="back button" />
          </button>
        )}
        {introSteps.step === 3 && (
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
        )}
        {introSteps.step === 1 && (
          <div className="bubble-box">
            <img className="bubble-img1" src="images/bubble.png" alt="bubble" />
            <span className="bubble-text1">
              {getCurrStepDetails().introText}
            </span>
          </div>
        )}
        {introSteps.step === 2 && (
          <div className="bubble-box">
            <img className="bubble-img1" src="images/bubble.png" alt="bubble" />
            <span className="bubble-text2">
              {getCurrStepDetails().introText}
              <img
                className="tiny-banana"
                src="images/small-banana.png"
                alt=""
              />
            </span>
          </div>
        )}
        {introSteps.step === 3 && (
          <div className="bubble-box">
            <img className="bubble-img1" src="images/bubble.png" alt="bubble" />
            <span className="bubble-text2">
              {getCurrStepDetails().introText}
              <img
                className="tiny-thinkemoji"
                src="images/think-emoji.png"
                alt="think-emoji"
              />
            </span>
          </div>
        )}
        <img className="monkey-avatar" src="images/monkey.png" alt="monkey" />

        <div className="gear-star">
          <img src="images/gear.png" alt="" />
          <img src="images/star.png" alt="" />
          <img
            className="small-ellipse1"
            src="images/small-ellipse.png"
            alt=""
          />
          <img
            className="small-ellipse2"
            src="images/small-ellipse.png"
            alt=""
          />
          <img className="big-ellipse1" src="images/big-ellipse.png" alt="" />
          <img className="big-ellipse2" src="images/big-ellipse.png" alt="" />
        </div>

        {introSteps.step === 1 && (
          <button
            type="button"
            className="button-image"
            onClick={handleClickNextButton}
          >
            <img src="images/button-start.png" alt="start button" />
          </button>
        )}
        {introSteps.step === 2 && (
          <button
            type="button"
            className="button-image"
            onClick={handleClickNextButton}
          >
            <img src="images/button-next.png" alt="next button" />
          </button>
        )}

        {introSteps.step === 3 && (
          <button
            type="button"
            className="button-image"
            onClick={handleClickNextButton}
          >
            <img src="images/button-yes.png" alt="yes button" />
          </button>
        )}
      </div>
    </>
  );
}

export default Home;
