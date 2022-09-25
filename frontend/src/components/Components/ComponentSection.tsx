import { FC } from "react";
//
import NcImage from "shared/NcImage/NcImage";
import ButtonPrimary from "shared/Button/ButtonPrimary";
//
import SectionGraphic from "images/Graphics/SectionGraphic.png";

export interface ComponentSectionProps {
  className?: string;
}

const ComponentSection: FC<ComponentSectionProps> = ({ className = "lg:pt-10" }) => {
  return (
    <div className={`nc-ComponentSection ${className}`}>
      <div className="relative flex flex-col lg:flex-row lg:justify-end bg-slate-100/80 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
        <div className="lg:w-[45%] max-w-lg relative">
          <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.13] tracking-tight text-[#1d1e5f]">
            Case Study: GoPro
          </h2>
          <span className="block mt-6 text-[#1d1e5f] dark:text-slate-400">
            Learn how we created a digital twin for the HERO11 Black — GoPro's latest action camera.
          </span>
          <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
            <ButtonPrimary
              href="/blog-single"
              className="dark:bg-slate-200 dark:text-slate-900"
            >
              Learn More
            </ButtonPrimary>
          </div>
        </div>

        <NcImage
          containerClassName="relative block lg:absolute lg:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)]"
          src={SectionGraphic}
        />
      </div>
    </div>
  );
};

export default ComponentSection;