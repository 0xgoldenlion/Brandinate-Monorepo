import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import BlogSingle from "pages/AboutPage/About";
import Footer from "shared/Footer/Footer";
import Page404 from "pages/404Page/Page404";
import PageHome2 from "pages/LandingPage/LandingPage";
import Header from "components/Header/Header";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome2 },
  { path: "/#", exact: true, component: PageHome2 },
  //
  { path: "/blog-single", component: BlogSingle },
];

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
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