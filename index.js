import React, { useState } from "react";

const MediaUpload = () => {
  const [mediaSrc, setMediaSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const fileURL = URL.createObjectURL(uploadedFile);
      console.log("File URL:", fileURL);
      setMediaSrc(fileURL);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={() => console.log("Play button clicked")}>
        Play
      </button>
      
      <div>
        <h3>Time: 0s</h3>
        <h4>Controls</h4>
        <label>Width</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <label>Height</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>

      {mediaSrc && (
        file?.type.startsWith("video") ? (
          <video src={mediaSrc} controls width={width} height={height} />
        ) : (
          <img src={mediaSrc} alt="Uploaded" width={width} height={height} />
        )
      )}
    </div>
  );
};

export default MediaUpload;
