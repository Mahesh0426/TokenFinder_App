import { useState, useEffect } from "react";
import { encoding_for_model, TiktokenModel } from "tiktoken";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [tokenCount, setTokenCount] = useState(0);
  const [model, setModel] = useState<TiktokenModel>("gpt-3.5-turbo");
  const [tokenDetails, setTokenDetails] = useState<
    { token: number; count: number }[]
  >([]);

  useEffect(() => {
    try {
      const enc = encoding_for_model(model);
      const tokens = enc.encode(text);
      setTokenCount(tokens.length);

      // Count occurrences of each token
      const tokenMap = new Map<number, number>();
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        tokenMap.set(token, (tokenMap.get(token) || 0) + 1);
      }

      // Convert to array and sort by count
      const tokenArray = Array.from(tokenMap.entries())
        .map(([token, count]) => ({ token, count }))
        .sort((a, b) => b.count - a.count);

      setTokenDetails(tokenArray);
      enc.free();
    } catch (error) {
      console.error("Error counting tokens:", error);
      setTokenCount(0);
      setTokenDetails([]);
    }
  }, [text, model]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value as TiktokenModel);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-200 mb-8 text-center">
          Token Finder for OpenAI models
        </h1>

        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-300"
              >
                Select Model
              </label>
              <select
                id="model"
                value={model}
                onChange={handleModelChange}
                className="bg-gray-700 text-white px-3 py-1 rounded-lg border border-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt2">GPT2</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-4o">GPT-4o</option>
              </select>
            </div>

            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Enter your prompt to find tokens
            </label>
            <textarea
              id="prompt"
              className="w-full h-48 px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-gray-400"
              placeholder="Type or paste your text here..."
              value={text}
              onChange={handleTextChange}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-400">
              {text.length} characters
            </div>
            <div className="bg-amber-500 text-gray-900 px-4 py-2 rounded-lg font-semibold">
              {tokenCount} tokens
            </div>
          </div>

          {tokenDetails.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-300 mb-4">
                Token IDs
              </h2>
              <div className="bg-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
                {/* Add this new div for the comma-separated tokens */}
                <div className="mb-4 p-3 bg-gray-800 rounded font-mono text-sm whitespace-pre-wrap">
                  {tokenDetails.flatMap(({ token }) => token).join(", ")}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
