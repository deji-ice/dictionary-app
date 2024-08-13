/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const SearchList = ({ data }) => {
  const navigate = useNavigate();

  const handleWordClick = (word) => {
    navigate(`/word/${word}`);
  };

  return (
    <li
      onClick={()=>handleWordClick(data.word)}
      className="bg-gray-100 px-2 rounded-md py-2"
    >
      {data.word}
    </li>
  );
};

export default SearchList;
