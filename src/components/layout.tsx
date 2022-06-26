import React from "react";
import Link from 'next/link';
import Head from "next/head";

type LayoutProps = {
  children: React.ReactNode,
};

function Layout({ children }: LayoutProps) {
  return (
    <React.Fragment>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <nav className="bg-gray-800">
        <div className="container mx-auto">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img className="block lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Interpol Data" />
                <h1 className="ml-4 text-white font-bold text-2xl font-mono">Interpol Data</h1>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link href="/">
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Red Notice</a>
                  </Link>
                  <Link href="/yellow">
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Yellow Notice</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/">
              <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Red Notice</a>
            </Link>
            <Link href="/yellow">
              <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Yellow Notice</a>
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </React.Fragment>
  );
}

export default Layout;
