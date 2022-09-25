const NFTCard = ({ nft }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-auto">
      <div className="rounded-t-lg overflow-hidden h-80 p-10 bg-white flex justify-center items-center">
        <img className="border-2 rounded-lg max-h-60" src={nft.image} alt="" />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {nft.name}
        </h5>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {nft.brand}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {nft.description}
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
