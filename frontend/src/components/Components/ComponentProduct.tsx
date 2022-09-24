import { FC, useState } from "react";
import { PRODUCTS } from "data/data";
//
import Prices from "components/Objects/Prices";
import Policy from "../Objects/MintGuide";
import AccordionInfo from "../Objects/ProductInformation";
//
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SectionGridMoreExplore, { DEMO_MORE_EXPLORE_DATA } from "pages/ProductPage/ExploreUseCases";
import BackgroundSection from "pages/ProductPage/BackgroundSection";
//
import ProductMain from "images/Product/ProductMain.png";
import ProductLeft from "images/Product/ProductLeft.png";
import ProductRight from "images/Product/ProductRight.png";

import { ethers } from "ethers";

export interface ComponentProductProps {
  className?: string;
}

const ComponentProduct: FC<ComponentProductProps> = ({ className = "" }) => {
  const { sizes, variants, status, allOfSizes } = PRODUCTS[0];
  const LIST_IMAGES_DEMO = [ProductMain, ProductLeft, ProductRight];

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            HERO11 Black
          </h2>
          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <a
              className="flex items-center text-sm font-medium"
            >
              <div className="ml-1.5 flex">
                <span className="text-slate-600 dark:text-slate-400 underline">
                  GoPro
                </span>
              </div>
            </a>
            <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>
            <div className="flex items-center">
              <Prices
                contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
                price={834.94}
              />
            </div>
          </div>
        </div>

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">

          <ButtonPrimary
            className="flex-1 flex-shrink-0"
          >
            <span className="ml-3">Mint</span>
          </ButtonPrimary>
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
          >
            <span className="ml-3" onClick={() => walletConnect()}>Connect Wallet</span>
          </ButtonPrimary>
          <div>{signer}</div>
        </div>

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        <AccordionInfo />

        {/* ---------- 6 ----------  */}
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">About GoPro</h2>
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          <p>
            GoPro is dedicated to helping people capture and share their lives in exciting ways. We’re passionate about our purpose — we believe sharing and reliving our experiences makes life more meaningful and fun.
          </p>
          <p>
            Our customers around the world bring our brand and to life. They help us see the world in new ways and motivate us to do more, including celebrating and supporting diversity within our workplace so that eventually no group goes underrepresented.
          </p>
          <p>
            We are GoPro — we love what we do!
          </p>
        </div>
      </div>
    );
  };

  const [signer, setSigner] = useState('')

  const walletConnect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(await signer.getAddress())
    console.log("Account:", await signer.getAddress());
  }

  return (
    <div className={`nc-ComponentProduct ${className}`}>
      {/* MAIn */}
      <main>
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="w-full lg:w-[55%] ">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16">
                <img
                  src={LIST_IMAGES_DEMO[0]}
                  className="w-full rounded-2xl object-cover"
                  alt="product detail 1"
                />
              </div>
              {/* META FAVORITES */}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
              {[LIST_IMAGES_DEMO[1], LIST_IMAGES_DEMO[2]].map((item, index) => {
                return (
                  <div
                    key={index}
                    className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16"
                  >
                    <img
                      src={item}
                      className="w-full rounded-2xl object-cover"
                      alt="product detail 1"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">
            <Policy />
          </div>

          {renderDetailSection()}






          <hr className="border-slate-200 dark:border-slate-700" />

        </div>

        <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
          <div className="relative py-24 lg:py-32">
            <BackgroundSection />
            <SectionGridMoreExplore
              data={DEMO_MORE_EXPLORE_DATA.filter((_, i) => i > 2)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComponentProduct;
