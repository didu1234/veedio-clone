import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";

const Index = () => {
    const [media, setMedia] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [playInterval, setPlayInterval] = useState(null);

    // Handle media upload
    const handleFileUpload = (file) => {
        const newMedia = {
            id: media.length + 1,
            file,
            width: 100,
            height: 100,
            x: 0,
            y: 0,
            startTime: 0,
            endTime: 10,
        };
        setMedia([...media, newMedia]);
    };

    // Handle play/pause
    const handlePlay = () => {
        setPlaying((prev) => !prev);

        if (!playing) {
            const interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
            setPlayInterval(interval);
        } else {
            clearInterval(playInterval);
        }
    };

    return (
        <div className="flex">
            <Sidebar media={media} setMedia={setMedia} />
            <div className="flex flex-col">
                <button onClick={handlePlay}>
                    {playing ? "Pause" : "Play"}
                </button>
                <Canvas media={media} time={time} />
            </div>
        </div>
    );
};

export default Index;
