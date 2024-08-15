import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoChevronBack } from "react-icons/io5";

const WordInfo = () => {
  const { word, id } = useParams();
  const navigate = useNavigate();
  const [wordDetails, setWordDetails] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);

  const audioRefs = useRef([]); // Array of refs for all audio elements

  useEffect(() => {
    setLoading(true);
    if (word) {
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => {
          setWordDetails(res.data[id]);
          setLoading(false);
          console.log(res.data[id]); // Logging the fetched word details
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [word, id]);

  const handlePlayPause = (audioIdx) => {
    if (playingIndex === audioIdx) {
      audioRefs.current[audioIdx].pause();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null && audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex].pause();
      }
      audioRefs.current[audioIdx].play();
      setPlayingIndex(audioIdx);
    }
  };

  const handleTabClick = (idx) => {
    setActiveTab(idx);
    console.log(idx, activeTab);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!wordDetails) {
    return <p>No word details found.</p>;
  }

  return (
    <div>
      <button
        className="flex items-center gap-1 bg-blue-100 mb-8 text-black px-2 py-1 rounded-md text-sm"
        onClick={() => navigate(-1)}
      >
        <IoChevronBack /> Back to Search
      </button>
      <div>
        <h1 className="text-2xl">{word}</h1>
        <div className="flex">
          <p>{wordDetails.phonetic}</p>
          {wordDetails.phonetics
            .filter((audioObj) => audioObj?.audio)
            .map((audio, audioIdx) => (
              <div key={audioIdx} className="">
                <audio
                  ref={(el) => (audioRefs.current[audioIdx] = el)}
                  src={audio.audio}
                  controls={false}
                ></audio>
                <button onClick={() => handlePlayPause(audioIdx)}>
                  {playingIndex === audioIdx ? "⏸️" : "▶️"}
                </button>
              </div>
            ))}
        </div>
      </div>
      <div>
        <div className="my-3 rounded-md border-2 border-blue-500 gap-[2px] flex w-fit  justify-center items-center ">
          {wordDetails.meanings.map((meaning, idx) => (
            <h2
              key={idx}
              className={` ${
                activeTab === idx ? "bg-blue-600 text-white" : "bg-white"
              } border-left px-4   cursor-pointer  `}
              onClick={() => handleTabClick(idx)}
            >
              {meaning.partOfSpeech}
            </h2>
          ))}
        </div>
        <h2 className="flex items-center ">
          Definitions{" "}
          <span className="text-lg pl-1 font-bold text-gray-600">
            {wordDetails.meanings[activeTab].definitions.length}
          </span>
        </h2>
        {wordDetails.meanings[activeTab].definitions.map((definition, idx) => (
          <div key={idx} className="bg-gray-100 p-2 rounded-md my-2">
            <p>{definition.definition}</p>
            {definition.example && <p>Example: {definition.example}</p>}
            {definition.synonyms && (
              <p>Synonyms: {definition.synonyms.join(", ")}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordInfo;
