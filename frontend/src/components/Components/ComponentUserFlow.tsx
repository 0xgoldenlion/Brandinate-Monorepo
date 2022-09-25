import { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";
//
import Step1Graphic from "images/Graphics/Step1Graphic.png";
import Step2Graphic from "images/Graphics/Step2Graphic.png";
import Step3Graphic from "images/Graphics/Step3Graphic.png";
import Step4Graphic from "images/Graphics/Step4Graphic.png";
//
import Test2 from "images/Graphics/Test2.png";

export interface ComponentUserFlowProps {
  className?: string;
  data?: typeof DEMO_DATA[0][];
}

const DEMO_DATA = [
  {
    id: 1,
    img: Step1Graphic,
    imgDark: Step1Graphic,
    title: "Create a Brand Account",
    desc: "Smart filtering and suggestions make it easy to find",
  },
  {
    id: 2,
    img: Step2Graphic,
    imgDark: Step2Graphic,
    title: "Upload Product Information",
    desc: "authentic, cryptographically-verifiable product information.",
  },
  {
    id: 3,
    img: Test2,
    imgDark: Test2,
    title: "Issue a Digital Twin",
    desc: "The carrier will confirm and ship quickly to you",
  },
  {
    id: 4,
    img: Step4Graphic,
    imgDark: Step4Graphic,
    title: "Reward User Behavior",
    desc: "Engage customers with acustom digital twin as a dNFT.",
  },
];

const ComponentUserFlow: FC<ComponentUserFlowProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-ComponentUserFlow ${className}`}
      data-nc-id="ComponentUserFlow"
    >
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
        {data.map((item: typeof DEMO_DATA[number], index: number) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            <NcImage
              containerClassName="mb-4 sm:mb-10 max-w-[1480px] mx-auto"
              className="rounded-3xl"
              src={item.img}
            />
            <div className="text-center mt-auto space-y-5">
              <Badge
                name={`STEP ${index + 1}`}
                color={
                  !index
                    ? "pink"
                    : index === 1
                      ? "pink"
                      : index === 2
                        ? "pink"
                        : "pink"
                }
              />
              <h3 className="text-[#1d1e5f] font-semibold">{item.title}</h3>
              <span className="block text-[#1d1e5f] dark:text-slate-400 text-sm leading-6">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentUserFlow;
