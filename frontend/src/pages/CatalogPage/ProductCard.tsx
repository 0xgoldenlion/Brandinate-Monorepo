import React, { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import LikeButton from "../../components/LikeButton";
import Prices from "../../components/Objects/Prices";
//
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import BagIcon from "../../components/BagIcon";
//
import { Product, PRODUCTS } from "data/data";
//
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
//
import ModalQuickView from "../../components/ModalQuickView";

export interface ProductCardProps {
  className?: string;
  data?: Product;
  isLiked?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data = PRODUCTS[0],
  isLiked,
}) => {
  const {
    name,
    price,
    description,
    sizes,
    variants,
    variantType,
    status,
    image,
  } = data;
  const [variantActive, setVariantActive] = React.useState(0);
  const [showModalQuickView, setShowModalQuickView] = React.useState(false);

  const getBorderClass = (Bgclass = "") => {
    if (Bgclass.includes("red")) {
      return "border-red-500";
    }
    if (Bgclass.includes("violet")) {
      return "border-violet-500";
    }
    if (Bgclass.includes("orange")) {
      return "border-orange-500";
    }
    if (Bgclass.includes("green")) {
      return "border-green-500";
    }
    if (Bgclass.includes("blue")) {
      return "border-blue-500";
    }
    if (Bgclass.includes("sky")) {
      return "border-sky-500";
    }
    if (Bgclass.includes("yellow")) {
      return "border-yellow-500";
    }
    return "border-transparent";
  };

  const renderVariants = () => {
    if (!variants || !variants.length || !variantType) {
      return null;
    }

    if (variantType === "color") {
      return (
        <div className="flex space-x-1">
          {variants.map((variant, index) => (
            <div
              key={index}
              onClick={() => setVariantActive(index)}
              className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${variantActive === index
                ? getBorderClass(variant.color)
                : "border-transparent"
                }`}
              title={variant.name}
            >
              <div
                className={`absolute inset-0.5 rounded-full z-0 ${variant.color}`}
              ></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex ">
        {variants.map((variant, index) => (
          <div
            key={index}
            onClick={() => setVariantActive(index)}
            className={`relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${variantActive === index
              ? "border-black dark:border-slate-300"
              : "border-transparent"
              }`}
            title={variant.name}
          >
            <div className="absolute inset-0.5 rounded-full overflow-hidden z-0">
              <img
                src={variant.thumbnail}
                alt="variant"
                className="absolute w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonPrimary
          className="shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
        >
          <BagIcon className="w-3.5 h-3.5 mb-0.5" />
          <span className="ml-1">View</span>
        </ButtonPrimary>
        <ButtonSecondary
          className="ml-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => setShowModalQuickView(true)}
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="ml-1">Quick Mint</span>
        </ButtonSecondary>
      </div>
    );
  };

  const renderSizeList = () => {
    if (!sizes || !sizes.length) {
      return null;
    }

    return (
      <div className="absolute bottom-0 inset-x-1 space-x-1.5 flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
        {sizes.map((size, index) => {
          return (
            <div
              key={index}
              className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
            >
              {size}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
        data-nc-id="ProductCard"
      >
        <Link to={"/product-detail"} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link to={"/product-detail"} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={image}
              className="object-cover w-full h-full drop-shadow-xl"
            />
          </Link>



          <LikeButton liked={isLiked} className="absolute top-3 right-3 z-10" />

          {sizes ? renderSizeList() : renderGroupButtons()}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {renderVariants()}

          <div>
            <h2
              className={`nc-ProductCard__title text-base font-semibold transition-colors`}
            >
              {name}
            </h2>
            <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
              {description}
            </p>
          </div>

          <div className="flex justify-between items-end ">
            <Prices price={price} />
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
