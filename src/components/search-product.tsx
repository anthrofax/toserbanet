import { CiSearch } from "react-icons/ci";

function SearchProduct({ className }: { className?: string }) {
  return (
    <form className={`${className}`} action={'/products'}>
      <input
        type="text"
        name="name" // This is the key step to include the query parameter "name"
        placeholder="Cari Produk"
        className="rounded-full border-2 border-slate-400 py-2 px-5 w-full"
      />
      <button
        type="submit"
        className="bg-slate-950 absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full"
      >
        <CiSearch className="text-white text-2xl" />
      </button>
    </form>
  );
}

export default SearchProduct;
