import { useCallback, useEffect, useState } from "react";

export default function NavBar({ setVideoId }) {
  const [visible, setVisible] = useState(false);
  const [history, setHistory] = useState([]);

  const addToHistory = useCallback((video) => {
    setHistory((current) => {
      let nextHistory = current;

      if (
        current.filter(
          (item) =>
            String(item.id).toLowerCase() === String(video).toLowerCase()
        ).length === 0
      ) {
        nextHistory = current.concat(video);
      }

      return nextHistory;
    });
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const value = e.target.videoId.value;
      setVideoId(value);
      addToHistory({ id: value, date: new Date().toLocaleString() });
    },
    [addToHistory, setVideoId]
  );

  const toggleHistory = useCallback(() => {
    setVisible((current) => !current);
  }, []);

  useEffect(() => {
    let h = [];
    try {
      h = JSON.parse(localStorage.getItem("history") || []);
    } catch (_) {
      // do nothing
    }

    setHistory(Array.isArray(h) ? h : []);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(JSON.stringify(history));
    } catch (_) {}
  }, [history]);

  return (
    <div className="py-2 bg-blue-100 transition">
      <form
        className="flex w-full max-w-2xl mx-auto space-x-3"
        onSubmit={onSubmit}
      >
        <input
          name="videoId"
          className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          defaultValue="RkC0l4iekYo"
        />
        <button
          className="flex-shrink-0 bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          type="submit"
        >
          Cargar
        </button>
        <button
          disabled={history.length === 0}
          onClick={toggleHistory}
          className={`flex-shrink-0 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200 ${
            visible
              ? "bg-blue-900"
              : history.length === 0
              ? "bg-blue-500 opacity-50"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          type="button"
        >
          H
        </button>
      </form>
      {history.length > 0 && (
        <div
          className={`border-gray-400 backdrop-filter backdrop-blur-md l-0 absolute w-full bg-blue-100 bg-opacity-60 ${
            visible
              ? "mt-2 p-4 border-t overflow-auto"
              : "mt-0 pt-0 overflow-hidden"
          }`}
          style={{ height: visible ? "auto" : 0, maxHeight: "80vh" }}
        >
          <div className="flex flex-col w-full max-w-2xl mx-auto">
            <button
              className="block text-left text-blue-600 font-semibold text-base py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200 border border-blue-100 rounded-sm bg-opacity-10 bg-blue-100 hover:bg-opacity-60 backdrop-filter backdrop-blur-md mb-2"
              onClick={() => setHistory([])}
            >
              Limpiar historial
            </button>
            {history.map((item) => (
              <button
                key={item.id}
                className="block text-left text-gray-600 text-base py-2 px-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200 border-b border-gray-100"
                onClick={() => setVideoId(item.id)}
              >
                <span className="font-semibold text-gray-900">{item.id}</span>{" "}
                &mdash; {item.date}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
