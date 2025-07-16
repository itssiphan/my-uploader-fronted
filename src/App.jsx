import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [video, setVideo] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const handleVideoChange = (e) => {
    const selectedFile = e.target.files[0];
    setVideo(selectedFile);
    console.log('Selected Video:', selectedFile);
  };
  const handleJsonChange = (e) => {
    const selectedFile = e.target.files[0];
    setJsonFile(selectedFile);
    console.log('Selected JSON:', selectedFile);
  };
  const handleUpload = async () => {
    if (!video || !jsonFile) {
      setMessage('Please select both a video and a JSON file!');
      return;
    }
    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('video', video);
    formData.append('json', jsonFile);
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(
        `Video uploaded successfully! Title: ${response.data.title} | Watch: https://youtu.be/${response.data.videoId}`
      );
    } catch (error) {
      setMessage('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };
  useEffect(() => {
    console.log('Video:', video);
    console.log('JSON File:', jsonFile);
  }, [video, jsonFile]);
  return (
    <>
      <div className="h-full overflow-hidden">
        <div className="h-full flex overflow-x-hidden scale-125 flex-col justify-center items-center">
          <div className="flex items-center gap-2 mb-7 w-[257px]">
            <h1 className="text-2xl text-red-500 font-bold">Siphan App</h1>
            <span className="text-3xl">⭕</span>
          </div>
          <div className="flex flex-col p-5 w-[275px] h-[400px] justify-center gap-3 rounded-lg bg-white drop-shadow-sm">
            <div className="flex flex-col justify-start items-start">
              <div className="flex items-center gap-2">
                <img src="./public/youtube_activity_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
                <label className="block mb-1 text-lg font-medium text-gray-700">Select Video (.mp4)</label>
              </div>
              <input
                onChange={handleVideoChange}
                type="file"
                accept=".mp4"
                className="ml-1 mb-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {video && (
                <details className="text-lg ml-2 line-clamp-3 text-red-500 -mb-2">
                  <summary>Video</summary>
                  {video.name}
                </details>
              )}
            </div>
            <div className="flex flex-col justify-start items-start">
              <div className="flex items-center gap-2">
                <img src="./public/data_object_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
                <label className="block mb-1 text-lg font-medium text-gray-700">Select JSON</label>
              </div>
              <input
                onChange={handleJsonChange}
                type="file"
                accept=".json"
                className="ml-1 mb-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {jsonFile && (
                <details className="text-lg ml-2 text-red-500">
                  <summary>JSON</summary>
                  {jsonFile.name}
                </details>
              )}
            </div>
            <button
              onClick={handleUpload}
              disabled={uploading || !video || !jsonFile}
              className={`w-full mb-2 py-2 px-4 rounded text-black font-semibold ${
                uploading || !video || !jsonFile ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {message && (
              <p className={`text-sm ${message.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}