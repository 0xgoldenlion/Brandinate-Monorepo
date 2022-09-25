import Logo from "shared/Logo/Logo";

const HeaderNavigation = () => {
  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-slate-900">
      <div className="container">
        <div className="h-20 flex justify-between">
          <div className="flex items-center md:hidden flex-1"></div>

          <div className="flex lg:flex-1 items-center space-x-3 sm:space-x-8">
            <Logo />
          </div>
          <div className="flex-1 flex items-center justify-end space-x-4">
            <a
              className="hover:bg-gray-200 rounded-lg border-2 p-2"
              href="https://demo.brandinate.com/login"
            >
              Brand Portal
            </a>
            <a
              className="hover:bg-gray-200 rounded-lg border-2 p-2"
              href="https://user.brandinate.com/login"
            >
              User Collection
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavigation;
