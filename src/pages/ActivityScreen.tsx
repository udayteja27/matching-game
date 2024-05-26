import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cardsData from "../json/cardsData.json";

interface Card {
  title: string;
  image?: string;
  isFlipped: boolean;
  isMatched: boolean;
  matchWith?: string;
}

function ActivityScreen() {
  const navigate = useNavigate();
  const [leftSideCardsData, setleftSideCardsData] = useState<Card[]>(
    cardsData.leftSideCardsData
  );
  const [rightSideCardsData, setrightSideCardsData] = useState<Card[]>(
    cardsData.rightSideCardsData
  );
  const [popOverActive, setpopOverActive] = useState("");
  const [popOverRestart, setpopOverRestart] = useState("");
  const [leftRightSelected, setleftRightSelected] = useState({
    left: false,
    right: false,
  });
  const [firstTimeleftRightSelected, setfirstTimeleftRightSelected] = useState({
    left: false,
    right: false,
  });
  const [matches, setmatches] = useState(0);
  const [correctMatches, setcorrectMatches] = useState(0);
  const [lastNextButton, setlastNextButton] = useState(false);
  const [selectedMatchedCards, setselectedMatchedCards] = useState<{
    left: Card;
    right: Card;
  }>({
    left: {
      title: "",
      image: "",
      isFlipped: false,
      isMatched: false,
      matchWith: "",
    },
    right: {
      title: "",
      image: "",
      isFlipped: false,
      isMatched: false,
      matchWith: "",
    },
  });
  const [currentBanasEarned, setcurrentBanasEarned] = useState(0);
  console.log(leftSideCardsData, "left side cards");
  console.log(rightSideCardsData, "right side cards");
  const runMatchFn = (rightCard: Card) => {
    let openedLeftCard = leftSideCardsData.find((item) => item?.isFlipped);
    let openedRightCard = rightCard;
    console.log(openedLeftCard, "opened left card");
    console.log(openedRightCard, "opened right card");
    if (openedLeftCard && openedRightCard) {
      if (openedLeftCard.title === openedRightCard?.matchWith) {
        setselectedMatchedCards({
          left: openedLeftCard,
          right: openedRightCard,
        });
        setpopOverActive("active");
        setTimeout(() => {
          setpopOverActive("");
        }, 1500);
        setcorrectMatches((prev) => prev + 1);
        setleftSideCardsData((prev) =>
          prev.map((item) => {
            if (item.title === openedLeftCard?.title) {
              return {
                ...item,
                isMatched: !item.isMatched,
                isFlipped: false,
              };
            } else {
              return item;
            }
          })
        );
        setrightSideCardsData((prev) =>
          prev.map((item) => {
            if (item.title === openedRightCard?.title) {
              return {
                ...item,
                isMatched: !item.isMatched,
                isFlipped: false,
              };
            } else {
              return item;
            }
          })
        );
      } else {
        setleftSideCardsData((prev) =>
          prev.map((item) => {
            if (item.title === openedLeftCard?.title) {
              return {
                ...item,
                isFlipped: false,
                isMatched: false,
              };
            } else {
              return item;
            }
          })
        );
        setrightSideCardsData((prev) =>
          prev.map((item) => {
            if (item.title === openedRightCard?.title) {
              return {
                ...item,
                isFlipped: false,
                isMatched: false,
              };
            } else {
              return item;
            }
          })
        );
      }
      setmatches((prev) => {
        if (prev === 11) {
          if (openedLeftCard?.title !== openedRightCard.matchWith) {
            setpopOverRestart("active");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
          return prev + 1;
        } else {
          return prev + 1;
        }
      });
    }
    setleftRightSelected((prev) => {
      return {
        left: false,
        right: false,
      };
    });
  };
  const handleClick = (card: Card, side: string) => {
    if (matches >= 12) {
      setpopOverRestart("active");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      return;
    }
    console.log(card, "card");
    if (side === "left") {
      setleftSideCardsData((prev) =>
        prev.map((item) => {
          if (item.title === card.title) {
            return {
              ...item,
              isFlipped: !item.isFlipped,
            };
          } else {
            return item;
          }
        })
      );
    } else {
      setrightSideCardsData((prev) =>
        prev.map((item) => {
          if (item.title === card.title) {
            return {
              ...item,
              isFlipped: !item.isFlipped,
            };
          } else {
            return item;
          }
        })
      );
      setTimeout(() => {
        runMatchFn(card);
      }, 800);
    }
  };
  const handleClickBackButton = () => {
    console.log("clicked back button");
    navigate("/instruction");
  };
  const handleClickNextButton = () => {
    setlastNextButton(true);
  };
  const shuffleCards = (data: Card[]) => {
    let cards = data.slice(); // Create a shallow copy of the array
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const shuffleCardsTotal = () => {
    setleftSideCardsData((prev: Card[]) => shuffleCards([...prev]));
    setrightSideCardsData((prev: Card[]) => shuffleCards([...prev]));
  };
  const checkAllMatched = () => {
    let leftSideCards = leftSideCardsData.filter(
      (item) => item.isMatched === false
    );
    let rightSideCards = rightSideCardsData.filter(
      (item) => item.isMatched === false
    );
    if (leftSideCards.length === 0 && rightSideCards.length === 0) {
      return true;
    } else {
      return false;
    }
  };
  const calCulateScores = () => {
    let highScoreString = localStorage.getItem("highScore");
    let highScore: number;

    if (highScoreString) {
      highScore = parseInt(highScoreString) || 0;
      if (matches < highScore) {
        localStorage.setItem("highScore", matches.toString());
      }
    } else {
      localStorage.setItem("highScore", matches.toString());
    }

    // bananas Earned
    // Bananas Earned this match
    let bananasEarnedInThisMatch = 0;
    if (matches === 10) {
      bananasEarnedInThisMatch = 10;
    } else if (matches > 10 && matches <= 12) {
      bananasEarnedInThisMatch = 5;
    } else {
      bananasEarnedInThisMatch = 0;
    }
    setcurrentBanasEarned(bananasEarnedInThisMatch);
    let bananasEarnedString = localStorage.getItem("bananasEarned");
    let bananasEarned: number;

    if (bananasEarnedString) {
      bananasEarned = parseInt(bananasEarnedString) || 0;
      localStorage.setItem(
        "bananasEarned",
        (bananasEarned + bananasEarnedInThisMatch).toString()
      );
    } else {
      localStorage.setItem(
        "bananasEarned",
        bananasEarnedInThisMatch.toString()
      );
    }
  };
  useEffect(() => {
    shuffleCardsTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (correctMatches === 6) {
      calCulateScores();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correctMatches]);

  return (
    <div className="main-wrapper activity-container">
      <div className="progress-wrapper">
        <div
          className="banana-progress"
          role="progressbar"
          aria-label="Warning striped example"
          aria-valuenow={parseInt(`${(correctMatches / 6) * 100}`)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-bar progress-bar-striped bg-warning"
            style={{ width: `${(correctMatches / 6) * 100}%` }}
          ></div>
        </div>
        <img
          src="images/medium-banana.png"
          className="banana-endposition"
          alt="banana"
        />
      </div>
      {!firstTimeleftRightSelected.left && !leftRightSelected.left && (
        <div className="left-spin">
          <div className="d-flex justify-content-between">
            <div>
              <img src="images/left_spin.png" alt="" />
            </div>
            <div>
              <img src="images/left_spin_card.png" alt="" />
              <span className="left_spin_text">Select a Pink Card.</span>
            </div>
          </div>
        </div>
      )}
      {/* <BackButton handleClickBackButton={handleClickBackButton} /> */}
      <button
        type="button"
        className="button-goback"
        title="Go to back"
        onClick={handleClickBackButton}
      >
        <img src="images/button-back.png" alt="back button" />
      </button>
      <div className="matches-container">
        <div>
          <div>Matches : {matches}</div>
          <div>
            Best Score :{" "}
            {localStorage.getItem("highScore") ? (
              <>{localStorage.getItem("highScore")} Matches</>
            ) : (
              "0"
            )}
          </div>
        </div>
        <div>
          Bananas Earned :{" "}
          {localStorage.getItem("bananasEarned") ? (
            <>{localStorage.getItem("bananasEarned")} Bananas</>
          ) : (
            "0"
          )}
        </div>
      </div>
      <div className="activity-cards">
        <div className="activity-cards-left">
          {leftSideCardsData.map((card, index) => (
            <div
              className={`activity-card ${card?.isFlipped && "isFlipped"}`}
              style={{
                opacity: card?.isMatched ? "0" : "1",
                pointerEvents: card?.isMatched ? "none" : "auto",
              }}
              onClick={() => {
                if (!firstTimeleftRightSelected.left) {
                  setfirstTimeleftRightSelected((prev) => ({
                    ...prev,
                    left: true,
                  }));
                }
                if (leftRightSelected.left) {
                  return;
                }
                setleftRightSelected((prev) => ({
                  ...prev,
                  left: true,
                }));
                handleClick(card, "left");
              }}
            >
              <div className="activity-card-pink-inner">
                {!card?.isFlipped ? (
                  <div className="heart heart-pink"></div>
                ) : (
                  <div style={{ transform: "rotateY(180deg)" }}>
                    <img
                      className="activity-card-image"
                      src={card?.image}
                      alt="card"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="activity-cards-right">
          {rightSideCardsData.map((card, index) => (
            <div
              className={`activity-card ${card?.isFlipped && "isFlipped"}`}
              style={{
                opacity: card?.isMatched ? "0" : "1",
                pointerEvents: card?.isMatched ? "none" : "auto",
              }}
              onClick={() => {
                if (!firstTimeleftRightSelected.right) {
                  setfirstTimeleftRightSelected((prev) => ({
                    ...prev,
                    right: true,
                  }));
                }
                if (!leftRightSelected.left) {
                  return;
                }
                if (leftRightSelected.right) {
                  return;
                }
                setleftRightSelected((prev) => ({
                  ...prev,
                  right: true,
                }));
                handleClick(card, "right");
              }}
            >
              <div className="activity-card-blue-inner">
                {!card?.isFlipped ? (
                  <div className="heart heart-blue"></div>
                ) : (
                  <div style={{ transform: "rotateY(180deg)" }}>
                    <h1 className="activity-card-title">{card?.title}</h1>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {!firstTimeleftRightSelected.right &&
        leftRightSelected.left &&
        !leftRightSelected.right && (
          <div className="right-spin">
            <div className="d-flex gap-0">
              <div>
                <span className="right_spin_text">
                  Now Select a<br /> Blue Card.
                </span>
                <img src="images/right_spin_card.png" alt="" />
              </div>
              <div>
                <img src="images/right_spin.png" alt="" />
              </div>
            </div>
          </div>
        )}
      {/* <div className="match-rules">
        Maximum of 12 tries allowed.
        <br />
        Finish the game in 10 matches: Earn 10 bananas.
        <br /> Finish in 10 to 12 matches: Earn 5 bananas.
      </div>*/}

      <div
        className={`popup-match ${
          (popOverActive === "active" || correctMatches === 6) && "active"
        }`}
      >
        <div className="pop-wrapper">
          {!lastNextButton && (
            <div className="popup-inner">
              <h6>It's a match !</h6>
              <div
                className={`activity-card isFlipped image-match1 postion-relative`}
              >
                <div
                  className="activity-card-pink-inner"
                  style={{
                    position: "absolute",
                    width: "89%",
                    top: "2px",
                  }}
                >
                  <div>
                    <img
                      className="activity-card-image"
                      src={selectedMatchedCards?.left?.image}
                      alt="card"
                    />
                  </div>
                </div>
              </div>
              <div className={`activity-card isFlipped image-match2`}>
                <div
                  className="activity-card-blue-inner pt-2"
                  style={{
                    position: "absolute",
                    width: "89%",
                    top: "2px",
                  }}
                >
                  <div>
                    <h1 className="activity-card-title">
                      {selectedMatchedCards?.right?.title}
                    </h1>
                  </div>
                </div>
              </div>
              {checkAllMatched() && (
                <button
                  type="button"
                  className="button-image"
                  onClick={handleClickNextButton}
                  style={{
                    position: "absolute",
                    bottom: "-50px",
                    right: "-500px",
                  }}
                >
                  <img src="images/button-next.png" alt="next button" />
                </button>
              )}
            </div>
          )}
          {lastNextButton && (
            <div className="popup-inner popup-inner-final-box">
              <img
                className="final-banana banana-1"
                src="images/banana1.png"
                alt=""
              />
              <img
                className="final-banana banana-2"
                src="images/banana1.png"
                alt=""
              />
              <div>
                <div className="ribbon">
                  <div className="final-box-text">Earned</div>
                  <div className="final-box-text-bananas">
                    {currentBanasEarned} Banana's
                  </div>
                </div>
                <div className="">
                  <img src="images/monkey_final.png" alt="" />
                </div>
                <div className="final-box-button">
                  {/* <button
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    YAY, OK!
                  </button> */}
                  <button
                    type="button"
                    className="button-image"
                    onClick={() => {
                      window.location.reload();
                    }}
                    style={
                      {
                        //   position: "absolute",
                        //   bottom: "-50px",
                        //   right: "-500px",
                      }
                    }
                  >
                    <img src="images/button-play.png" alt="next button" />
                  </button>
                </div>
              </div>
              <img
                className="final-banana banana-3"
                src="images/banana1.png"
                alt=""
              />
              <img
                className="final-banana banana-4"
                src="images/banana1.png"
                alt=""
              />
              <img
                className="final-banana banana-5"
                src="images/banana1.png"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      <div className={`popup-match ${popOverRestart === "active" && "active"}`}>
        <div className="pop-wrapper">
          <div
            className="popup-inner"
            style={{
              position: "absolute",
              left: "32%",
              top: "35%",
            }}
          >
            <div>
              <h6>Game Over!</h6>
            </div>
            <div className="final-box-button-reset"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityScreen;
