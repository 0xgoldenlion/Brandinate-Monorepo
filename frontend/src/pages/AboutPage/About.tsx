import { _getImgRd, _getPersonNameRd, _getTitleRd } from "contains/fakeData";
import { Helmet } from "react-helmet";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import NcImage from "shared/NcImage/NcImage";
import PageSubcription from "pages/CatalogPage/PageSubcription";

const BlogSingle = () => {
  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <Badge href="##" color="purple" name="ETHOnline 2022" />
          <h1
            className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
            title="Quiet ingenuity: 120,000 lunches and counting"
          >
            Keep up the spirit of the desire to travel around the world
          </h1>
          <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
            We’re an online magazine dedicated to covering the best in
            international product design. We started as a little blog back in
            2002 covering student work and over time
          </span>

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
              <Avatar
                containerClassName="flex-shrink-0"
                sizeClass="w-8 h-8 sm:h-11 sm:w-11 "
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <a className="block font-semibold" href="##">
                    Brandinate
                  </a>
                </div>
                <div className="text-xs mt-[6px]">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    About our Submission
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };

  const renderContent = () => {
    return (
      <div
        id="single-entry-content"
        className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert"
      >
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure vel
          officiis ipsum placeat itaque neque dolorem modi perspiciatis dolor
          distinctio veritatis sapiente, minima corrupti dolores necessitatibus
          suscipit accusantium dignissimos culpa cumque.
        </p>
        <p>
          It is a long established fact that a <strong>reader</strong> will be
          distracted by the readable content of a page when looking at its{" "}
          <strong>layout</strong>. The point of using Lorem Ipsum is that it has
          a more-or-less normal{" "}
          <a href="/#" target="_blank" rel="noopener noreferrer">
            distribution of letters.
          </a>{" "}
        </p>
        <ol>
          <li>We want everything to look good out of the box.</li>
          <li>
            Really just the first reason, that's the whole point of the plugin.
          </li>
          <li>
            Here's a third pretend reason though a list with three items looks
            more realistic than a list with two items.
          </li>
        </ol>
        <h3>Typography should be easy</h3>
        <p>
          So that's a header for you — with any luck if we've done our job
          correctly that will look pretty reasonable.
        </p>
        <p>Something a wise person once told me about typography is:</p>
        <blockquote>
          <p>
            Typography is pretty important if you don't want your stuff to look
            like trash. Make it good then it won't be bad.
          </p>
        </blockquote>
        <p>
          It's probably important that images look okay here by default as well:
        </p>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1501493870936-9c2e41625521?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1045&amp;q=80"
            alt="nc blog"
            className="rounded-2xl"
          />
          <PageSubcription />
          <figcaption>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure vel
            officiis ipsum placeat itaque neque dolorem modi perspiciatis dolor
            distinctio veritatis sapiente
          </figcaption>
        </figure>
        <p>
          Now I'm going to show you an example of an unordered list to make sure
          that looks good, too:
        </p>
        <ul>
          <li>So here is the first item in this list.</li>
          <li>In this example we're keeping the items short.</li>
          <li>Later, we'll use longer, more complex list items.</li>
        </ul>
        <p>And that's the end of this section.</p>
        <h2>Code should look okay by default.</h2>
        <p>
          I think most people are going to use{" "}
          <a href="https://highlightjs.org/">highlight.js</a> or{" "}
          <a href="https://prismjs.com/">Prism</a> or something if they want to
          style their code blocks but it wouldn't hurt to make them look{" "}
          <em>okay</em> out of the box, even with no syntax highlighting.
        </p>
        <p>
          What I've written here is probably long enough, but adding this final
          sentence can't hurt.
        </p>

        <p>Hopefully that looks good enough to you.</p>
        <h3>We still need to think about stacked headings though.</h3>
        <h4>
          Let's make sure we don't screw that up with <code>h4</code> elements,
          either.
        </h4>
        <p>
          Phew, with any luck we have styled the headings above this text and
          they look pretty good.
        </p>
        <p>
          Let's add a closing paragraph here so things end with a decently sized
          block of text. I can't explain why I want things to end that way but I
          have to assume it's because I think things will look weird or
          unbalanced if there is a heading too close to the end of the document.
        </p>
        <p>
          What I've written here is probably long enough, but adding this final
          sentence can't hurt.
        </p>
      </div>
    );
  };

  return (
    <div className="nc-PageSingle pt-8 lg:pt-16 ">
      <Helmet>
        <title>Brandinate | About</title>
      </Helmet>
      {renderHeader()}
      <NcImage
        className="w-full rounded-xl"
        containerClassName="container my-10 sm:my-12"
        src="https://images.unsplash.com/photo-1605487903301-a1dff2e6bbbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1957&q=80"
      />
      <div className="nc-SingleContent container space-y-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default BlogSingle;