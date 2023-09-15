import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* <Header /> */}
      <main className={"bg-navaraNavy"}>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
