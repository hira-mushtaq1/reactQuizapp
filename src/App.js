import "./App.css";
import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

function App() {
  const [questionsData, setQuestionsData] = useState([
    {
      question: "Css stands for",
      option: ["Cascading style sheet", "color sheet", "combo sheet"],
      correctAnswer: "Cascading style sheet",
    },
    {
      question: "HTML stands for",
      option: ["HTML", "HyperLink", "HyperLinkMarkupLanguage"],
      correctAnswer: "HyperLinkMarkupLanguage",
    },
    {
      question: "OOP stands for",
      option: [
        "Operation",
        "Object Oriented Programming Language",
        "combo sheet",
      ],
      correctAnswer: "Object Oriented Programming Language",
    },
    {
      question: "PAF stands for",
      option: ["Cascading style sheet", "PAF", "Pakistan Airforce"],
      correctAnswer: "Pakistan Airforce",
    },
    {
      question: "PSL stands for",
      option: ["Pakistan Superleague", "PSL", "Pakistan"],
      correctAnswer: "Pakistan Superleague",
    },
  ]);
  const [indexNumber, setIndexNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [disabled, setdisabled] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(0);

  let checkAnswer = (current, correct) => {
    console.log(current);
    console.log(correct);
    if (current === correct) {
      setScore(score + 1);
      console.log(score);
    }
    setdisabled(true);
  };

  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
        if (minutes === 0) {
          setSeconds(59);
        }
      }
    }, 1000);
    if (minutes === 0 && seconds === 0) {
      clearInterval(timer);
      setShowResult(true);
    }
    return () => clearInterval(timer);
  });

  return (
    <div>
      {showResult ? (
        <Box>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                margin: "20px 0px 20px 0px",
                fontWeight: "bolder",
                textAlign: "center",
              }}
            >
              RESULT:
            </Typography>
            <Typography
              color="primary"
              variant="h3"
              sx={{ margin: "20px 0px 20px 0px" }}
            >
              Your Score: {score}
            </Typography>
            <Typography
              color="primary"
              variant="h3"
              sx={{ margin: "20px 0px 20px 0px" }}
            >
              Percentage: {((score / questionsData.length) * 100).toFixed(2)}%
            </Typography>
            <Typography
              color="primary"
              variant="h3"
              sx={{ margin: "20px 0px 20px 0px" }}
            >
              Attempted Questions: {score}
            </Typography>
            <Typography
              color="error"
              variant="h3"
              sx={{ margin: "20px 0px 20px 0px" }}
            >
              Unattempted Questions / Wrong Answers:
              {questionsData.length - score}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={() => {
                  setIndexNumber(0);
                  setScore(0);
                  setShowResult(false);
                  setMinutes(0);
                  setSeconds(59);
                  clearInterval(timer);
                }}
              >
                Reattempt Quiz
              </Button>
            </Box>
          </Container>
        </Box>
      ) : null}

      {!showResult ? (
        <Container
          sx={{ border: "3px solid lightGrey", padding: "5px" }}
          maxWidth="md"
        >
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="h3"
              sx={{
                display: "inline",
                fontWeight: "bolder",
                color: "red",
              }}
            >
              {minutes}:
            </Typography>
            <Typography
              variant="h3"
              sx={{
                display: "inline",
                fontWeight: "bolder",
                color: "red",
              }}
            >
              {seconds}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
              backgroundColor: "rgb(57, 52, 143)",
              color: "white",
              marginBottom: "40px",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bolder" }}>
              Quiz App
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "rgb(178, 158, 54)" }}
            >
              Question # {indexNumber + 1} / {questionsData.length}
            </Typography>
          </Box>

          <Box
            sx={{
              padding: "20px",
              margin: "10px",
              backgroundColor: "#003566",
              color: "white",
              borderRadius: "10px",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bolder" }}>
              {questionsData[indexNumber].question}
            </Typography>
          </Box>
          <Box>
            {questionsData[indexNumber].option.map((e, i) => (
              <Chip
                key={i}
                sx={{
                  width: "100%",
                  margin: "10px",
                  padding: "30px",
                  fontSize: "22px",
                  cursor: "pointer",
                  color: "white",
                }}
                color="secondary"
                disabled={disabled}
                onClick={() => {
                  checkAnswer(e, questionsData[indexNumber].correctAnswer);
                }}
                label={e}
              />
            ))}
          </Box>
          <Box
            sx={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                if (indexNumber < questionsData.length) {
                  setIndexNumber(indexNumber + 1);
                  setdisabled(false);
                }
                if (indexNumber + 1 == questionsData.length) {
                  setIndexNumber(0);
                  setShowResult(true);
                }
              }}
            >
              Next Question
            </Button>
          </Box>
        </Container>
      ) : null}
    </div>
  );
}

export default App;
