import { FC } from "react";
import { Helmet } from "react-helmet";
import { PRODUCTS } from "data/data";
import Avatar from "shared/Avatar/Avatar";
import ProductCard from "pages/CatalogPage/ProductCard";
import SidebarFilters from "./SidebarFilters";

export interface PageCollection2Props {
  className?: string;
}

const renderAuthor = () => {
  return (
    <div className="max-w-screen-md mx-auto ">
      <div className="nc-SingleAuthor flex">
        <Avatar sizeClass="w-11 h-11 md:w-24 md:h-24" />
        <div className="flex flex-col ml-3 max-w-lg sm:ml-5 space-y-1">
          <span className="text-xs text-neutral-400 uppercase tracking-wider">
            Electronics
          </span>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
            <a href="##">GoPro</a>
          </h2>
          <span className="text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
            Be a hero.
          </span>
        </div>
      </div>
    </div>
  );
};

const PageCollection2: FC<PageCollection2Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageCollection2 ${className}`}
      data-nc-id="PageCollection2"
    >
      <Helmet>
        <title>Demo | Catalog</title>
      </Helmet>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            {renderAuthor()}
          </div>
          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* LOOP ITEMS */}
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 xl:w-1/4 pr-4">
                <SidebarFilters />
              </div>
              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
              <div className="flex-1 ">
                <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 ">
                  {PRODUCTS.map((item, index) => (
                    <ProductCard data={item} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PageCollection2;
