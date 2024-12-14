import { NextPageContext } from 'next';
import { ErrorProps } from 'next/error';
import Head from 'next/head';

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <>
      <Head>
        <title>Error {statusCode} - Caelus Platform</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="p-8 bg-white shadow-xl rounded-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'}
          </h1>
          <p className="text-gray-600">
            Please try refreshing the page or contact support if the problem persists.
          </p>
        </div>
      </div>
    </>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;