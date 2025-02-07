import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  Button,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/table";


const FlashcardDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({ category: "", title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/flashcards");
      setFlashcards(response.data);
    } catch (error) {
      toast({ title: "Error fetching flashcards", status: "error", duration: 3000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  const addFlashcard = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFlashcard),
      });
      if (response.ok) {
        toast({ title: "Flashcard added!", status: "success", duration: 3000, isClosable: true });
        fetchFlashcards();
        setNewFlashcard({ category: "", title: "", description: "" });
      }
    } catch (error) {
      toast({ title: "Error adding flashcard", status: "error", duration: 3000, isClosable: true });
    }
  };

  const deleteFlashcard = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/flashcards/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast({ title: "Flashcard deleted!", status: "success", duration: 3000, isClosable: true });
        fetchFlashcards();
      }
    } catch (error) {
      toast({ title: "Error deleting flashcard", status: "error", duration: 3000, isClosable: true });
    }
  };

  return (
    <ChakraProvider>
      <Box p={6} maxW="800px" mx="auto">
        <Box mb={4}>
          <Input placeholder="Category" value={newFlashcard.category} onChange={(e) => setNewFlashcard({ ...newFlashcard, category: e.target.value })} mb={2} />
          <Input placeholder="Title" value={newFlashcard.title} onChange={(e) => setNewFlashcard({ ...newFlashcard, title: e.target.value })} mb={2} />
          <Input placeholder="Description" value={newFlashcard.description} onChange={(e) => setNewFlashcard({ ...newFlashcard, description: e.target.value })} mb={2} />
          <Button colorScheme="blue" onClick={addFlashcard}>Add Flashcard</Button>
        </Box>
        {loading ? (
          <Spinner />
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Category</Th>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {flashcards.map((card) => (
                <Tr key={card.id}>
                  <Td>{card.category}</Td>
                  <Td>{card.title}</Td>
                  <Td>{card.description}</Td>
                  <Td>
                    <Button colorScheme="red" size="sm" onClick={() => deleteFlashcard(card.id)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default FlashcardDashboard;
