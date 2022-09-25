import { useEffect, useId } from "react";
import Heading from "components/Heading/Heading";
import BackgroundSection from "pages/ProductPage/BackgroundSection";
import img1 from "images/collections/1.png";
import img2 from "images/collections/5.png";
import img3 from "images/collections/4.png";
import img4 from "images/collections/3.png";
//
import Tableland from "images/Sponsors/Tableland.svg";

import CardCategory3, {
  CardCategory3Props,
} from "../CardCategories/CardCategory3";
import Glide from "@glidejs/glide";

export const TechStack: CardCategory3Props[] = [
  {
    name: "Tech Stack",
    desc: "Ceramic",
    featuredImage: img1,
    color: "bg-slate-100/80",
  },
  {
    name: "Tech Stack",
    desc: "The Graph",
    featuredImage: img2,
    color: "bg-slate-100/80",
  },
  {
    name: "Tech Stack",
    desc: "IPFS",
    featuredImage: img3,
    color: "bg-slate-100/80",
  },
  {
    name: "Tech Stack",
    desc: "Polygon",
    featuredImage: img4,
    color: "bg-slate-100/80",
  },
  {
    name: "Tech Stack",
    desc: "Spruce",
    featuredImage: img4,
    color: "bg-slate-100/80",
  },
  {
    name: "Tech Stack",
    desc: "Tableland",
    featuredImage: Tableland,
    color: "bg-slate-100/80",
  },
];

const ComponentSlider = () => {
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    const OPTIONS: Glide.Options = {
      perView: 2.8,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1279: {
          gap: 20,
          perView: 2.15,
        },
        1023: {
          gap: 20,
          perView: 1.6,
        },
        768: {
          gap: 20,
          perView: 1.2,
        },
        500: {
          gap: 20,
          perView: 1,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    // @ts-ignore
    return () => slider.destroy();
  }, [UNIQUE_CLASS]);

  return (
    <div className={`${UNIQUE_CLASS}`}>
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
      >
        Explore our tech stack.
      </Heading>
      <div className="" data-glide-el="track">
        <ul className="glide__slides">
          {TechStack.map((item, index) => (
            <li key={index} className={`glide__slide`}>
              <CardCategory3
                name={item.name}
                desc={item.desc}
                featuredImage={item.featuredImage}
                color={item.color}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComponentSlider;
