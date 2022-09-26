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
import UseCase1 from "images/Icons/UseCase1.png";
import UseCase2 from "images/Icons/UseCase2.png";
import UseCase3 from "images/Icons/UseCase3.png";
import UseCase4 from "images/Icons/UseCase4.png";
import UseCase5 from "images/Icons/UseCase5.png";
import UseCase6 from "images/Icons/UseCase6.png";
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
    image: UseCase1,
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
    image: UseCase1,
    svgBg: explore8Svg,
    color: "bg-orange-50",
  },
  {
    id: 5,
    name: "Emerging Media",
    desc: "Use Case",
    image: UseCase2,
    svgBg: explore8Svg,
    color: "bg-blue-50",
  },
  {
    id: 6,
    name: "First-Party Data",
    desc: "Use Case",
    image: UseCase3,
    svgBg: explore8Svg,
    color: "bg-orange-50",
  },
  {
    id: 7,
    name: "Sustainability",
    desc: "Use Case",
    image: UseCase4,
    svgBg: explore8Svg,
    color: "bg-stone-100",
  },
  {
    id: 8,
    name: "Token Gating",
    desc: "Use Case",
    image: UseCase5,
    svgBg: explore8Svg,
    color: "bg-blue-50",
  },
  {
    id: 9,
    name: "User Engagement",
    desc: "Use Case",
    image: UseCase6,
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

  return (
    <div
      className={`nc-SectionGridMoreExplore relative ${className}`}
      data-nc-id="SectionGridMoreExplore"
    >
      <div className={`grid gap-4 md:gap-7 ${gridClassName}`}>
        {data.map((item) => renderCard(item))}
      </div>
    </div>
  );
};

export default SectionGridMoreExplore;
