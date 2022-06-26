import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import Sidebar, { initialValues } from '@/components/sidebar';
import Layout from '@/components/layout';
import Head from 'next/head';

export default function IndexPage() {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState(initialValues);
  const redNotice = trpc.useQuery(['interpol.red', { page, searchParams }], {
    keepPreviousData: true,
  });

  const onFormSubmit = (values: typeof initialValues) => {
    setPage(1);
    setSearchParams(values);
  }

  if (redNotice.isLoading) {
    return <div>Loading...</div>;
  }

  if (redNotice.isError) {
    return <div>{redNotice.error.message}</div>;
  }

  return (
    <Layout>
      <Head>
        <title>Red Notice</title>
      </Head>
      <div className="container mx-auto grid grid-cols-12 gap-4">
        <Sidebar
          onFormSubmit={onFormSubmit}
        />
        <div className="col-span-9 my-4">
          <h1 className="text-2xl text-gray-800 mb-2">Total number of public Red Notices in circulation: <span className="text-gray-800 font-bold">{redNotice.data?.total}</span></h1>
          <div className="grid grid-cols-4">
            {redNotice.data?._embedded.notices.map((notice) => (
              <div className="flex flex-col justify-items-center w-full items-center">
                <img
                  className="w-6/12"
                  src={notice._links.thumbnail?.href || 'https://www.interpol.int/bundles/interpolfront/images/photo-not-available.png'}
                />
                <div className="my-4 w-2/5">
                  <p className="text-base text-sky-700 font-extrabold">{notice.name} {notice.forename}</p>
                  <p className="text-sm text-gray-700 font-semibold">{new Date().getFullYear() - new Date(notice.date_of_birth).getFullYear()} years old</p>
                  <p className="text-sm text-gray-700 font-semibold">{notice.nationalities}</p>
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
            disabled={redNotice.data?._links.self?.href === redNotice.data?._links.first?.href}
          >
            Previous
          </button>
          <button
            className="m-2 px-4 py-2 font-semibold text-base bg-gray-700 text-white rounded-none shadow-sm disabled:bg-gray-500"
            onClick={() => {
              setPage(p => p + 1);
            }}
            disabled={redNotice.data?._links.self?.href === redNotice.data?._links.last?.href}
          >
            Next
          </button>
        </div >
      </div >
    </Layout>
  );
};
