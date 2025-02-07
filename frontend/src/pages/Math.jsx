import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Input, Button, VStack, HStack } from "@chakra-ui/react";
//import Navbar from "../components/Navbar";

const Math = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetch("/data/questions.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error loading questions:", error));
  }, []);

  if (questions.length === 0) {
    return <Text>Loading questions...</Text>;
  }

  const currentQuestion = questions[currentIndex];
  const correctAnswer = currentQuestion.correctAnswer;

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userAnswer) === correctAnswer) {
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect. Please try again.");
    }
  };

  const handleNextQuestion = () => {
    setUserAnswer("");
    setFeedback("");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handlePreviousQuestion = () => {
    setUserAnswer("");
    setFeedback("");
    setCurrentIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
  };

  return (
    <Box>
      
      <Box
        maxW="800px"
        mx="auto"
        p={10}
        borderWidth={2}
        borderColor="rgba(204, 162, 75, 0.3)"
        borderRadius="12px"
        bg="white"
        boxShadow="lg"
        textAlign="left"
        transition="transform 0.3s ease, box-shadow 0.3s ease"
        _hover={{ transform: "translateY(-8px)", boxShadow: "xl" }}
        mt={20} // Adjust this value to increase the space below the navbar
      >
        <Heading as="h2" size="xl" color="rgb(0, 51, 81)" mb={4}>
          {currentQuestion.question}
        </Heading>
        <Text fontSize="lg" color="rgb(60, 60, 60)" lineHeight={1.8} mb={6}>
          {Object.entries(currentQuestion.details).map(([key, value]) => (
            <span key={key}>
              {key}: ${value} <br />
            </span>
          ))}
        </Text>
        <VStack spacing={4} align="stretch">
          <Input
            placeholder="Enter your answer"
            size="lg"
            borderColor="rgba(204, 162, 75)"
            _focus={{ borderColor: "rgb(0, 51, 81)" }}
            value={userAnswer}
            onChange={handleInputChange}
          />
          <Button
            colorScheme="blue"
            variant="outline"
            size="lg"
            transition="all 0.3s ease"
            _hover={{
              bg: "rgb(0, 51, 81)",
              color: "white",
              transform: "scale(1.05)",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </VStack>
        {feedback && (
          <Text fontSize="lg" fontWeight="bold" mt={6} color={feedback === "Correct!" ? "green.500" : "red.500"}>
            {feedback}
          </Text>
        )}
        <HStack spacing={4} mt={6} justifyContent="center">
          <Button
            colorScheme="yellow"
            size="md"
            _hover={{ bg: "rgba(179, 141, 62, 1)" }}
            onClick={() => setUserAnswer("")}
          >
            Reset
          </Button>
          <Button
            colorScheme="blue"
            size="md"
            onClick={handlePreviousQuestion}
            isDisabled={currentIndex === 0}
          >
            Previous
          </Button>
          <Button
            colorScheme="blue"
            size="md"
            onClick={handleNextQuestion}
          >
            Next
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default Math;
