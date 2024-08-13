import { CiSearch } from "react-icons/ci";

const SearchInput = ({ handleChange }) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-5">Dictionary</h1>
      <div className="relative ">
        <CiSearch className="font-bold text-xl text-slate-500 absolute top-1.5 left-1" />
        <input
          onChange={handleChange}
          type="text"
          placeholder="search here"
          className="rounded-sm bg-slate-200 pl-8 p-1 w-full"
        />
      </div>

    </div>
  );
};

export default SearchInput;
