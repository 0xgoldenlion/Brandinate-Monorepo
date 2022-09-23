import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import { Helmet } from "react-helmet";
import SectionPromo2 from "components/SectionPromo2";
import Hero from "components/Hero";
import DiscoverMoreSlider from "components/DiscoverMoreSlider";
import ProductDetailPage from "pages/ProductPage/ProductPage";

function PageHome2() {
  return (
    <div className="nc-PageHome2 relative overflow-hidden">
      <Helmet>
        <title>Brandinate | Demo</title>
      </Helmet>
      <div className="container px-4">
        <Hero />
      </div>
      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionHowItWork />
        <SectionPromo2 />
        <ProductDetailPage />
        <DiscoverMoreSlider />
      </div>
    </div>
  );
}

export default PageHome2;
