import React, { useState } from "react";

function App() {
  const [video, setVideo] = useState(null);
  const [json, setJson] = useState(null);
  const [status, setStatus] = useState("Upload");
  const [message, setMessage] = useState("");

  const handleVideo = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleJson = (e) => {
    setJson(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!video || !json) {
      alert("Please select both video and json file");
      return;
    }

    setStatus("Uploading...");
    setMessage("");

    const formData = new FormData();
    formData.append("video", video);
    formData.append("json", json);

    try {
      const res = await fetch("https://my-uploader-bakend.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }

      const data = await res.json();

      setStatus("Uploaded ✅");
      setMessage(`Uploaded! ✅\nTitle: ${data.title} \nVideo: https://youtu.be/${data.videoId}`);

      // Clear files
      setVideo(null);
      setJson(null);
    } catch (error) {
      console.error("Upload error:", error);
      setStatus("Retry");
      setMessage(`Upload failed ❌\n${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lime-50 p-3">
      <div className="flex flex-col gap-3 bg-white drop-shadow-lg rounded-2xl p-6 w-[90vw] max-w-[400px]">
        <h2 className="text-2xl font-bold text-center text-green-400">Siphan App 🚀</h2>

        <div className="flex flex-col gap-1">
          <label className="text-lg text-[#ff0000] font-medium mb-1">Select Video (.mp4)</label>
          <input
            onChange={handleVideo}
            type="file"
            accept=".mp4"
            className="text-sm text-gray-500 file:mr-5 file:py-2 file:px-3 file:border-0 file:rounded-full file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          {video && <span className="text-blue-500 text-xs">🎥 {video.name}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-lg text-[#ff0000] font-medium mb-1">Select JSON</label>
          <input
            onChange={handleJson}
            type="file"
            accept=".json"
            className="text-sm text-gray-500 file:mr-5 file:py-2 file:px-3 file:border-0 file:rounded-full file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          {json && <span className="text-blue-500 text-xs">📄 {json.name}</span>}
        </div>

        <button
          onClick={handleUpload}
          disabled={!video || !json || status === "Uploading..."}
          className="bg-green-500 text-white font-medium rounded-xl p-3 hover:bg-green-600 disabled:opacity-50"
        >
          {status}
        </button>

        {message && (
          <div className="mt-2 text-sm whitespace-pre-wrap text-center">
            {message.includes("failed") ? (
              <p className="text-red-600">{message}</p>
            ) : (
              <p className="text-green-600">{message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
