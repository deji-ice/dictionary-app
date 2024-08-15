/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const SearchList = ({ data, id }) => {
  const navigate = useNavigate();

  const handleWordClick = (word) => {
    navigate(`/word/${word}/id/${id}`);
  };

  const stringTruncate = (str, length) => {
    const dots = str.length > length ? "..." : "";
    return str.substring(0, length) + dots;
  };
  console.log(data);

  return (
    <li
      onClick={() => handleWordClick(data.word)}
      className="bg-gray-100 px-2 rounded-md py-2 flex justify-start gap-3 items-center cursor-pointer"
    >
      <p> {data.word} </p>
      <span className="flex text-xs w-fit gap-2">
        <p>{stringTruncate(data.meanings[0].definitions[0].definition, 25)}</p>
        <span className="font-bold">{data.phonetic}</span>
      </span>
    </li>
  );
};

export default SearchList;
