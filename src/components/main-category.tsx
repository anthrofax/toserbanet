import Link from "next/link";

function MainCategory() {
  return (
    <div className="px-5 md:px-10 lg:px-20 py-5 flex gap-5 md:gap-10 lg:gap-20 max-w-screen overflow-x-auto scrollbar-hide whitespace-nowrap">
      <Link href="" className="font-bold">Artikel</Link>
      <Link href="" className="font-bold">Sandal</Link>
      <Link href="" className="font-bold">Sandal Kulit</Link>
      <Link href="" className="font-bold">Sendal Pria</Link>
      <Link href="" className="font-bold">Sepatu Pria</Link>
    </div>
  );
}

export default MainCategory;
