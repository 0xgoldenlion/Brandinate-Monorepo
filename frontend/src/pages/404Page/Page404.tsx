import ButtonPrimary from "shared/Button/ButtonPrimary";
import React from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import I404Png from "images/404.png";
//
import Graphic from "images/Graphics/404Graphic.svg";

const Page404: React.FC = () => (
  <div className="nc-Page404">
    <Helmet>
      <title>Brandinate | 404</title>
    </Helmet>
    <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
      {/* HEADER */}
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <NcImage src={Graphic} />
        <p>
          The page you were looking for doesn't exist.{" "}
        </p>
        <div className="pt-8">
          <ButtonPrimary href="/">Go Home</ButtonPrimary>
        </div>
      </header>
    </div>
  </div>
);

export default Page404;
