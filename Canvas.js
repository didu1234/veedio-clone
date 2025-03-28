import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

const Canvas = ({ media, setMedia }) => {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="canvas">
      <button onClick={() => setPlaying(!playing)}>
        {playing ? "Pause" : "Play"}
      </button>
      <p>Time: {time}s</p>
      {media.map((item, index) =>
        time >= item.startTime && time <= item.endTime ? (
          <Rnd
            key={index}
            size={{ width: item.width, height: item.height }}
            position={{ x: item.x, y: item.y }}
            onDragStop={(e, d) => {
              const updatedMedia = [...media];
              updatedMedia[index].x = d.x;
              updatedMedia[index].y = d.y;
              setMedia(updatedMedia);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              const updatedMedia = [...media];
              updatedMedia[index] = {
                ...updatedMedia[index],
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
              };
              setMedia(updatedMedia);
            }}
          >
            {item.type === "image" ? (
              <img src={item.src} alt="media" style={{ width: "100%", height: "100%" }} />
            ) : (
              <video src={item.src} autoPlay loop style={{ width: "100%", height: "100%" }} />
            )}
          </Rnd>
        ) : null
      )}
    </div>
  );
};

export default Canvas;
