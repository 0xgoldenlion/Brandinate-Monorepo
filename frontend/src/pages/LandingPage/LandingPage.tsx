import { Helmet } from "react-helmet";
//
import ComponentHero from "components/Components/ComponentHero";
import ComponentUserFlow from "components/Components/ComponentUserFlow";
import ComponentSection from "components/Components/ComponentSection";
import ComponentProduct from "components/Components/ComponentProduct";
import ComponentSlider from "components/Components/ComponentSlider";

function LandingPage() {
  return (
    <div className="nc-LandingPage relative overflow-hidden">
      <Helmet>
        <title>Brandinate | Home</title>
      </Helmet>
      <div className="container">
        <ComponentHero />
      </div>
      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <ComponentUserFlow />
        <ComponentSection />
        <ComponentProduct />
        <ComponentSlider />
      </div>
    </div>
  );
}

export default LandingPage;
