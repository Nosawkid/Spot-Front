import { useState, useRef, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const MakerChat = ({ username = "User1" }) => {
  const [messages, setMessages] = useState([
    { text: "Hello!", sender: "User2" },
    { text: "Hey! How are you?", sender: "User1" },
  ]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: username }]);
    setInput("");
  };

  return (
    <Container className="mt-4">
      <Card className="p-3">
        <h5>Chat</h5>
        <div
          style={{
            height: "300px",
            overflowY: "auto",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded mb-2 ${
                msg.sender === username
                  ? "bg-primary text-white align-self-end"
                  : "bg-light text-dark align-self-start"
              }`}
              style={{ maxWidth: "75%", padding: "8px 12px" }}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
        <Form onSubmit={sendMessage} className="d-flex mt-2">
          <Form.Control
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" variant="primary" className="ms-2">
            Send
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default MakerChat;
