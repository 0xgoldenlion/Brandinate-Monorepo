import { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import backgroundLineSvg from "images/Moon.svg";
//
import HeroGraphic from "images/Graphics/HeroGraphic.svg";

export interface ComponentHeroProps {
  className?: string;
}

const ComponentHero: FC<ComponentHeroProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-ComponentHero relative ${className}`}
      data-nc-id="ComponentHero"
    >
      <div className="relative pt-8 lg:pt-0 lg:absolute z-10 inset-x-0 top-[10%] sm:top-[20%]  container">
        <div className="flex flex-col items-start max-w-lg xl:max-w-2xl space-y-5 xl:space-y-8 ">
          <span className="sm:text-lg md:text-xl font-semibold text-neutral-900">
            A digital twin with every purchase.
          </span>
          <h2 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl !leading-[115%] ">
            Introducing Proof of Product.
          </h2>
          <div className="sm:pt-4">
            <a href='https://demo.brandinate.com/login'>
              <ButtonPrimary
                sizeClass="px-6 py-3 lg:px-8 lg:py-4"
                fontSize="text-sm sm:text-base lg:text-lg font-medium"
              >
                Launch Brand Portal
              </ButtonPrimary>
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-[1] lg:aspect-w-16 lg:aspect-h-8 2xl:aspect-h-7">
        <div className=" ">
          <div className="mt-5 lg:mt-0 lg:absolute right-0 bottom-0 top-0 w-full max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl ml-auto">
            <img
              className="w-full sm:h-full object-contain object-right-bottom "
              src={HeroGraphic}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* BG */}
      <div className="absolute inset-0 bg-slate-100/80 rounded-2xl overflow-hidden z-0">
        <img
          className="absolute w-full h-full object-contain"
          src={backgroundLineSvg}
          alt="Empty"
        />
      </div>
    </div>
  );
};

export default ComponentHero;
