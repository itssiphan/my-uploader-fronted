import React, { useState } from 'react';
import './App.css';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("Upload");
  const [message, setMessage] = useState("");

  const handleVideo = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleJson = (e) => {
    const file = e.target.files[0];
    setJsonFile(file);
  };

  const handleUpload = async () => {
    if (!videoFile || !jsonFile) {
      alert("Please select both a video and a JSON file!");
      return;
    }

    setUploadStatus("Uploading...");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("json", jsonFile);

      const res = await fetch("https://my-uploader-bakend.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }

      const data = await res.json();
      setUploadStatus("Uploaded ✅");
      setMessage(`Video uploaded! 🎉 Title: ${data.title} | Watch: https://youtu.be/${data.videoId}`);

      // Clear files
      setVideoFile(null);
      setJsonFile(null);
    } catch (err) {
      console.error("Upload Error:", err);
      setUploadStatus("Retry");
      setMessage(`Upload failed ❌: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-lime-50 flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl my-5 font-bold text-center text-green-400">Siphan App 🚀</h2>

      <div className="bg-white drop-shadow-lg rounded-2xl p-6 w-full max-w-md flex flex-col gap-5">
        <div className="space-y-1">
          <label className="block text-lg text-[#ff0000] font-medium mb-1">Select Video (.mp4)</label>
          <input
            onChange={handleVideo}
            type="file"
            accept=".mp4"
            className="block w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-green-100 file:text-green-600 hover:file:bg-green-200"
          />
          {videoFile && <p className="text-sm text-blue-600 truncate">🎥 {videoFile.name}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-lg text-[#ff0000] font-medium mb-1">Select JSON File</label>
          <input
            onChange={handleJson}
            type="file"
            accept=".json"
            className="block w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-green-100 file:text-green-600 hover:file:bg-green-200"
          />
          {jsonFile && <p className="text-sm text-blue-600 truncate">📄 {jsonFile.name}</p>}
        </div>

        <button
          onClick={handleUpload}
          disabled={!videoFile || !jsonFile || uploadStatus === "Uploading..."}
          className={`w-full my-3 py-[10px] px-4 rounded-xl text-white font-semibold ${
            !videoFile || !jsonFile || uploadStatus === "Uploading..."
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-700"
          }`}
        >
          {uploadStatus}
        </button>
      </div>

      {message && (
        <div className="mt-5 text-center max-w-md px-4 py-2 rounded bg-white shadow">
          <p className={message.includes("failed") ? "text-red-500" : "text-green-600"}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
