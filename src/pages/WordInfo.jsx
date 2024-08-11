import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WordInfo = () => {
  const { word } = useParams();
  const [wordDetails, setWordDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null); // Track which audio is playing

  const audioRefs = useRef([]); // Array of refs for all audio elements

  useEffect(() => {
    setLoading(true);

    if (word !== "") {
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

        .then((res) => {
          setWordDetails(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);

          setLoading(false);
        });
    }
  }, [word]);

  const handlePlayPause = (audioIdx) => {
    if (playingIndex === audioIdx) {
      // Pause the currently playing audio
      audioRefs.current[audioIdx].pause();
      setPlayingIndex(null);
    } else {
      // Pause the previously playing audio (if any)
      if (playingIndex !== null && audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex].pause();
      }
      // Play the selected audio
      audioRefs.current[audioIdx].play();
      setPlayingIndex(audioIdx);
    }
  };

  return (
    <div>
      <span>back to search</span>
      <div>
        <div>
          <h1 className="text-2xl">{word}</h1>
          <span className="flex">
            {wordDetails.map((data, idx) => (
              <span className="flex" key={idx}>
                <p>{data.phonetic}</p>
                {data.phonetics
                  .filter((audioObj) => audioObj?.audio)
                  .map((audio, audioIdx) => (
                    <div key={audioIdx} className="custom-audio-player">
                      <audio
                        ref={(el) => (audioRefs.current[audioIdx + idx] = el)} // Unique ref for each audio
                        src={audio.audio}
                        controls={false}
                      ></audio>
                      <button onClick={() => handlePlayPause(audioIdx + idx)}>
                        {playingIndex === audioIdx + idx ? " ⏸️" : " ▶️"}
                      </button>
                    </div>
                  ))}
              </span>
            ))}
          </span>
        </div>
        <div>
          <h2>Definitions</h2>
          <p>{}</p>
        </div>
      </div>
    </div>
  );
};

export default WordInfo;
