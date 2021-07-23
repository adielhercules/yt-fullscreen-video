import { useCallback } from "react";

export default function NavBar({ setVideoId }) {
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      setVideoId(e.target.videoId.value);
    },
    [setVideoId]
  );
  return (
    <div className="p-2 bg-blue-100">
      <form
        className="flex w-full max-w-xl mx-auto space-x-3"
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
      </form>
    </div>
  );
}
