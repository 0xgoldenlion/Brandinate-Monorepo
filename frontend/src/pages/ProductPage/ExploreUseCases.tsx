import CardCategory1 from "components/CardCategories/CardCategory1";
import CardCategory4 from "components/CardCategories/CardCategory4";
import Heading from "components/Heading/Heading";
import NavItem2 from "components/NavItem2";
import React, { FC } from "react";
import Nav from "shared/Nav/Nav";
import explore1Svg from "images/collections/explore1.svg";
import explore2Svg from "images/collections/explore2.svg";
import explore3Svg from "images/collections/explore3.svg";
import explore8Svg from "images/collections/explore8.svg";
//
import UseCase from "images/Icons/UseCase.png";
//
import CardCategory6 from "components/CardCategories/CardCategory6";

interface ExploreType {
  id: number;
  name: string;
  desc: string;
  image: string;
  svgBg: string;
  color?: string;
}

export interface SectionGridMoreExploreProps {
  className?: string;
  gridClassName?: string;
  boxCard?: "box1" | "box4" | "box6";
  data?: ExploreType[];
}

export const DEMO_MORE_EXPLORE_DATA = [
  {
    id: 1,
    name: "Backpack",
    desc: "Use Case",
    image: UseCase,
    svgBg: explore1Svg,
    color: "bg-indigo-50",
  },
  {
    id: 2,
    name: "Shoes",
    desc: "Use Case",
    image: UseCase,
    svgBg: explore2Svg,
    color: "bg-slate-100/80",
  },
  {
    id: 3,
    name: "Recycled Blanket",
    desc: "Use Case",
    image: UseCase,
    svgBg: explore3Svg,
    color: "bg-violet-50",
  },
  {
    id: 4,
    name: "Circular Economy",
    desc: "Use Case",
    image: UseCase,
    svgBg: explore8Svg,
    color: "bg-orange-50",
  },
  {
    id: 5,
    name: "Emerging Media",
    desc: "Use Case",
    image: UseCase,
    svgBg: explore8Svg,
    color: "bg-blue-50",
  },
  {
    id: 6,
    name: "First-Party Data",
    desc: "Use Case",
    image: UseCase,
    svgBg: explore8Svg,
    color: "bg-orange-50",
  },
  {
    id: 7,
    name: "Sustainability",
    desc: "Use Case",
    image: UseCase,
    svgBg: explore8Svg,
    color: "bg-stone-100",
  },
  {
    id: 8,
    name: "Token Gating",
    desc: "Use Case",
    image: UseCase,
    svgBg: explore8Svg,
    color: "bg-blue-50",
  },
  {
    id: 9,
    name: "User Engagement",
    desc: "Use Case",
    image: UseCase,
    svgBg: explore8Svg,
    color: "bg-slate-100/80",
  },
];

const SectionGridMoreExplore: FC<SectionGridMoreExploreProps> = ({
  className = "",
  boxCard = "box4",
  gridClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  data = DEMO_MORE_EXPLORE_DATA.filter((_, i) => i < 6),
}) => {
  const [tabActive, setTabActive] = React.useState("All");

  const renderCard = (item: ExploreType) => {
    switch (boxCard) {
      case "box1":
        return (
          <CardCategory1
            key={item.id}
            name={item.name}
            desc={item.desc}
            featuredImage={item.image}
          />
        );

      case "box4":
        return (
          <CardCategory4
            name={item.name}
            desc={item.desc}
            bgSVG={item.svgBg}
            featuredImage={item.image}
            key={item.id}
            color={item.color}
          />
        );
      case "box6":
        return (
          <CardCategory6
            name={item.name}
            desc={item.desc}
            bgSVG={item.svgBg}
            featuredImage={item.image}
            key={item.id}
            color={item.color}
          />
        );

      default:
        return (
          <CardCategory4
            name={item.name}
            desc={item.desc}
            bgSVG={item.svgBg}
            featuredImage={item.image}
            key={item.id}
            color={item.color}
          />
        );
    }
  };

  const renderHeading = () => {
    return (
      <div>
        <Heading
          className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""
        >
          Explore Use Cases
        </Heading>
        <Nav
          className="p-1 bg-white dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto hiddenScrollbar"
          containerClassName="mb-12 lg:mb-14 relative flex justify-center w-full text-sm md:text-base"
        >
          {[
            {
              name: "All",
              icon: `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16C15.866 16 19 12.866 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 12.866 8.13401 16 12 16Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 16V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15 19H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
            },
            {
              name: "Pre-Purchase",
              icon: `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.25 21.5C14.5302 21.5 18 18.0302 18 13.75C18 9.46979 14.5302 6 10.25 6C5.96979 6 2.5 9.46979 2.5 13.75C2.5 18.0302 5.96979 21.5 10.25 21.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21.5 2.5L16 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15 2.5H21.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
            },
            {
              name: "Point of Sale",
              icon: `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.08 8.58003V15.42C21.08 16.54 20.48 17.58 19.51 18.15L13.57 21.58C12.6 22.14 11.4 22.14 10.42 21.58L4.48003 18.15C3.51003 17.59 2.91003 16.55 2.91003 15.42V8.58003C2.91003 7.46003 3.51003 6.41999 4.48003 5.84999L10.42 2.42C11.39 1.86 12.59 1.86 13.57 2.42L19.51 5.84999C20.48 6.41999 21.08 7.45003 21.08 8.58003Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 11.0001C13.2869 11.0001 14.33 9.95687 14.33 8.67004C14.33 7.38322 13.2869 6.34009 12 6.34009C10.7132 6.34009 9.67004 7.38322 9.67004 8.67004C9.67004 9.95687 10.7132 11.0001 12 11.0001Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 16.6601C16 14.8601 14.21 13.4001 12 13.4001C9.79 13.4001 8 14.8601 8 16.6601" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
               `,
            },
            {
              name: "Post-Purchase",
              icon: `<svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.1801 18C19.5801 18 20.1801 16.65 20.1801 15V9C20.1801 7.35 19.5801 6 17.1801 6C14.7801 6 14.1801 7.35 14.1801 9V15C14.1801 16.65 14.7801 18 17.1801 18Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.81995 18C4.41995 18 3.81995 16.65 3.81995 15V9C3.81995 7.35 4.41995 6 6.81995 6C9.21995 6 9.81995 7.35 9.81995 9V15C9.81995 16.65 9.21995 18 6.81995 18Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.81995 12H14.1799" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22.5 14.5V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.5 14.5V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
               `,
            },
          ].map((item, index) => (
            <NavItem2
              key={index}
              isActive={tabActive === item.name}
              onClick={() => setTabActive(item.name)}
            >
              <div className="flex items-center justify-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-sm ">
                <span
                  className="inline-block"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                ></span>
                <span>{item.name}</span>
              </div>
            </NavItem2>
          ))}
        </Nav>
      </div>
    );
  };

  return (
    <div
      className={`nc-SectionGridMoreExplore relative ${className}`}
      data-nc-id="SectionGridMoreExplore"
    >
      {renderHeading()}
      <div className={`grid gap-4 md:gap-7 ${gridClassName}`}>
        {data.map((item) => renderCard(item))}
      </div>
    </div>
  );
};

export default SectionGridMoreExplore;