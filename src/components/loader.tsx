function Loader() {
  return (
    <div className="h-screen">
      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm h-[80vh] bg-slate-50/50">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Loader;
