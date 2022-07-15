import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import Sidebar, { initialValues } from '@/components/sidebar';
import Layout from '@/components/layout';
import Head from 'next/head';
import { countryCodeLookup } from '@/utils/nationality';

export default function IndexPage() {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState(initialValues);
  const {
    isLoading,
    isFetching,
    isError,
    data: yellowNotices,
    error,
  } = trpc.useQuery(['interpol.yellow', { page, searchParams }], {
    keepPreviousData: true,
  });

  const onFormSubmit = (values: typeof initialValues) => {
    setPage(1);
    setSearchParams(values);
  }

  if (isLoading || isFetching) {
    return (
      <Layout>
        <div className="container mx-auto mt-10 w-full text-center font-bold text-8xl">Loading...</div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="container mx-auto mt-10 w-full text-center font-bold text-8xl">{error.message}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Red Notice</title>
      </Head>
      <div className="container mx-auto grid grid-cols-12 gap-4">
        <Sidebar
          onFormSubmit={onFormSubmit}
          showWantedBy={false}
        />
        <div className="col-span-9 my-4">
          <h1 className="text-2xl text-gray-800 mb-2">Total number of public Yellow Notices in circulation: <span className="text-gray-800 font-bold">{yellowNotices?.total}</span></h1>
          <div className="grid grid-cols-4">
            {yellowNotices?._embedded.notices.map((notice) => (
              <div key={notice.entity_id} className="flex flex-col justify-items-center w-full items-center">
                <img
                  className="w-6/12"
                  src={notice._links.thumbnail?.href || 'https://www.interpol.int/bundles/interpolfront/images/photo-not-available.png'}
                />
                <div className="my-4 w-2/5">
                  <p className="text-base text-sky-700 font-extrabold">{notice.name} {notice.forename}</p>
                  <p className="text-sm text-gray-700 font-semibold">{new Date().getFullYear() - new Date(notice.date_of_birth).getFullYear()} years old</p>
                  <p className="text-sm text-gray-700 font-semibold">{countryCodeLookup[notice.nationalities?.[0]]}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="m-2 px-4 py-2 font-semibold text-base bg-gray-700 text-white rounded-none shadow-sm disabled:bg-gray-500"
            onClick={() => {
              if (page - 1 <= 0) {
                return;
              }
              setPage(p => p - 1);
            }}
            disabled={yellowNotices?._links.self?.href === yellowNotices?._links.first?.href}
          >
            Previous
          </button>
          <button
            className="m-2 px-4 py-2 font-semibold text-base bg-gray-700 text-white rounded-none shadow-sm disabled:bg-gray-500"
            onClick={() => {
              setPage(p => p + 1);
            }}
            disabled={yellowNotices?._links.self?.href === yellowNotices?._links.last?.href}
          >
            Next
          </button>
        </div >
      </div >
    </Layout>
  );
};
