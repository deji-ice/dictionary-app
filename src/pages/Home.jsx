import { useEffect, useState } from "react";
import "../App.css";
import SearchInput from "../components/SearchInput";
import axios from "axios";
import SearchList from "../components/SearchList";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setIsOpen(true);
    if (searchValue !== "") {
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`)
        .then((res) => {
          setSearchResults(res.data);
          console.log(searchResults);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue === "") {
      setIsOpen(false);
      setSearchResults([]);
    }
  }, [searchValue]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <SearchInput handleChange={handleChange} />
      {isOpen && (
        <ul className="bg-gray-200 px-2 py-2 rounded-b-lg flex gap-2 flex-col">
          {searchResults.map((data, idx) => (
            <SearchList key={idx} data={data} id={idx} />
          ))}
        </ul>
      )}
      <div className="flex flex-col justify-start mt-5">
        <h4 className="text-xl font-semibold">Recents</h4>
        <ul>
          <li>Dog</li>
          <li>Goat</li>
          <li>Laptop</li>
          <li>Coffee</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

// function App() {

//   return (
//     <>
//      {/* <Routes>
//       <Route path='/' element={<Home/>} />
//      </Routes> */}
//     </>
//   )
// }
