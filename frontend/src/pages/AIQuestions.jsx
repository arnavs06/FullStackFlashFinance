import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const questions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" }
];

export default function AIQuestions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);

  const checkAnswer = () => {
    if (userAnswer.trim().toLowerCase() === questions[currentIndex].answer.toLowerCase()) {
      setFeedback("Correct!");
    } else {
      setFeedback(`Incorrect. The correct answer is: ${questions[currentIndex].answer}`);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setFeedback("");
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {!completed ? (
        <Card className="w-full max-w-lg p-6 bg-gray-800 rounded-xl shadow-md">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">{questions[currentIndex].question}</h2>
            <Input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer"
              className="mb-4"
            />
            <Button onClick={checkAnswer} className="mr-2">Submit</Button>
            <Button onClick={nextQuestion} disabled={!feedback}>Next</Button>
            {feedback && <p className="mt-4 text-lg">{feedback}</p>}
          </CardContent>
        </Card>
      ) : (
        <h2 className="text-2xl font-bold">You’ve completed the quiz!</h2>
      )}
    </div>
  );
}
