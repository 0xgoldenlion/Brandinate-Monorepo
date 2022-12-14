import { TechStack } from "components/Components/ComponentSlider";
import { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface CardCategory3Props {
  className?: string;
  featuredImage?: string;
  name?: string;
  desc?: string;
  color?: string;
}

const CardCategory3: FC<CardCategory3Props> = ({
  className = "",
  featuredImage = TechStack[2].featuredImage,
  name = TechStack[2].name,
  desc = TechStack[2].desc,
  color = TechStack[2].color,
}) => {
  return (

      <div
        className={`relative w-full aspect-w-16 aspect-h-11 sm:aspect-h-9 h-0 rounded-2xl overflow-hidden group ${color}`}
      >
        <div>
          <NcImage
            src={featuredImage}
            containerClassName="absolute inset-5 sm:inset-8"
            className="absolute right-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl"
          />
        </div>
        <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity"></span>

        <div>
          <div className="absolute inset-5 sm:inset-8 flex flex-col">
            <div className="max-w-xs">
              <span className={`block mb-2 text-sm text-[#1d1e5f]`}>
                {name}
              </span>
              {desc && (
                <h2
                  className={`text-xl md:text-2xl text-[#1d1e5f] font-semibold`}
                  dangerouslySetInnerHTML={{ __html: desc }}
                ></h2>
              )}
            </div>
            <div className="mt-auto">
              <ButtonPrimary
                sizeClass="py-3 px-4 sm:py-3.5 sm:px-6"
                fontSize="text-sm font-medium"
                className="nc-shadow-lg"
              >
                Learn More
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CardCategory3;
