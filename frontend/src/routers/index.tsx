import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import BlogSingle from "pages/AboutPage/About";
import Footer from "shared/Footer/Footer";
import Page404 from "pages/404Page/Page404";
import PageCollection2 from "pages/CatalogPage/CatalogPage";
import PageHome2 from "pages/HomePage/Home";
import PageSubcription from "pages/CatalogPage/PageSubcription";
import ProductDetailPage from "pages/ProductPage/ProductPage";
import ScrollToTop from "./ScrollToTop";
import SiteHeader from "components/Header/SiteHeader";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome2 },
  { path: "/#", exact: true, component: PageHome2 },
  //
  { path: "/product-detail", component: ProductDetailPage },
  //
  { path: "/page-collection-2", component: PageCollection2 },
  //
  { path: "/blog-single", component: BlogSingle },
];

const Routes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteHeader />
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        <Route component={Page404} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
