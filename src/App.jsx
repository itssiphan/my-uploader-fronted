import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [isUploading, setIsUploading] = useState("Upload");
  const [message, setMessage] = useState("");
  const videoInputRef = useRef(null); // Ref for video input
  const jsonInputRef = useRef(null); // Ref for JSON input

  const handleVideo = (e) => {
    let selectedFile = e.target.files[0];
    setVideoFile(selectedFile);
  };

  const handleJson = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate JSON file
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target.result);
          if (!jsonData.title || !jsonData.description || !jsonData.tags) {
            alert("JSON file must contain title, description, and tags!");
            setJsonFile(null);
            jsonInputRef.current.value = null;
          } else {
            setJsonFile(selectedFile);
          }
        } catch (err) {
          alert("Invalid JSON file!");
          setJsonFile(null);
          jsonInputRef.current.value = null;
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleUpload = async () => {
    setIsUploading("Uploading...");

    if (!videoFile || !jsonFile) {
      alert("Select video and JSON file!");
      setIsUploading("Upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("json", jsonFile);

      const res = await fetch("https://my-uploader-bakend.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Server response error!");
      }

      console.log("🎉 Success", data);
      setIsUploading("Uploaded");
      setMessage(`Video uploaded ✅: ${data.title || "Untitled"}`);

      // Reset file inputs and state
      setVideoFile(null);
      setJsonFile(null);
      videoInputRef.current.value = null;
      jsonInputRef.current.value = null;
    } catch (error) {
      console.error("Upload failed ❌:", error);
      alert(`Upload failed: ${error.message}`);
      setMessage(`Upload failed ❌: ${error.message}`);
      setIsUploading("Try again");
    }
  };

  return (
    <div className="min-h-screen bg-lime-50 flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl my-5 font-bold text-center text-green-400">Siphan App</h2>
      <div className="bg-white drop-shadow-lg rounded-2xl p-6 w-full max-w-md flex flex-col gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="60px"
              viewBox="0 -960 960 960"
              width="60px"
              fill="red"
            >
              <path d="M616-242q-27 1-51.5 1.5t-43.5.5h-41q-71 0-133-2-53-2-104.5-5.5T168-257q-26-7-45-26t-26-45q-6-23-9.5-56T82-447q-2-36-2-73t2-73q2-30 5.5-63t9.5-56q7-26 26-45t45-26q23-6 74.5-9.5T347-798q62-2 133-2t133 2q53 2 104.5 5.5T792-783q26 7 45 26t26 45q6 23 9.5 56t5.5 63q2 36 2 73v17q-19-8-39-12.5t-41-4.5q-83 0-141.5 58.5T600-320q0 21 4 40.5t12 37.5ZM400-400l208-120-208-120v240Zm360 200v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
            </svg>
            <label className="block text-lg text-[#ff0000] font-medium mb-1">Select Video (.mp4)</label>
          </div>
          <input
            ref={videoInputRef}
            onChange={handleVideo}
            type="file"
            accept=".mp4"
            className="block w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-green-100 file:text-green-600 hover:file:bg-green-200"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="60px"
              viewBox="0 -960 960 960"
              width="60px"
              fill="red"
            >
              <path d="M560-160v-80h120q17 0 28.5-11.5T720-280v-80q0-38 22-69t58-44v-14q-36-13-58-44t-22-69v-80q0-17-11.5-28.5T680-720H560v-80h120q50 0 85 35t35 85v80q0 17 11.5 28.5T840-560h40v160h-40q-17 0-28.5 11.5T800-360v80q0 50-35 85t-85 35H560Zm-280 0q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T120-400H80v-160h40q17 0 28.5-11.5T160-600v-80q0-50 35-85t85-35h120v80H280q-17 0-28.5 11.5T240-680v80q0 38-22 69t-58 44v14q36 13 58 44t22 69v80q0 17 11.5 28.5T280-240h120v80H280Z" />
            </svg>
            <label className="block text-lg text-[#ff0000] font-medium mb-1">Select JSON</label>
          </div>
          <input
            ref={jsonInputRef}
            onChange={handleJson}
            type="file"
            accept=".json"
            className="block w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-green-100 file:text-green-600 hover:file:bg-green-200"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={!videoFile || !jsonFile || isUploading === "Uploading..."}
          className={`w-full my-2 text-white py-2 rounded-lg font-semibold ${
            isUploading === "Uploaded"
              ? "bg-green-600 cursor-default"
              : !videoFile || !jsonFile || isUploading === "Uploading..."
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 cursor-pointer hover:bg-green-700"
          }`}
        >
          {isUploading}
        </button>
      </div>
      <div
        className={`py-1 px-3 my-5 ${
          !message ? "bg-red-100" : message.includes("failed") ? "bg-red-50 text-red-500" : "text-green-500"
        }`}
      >
        {message && message}
      </div>
    </div>
  );
}

export default App;