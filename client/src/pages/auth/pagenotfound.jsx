import PageNotFoundImg from "@/assets/images/pagenotfound.png";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col w-full p-4 text-center">
      <img
        src={PageNotFoundImg}
        alt="page not found"
        className="w-full max-w-md h-auto mb-4"
      />

      <h1 className="flex flex-col items-center justify-center">
        <span className="text-2xl md:text-3xl font-medium">Page not found</span>
        <span className="text-sm md:text-base">
          Error 404: The page you are looking for has taken a vacation.
        </span>
        <span className="text-sm md:text-base">
          It will return, but not right now
        </span>
      </h1>
    </div>
  );
};

export default PageNotFound;
