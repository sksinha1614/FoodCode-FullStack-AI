import { useEffect, useRef, useState } from "react";
import { askFoodCodeAI } from "../../service/aiService";
import "./AskAI.css";

const starterQuestions = [
  "What vegetarian options do you recommend?",
  "Which dishes are good for a quick lunch?",
  "Tell me about the most popular items on the menu.",
];

const AskAI = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I am the FoodCode assistant. Ask me about our menu and I will help you choose.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const question = message.trim();
    if (!question || loading) return;

    setMessages((current) => [...current, { role: "user", text: question }]);
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const answer = await askFoodCodeAI(question);
      setMessages((current) => [...current, { role: "assistant", text: answer }]);
    } catch (requestError) {
      const responseData = requestError.response?.data;
      const responseMessage = typeof responseData === "string"
        ? responseData
        : responseData?.detail ||
          responseData?.message ||
          responseData?.error ||
          responseData?.title;
      setError(
        responseMessage ||
          "The assistant is unavailable right now. Please try again in a moment.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStarterQuestion = (question) => {
    setMessage(question);
  };

  return (
    <aside className={`ask-ai-widget ${open ? "is-open" : ""}`}>
      {open && (
        <section className="ask-ai-panel" aria-label="BiteBuddy food assistant">
          <header className="ask-ai-header">
            <div className="ask-ai-brand">
              <span className="ask-ai-brand-icon"><i className="bi bi-stars" /></span>
              <div>
                <strong>BiteBuddy</strong>
                <small>FoodCode assistant</small>
              </div>
            </div>
            <button
              aria-label="Close BiteBuddy"
              className="ask-ai-close"
              onClick={() => setOpen(false)}
              type="button"
            >
              <i className="bi bi-x-lg" />
            </button>
          </header>

          <div className="ask-ai-messages" aria-live="polite">
            {messages.map((chatMessage, index) => (
              <div className={`ask-ai-message ${chatMessage.role}`} key={`${chatMessage.role}-${index}`}>
                <span className="ask-ai-avatar">
                  <i className={chatMessage.role === "assistant" ? "bi bi-stars" : "bi bi-person"} />
                </span>
                <p>{chatMessage.text}</p>
              </div>
            ))}
            {loading && (
              <div className="ask-ai-message assistant">
                <span className="ask-ai-avatar"><i className="bi bi-stars" /></span>
                <p className="ask-ai-typing">Thinking<span>.</span><span>.</span><span>.</span></p>
              </div>
            )}
          </div>

          <div className="ask-ai-suggestions">
            {starterQuestions.map((question) => (
              <button
                className="ask-ai-suggestion"
                key={question}
                onClick={() => handleStarterQuestion(question)}
                type="button"
              >
                {question}
              </button>
            ))}
          </div>

          {error && <p className="ask-ai-error" role="alert">{error}</p>}

          <form className="ask-ai-form" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              aria-label="Ask BiteBuddy"
              className="ask-ai-input"
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about the menu..."
              value={message}
            />
            <button className="ask-ai-submit" disabled={loading || !message.trim()} type="submit">
              <i className="bi bi-send-fill" />
              <span className="visually-hidden">Send</span>
            </button>
          </form>
        </section>
      )}

      <button
        aria-expanded={open}
        aria-label={open ? "Close BiteBuddy" : "Open BiteBuddy food assistant"}
        className="ask-ai-launcher"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span className="ask-ai-launcher-icon"><i className={open ? "bi bi-x-lg" : "bi bi-stars"} /></span>
        {!open && <span className="ask-ai-launcher-label">BiteBuddy</span>}
      </button>
    </aside>
  );
};

export default AskAI;
