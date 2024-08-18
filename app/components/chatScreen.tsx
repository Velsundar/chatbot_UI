// components/PaperComponent.js
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Paper,
  TextField,
  Box,
  Typography,
  IconButton,
  Divider
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub Flavored Markdown (tables, task lists, etc.)
import rehypeRaw from "rehype-raw"; // To allow rendering raw HTML

type MessageType = "sent" | "received";

interface Message {
  type: MessageType;
  content: string;
}

export default function PaperComponent() {
  const [text, setText] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSend = async () => {
    if (text) {
      const newMessage: Message = { type: "sent", content: text };
      setMessages([...messages, newMessage]); // Add the new sent message
      setText("");

      try {
        const response = await axios.post("http://localhost:8000/api/chat", {
          chatId: "56f0f62b-3969-41d4-80ac-3eb9a723692d",
          prompt: text
        });
        const apiResponse = response.data.text;
        const formattedResponse = formatText(apiResponse);

        // Set typing effect
        setIsTyping(true);
        setTypingMessage("");
        const typingDuration = 5; // Adjust typing speed (ms per character)
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
          setTypingMessage(formattedResponse.slice(0, currentIndex + 1));
          currentIndex++;
          if (currentIndex === formattedResponse.length) {
            clearInterval(typingInterval);
            setIsTyping(false);
            // Add received message after typing effect completes
            const receivedMessage: Message = {
              type: "received",
              content: formattedResponse
            };
            setMessages(prevMessages => [
              ...prevMessages,
              newMessage,
              receivedMessage
            ]);
          }
        }, typingDuration);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent newline from being added
      handleSend();
    }
  };

  const formatText = (text: string) => {
    const formattedText = text.replace(/\\n/g, "\n");
    return formattedText;
  };

  const handleMicClick = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let finalTranscript = "";

    recognition.onstart = () => {
      console.log("Voice recognition started. Speak into the microphone.");
    };

    recognition.onresult = (event: any) => {
      finalTranscript = event.results[0][0].transcript.trim();
    };

    recognition.onerror = (event: any) => {
      console.error("Error occurred in speech recognition: ", event.error);
    };

    recognition.onend = () => {
      console.log("Voice recognition ended.");
      if (finalTranscript) {
        setText(finalTranscript);
        handleSend();
      }
    };

    recognition.start();
  };

  useEffect(
    () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    [messages]
  );

  useEffect(
    () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    [messages]
  );

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        height: "90vh",
        width: "70vw",
        position: "fixed",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography variant="h6" gutterBottom>
        Chat
      </Typography>
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {messages.map((message, index) =>
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                message.type === "sent" ? "flex-end" : "flex-start",
              mb: 1
            }}
          >
            <Box
              sx={{
                maxWidth: "80%",
                padding: 1,
                borderRadius: 1,
                bgcolor: message.type === "sent" ? "primary.main" : "grey.300",
                color: message.type === "sent" ? "white" : "black",
                wordBreak: "break-word", // Ensure text breaks within the box
                overflowWrap: "break-word"
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {message.content}
              </ReactMarkdown>
            </Box>
          </Box>
        )}
        {isTyping &&
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
            <Box
              sx={{
                maxWidth: "60%",
                padding: 1,
                borderRadius: 1,
                bgcolor: "grey.300",
                color: "black"
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {typingMessage}
              </ReactMarkdown>
            </Box>
          </Box>}
        <div ref={chatContainerRef} />
      </Box>
      <Divider />
      <Box
        sx={{
          position: "relative",
          mt: 2,
          display: "flex",
          alignItems: "center"
        }}
      >
        <TextField
          multiline
          rows={1}
          fullWidth
          variant="outlined"
          margin="normal"
          placeholder="Enter text here..."
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Add this line to handle the Enter key
        />
        <IconButton onClick={handleMicClick} sx={{ ml: 1 }}>
          <MicIcon />
        </IconButton>
        <IconButton onClick={handleSend} sx={{ ml: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
