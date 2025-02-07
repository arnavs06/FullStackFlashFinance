import React, { useState } from "react";
import { 
  Box, FormControl, FormLabel, Input, Button, Heading, VStack, Text, Divider 
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement authentication logic here
  };

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      bg="gray.200"
      p={16} // Increased outer padding for more space
    >
      <Box 
        bg="white" 
        p={20} // Much larger padding inside the form
        borderRadius="2xl" 
        boxShadow="2xl"
        w={{ base: "95%", sm: "800px", md: "1200px" }} // Increased form width for larger screens
        textAlign="center"
      >
        <Heading size="4xl" color="rgb(0, 51, 81)">
          Welcome Back
        </Heading>
        <Text fontSize="2xl" color="gray.600" mt={6}>
          Please log in to continue
        </Text>
        
        <Divider my={10} />

        <VStack spacing={12} as="form" onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel fontSize="2xl">Email</FormLabel>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              borderColor="gray.300" 
              focusBorderColor="rgb(0, 51, 81)"
              size="lg"
              borderRadius="lg"
              fontSize="xl" // Larger font size for the input
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="2xl">Password</FormLabel>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              borderColor="gray.300" 
              focusBorderColor="rgb(0, 51, 81)"
              size="lg"
              borderRadius="lg"
              fontSize="xl" // Larger font size for the input
            />
          </FormControl>

          <Button 
            type="submit" 
            bg="rgb(0, 51, 81)" 
            color="white" 
            width="full" 
            size="lg"
            borderRadius="lg"
            fontSize="xl" // Larger button text
            _hover={{ bg: "#00509d", transform: "scale(1.05)" }}
            transition="0.3s ease"
            py={8} // Increased button height for a more spacious feel
          >
            Login
          </Button>
        </VStack>

        <Text fontSize="lg" mt={8} color="gray.500">
          Don't have an account? <Text as="span" color="rgb(0, 51, 81)" fontWeight="bold" cursor="pointer">Sign Up</Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
