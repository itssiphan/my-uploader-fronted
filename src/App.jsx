import React, { useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [isUploading, setIsUploading] = useState("Upload");
  const [message, setMessage] = useState("");
  const videoInputRef = useRef(null);
  const jsonInputRef = useRef(null);

  const handleVideo = (e) => {
    let selectedFile = e.target.files[0];
    setVideoFile(selectedFile);
  };

  const handleJson = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
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

      const response = await axios.post("https://my-uploader-bakend.onrender.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("🎉 Success", response.data);
      setIsUploading("Uploaded");
      setMessage(`Video uploaded ✅: ${response.data.title || "Untitled"}`);

      setVideoFile(null);
      setJsonFile(null);
      videoInputRef.current.value = null;
      jsonInputRef.current.value = null;
    } catch (error) {
      console.error("Upload failed ❌:", error);
      const errorMessage =
        error.response?.data?.message || error.response?.data?.error || error.message || "Server response error!";
      alert(`Upload failed: ${errorMessage}`);
      setMessage(`Upload failed ❌: ${errorMessage}`);
      setIsUploading("Try again");
    }
  };

  // ... rest of the JSX (unchanged)
}