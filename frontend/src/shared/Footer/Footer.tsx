import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="nc-Footer relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <p>This is a submission for ETHOnline 2022. All references are for demonstration purposes only.</p>
      </div>
    </div>
  );
};

export default Footer;
