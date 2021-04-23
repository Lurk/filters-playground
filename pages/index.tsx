import Head from "next/head";
import Link from "next/link";
import {
  toString,
  toQueryString,
  toMongoQuery,
  Operators,
  fromQueryString,
  Filters,
} from "@barhamon/filters";
import { version, name } from "@barhamon/filters/package.json";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Code } from "../components/code";
import { Button } from "../components/button";
import { Form } from "../components/form";

function getRulesArrayFromQuery(str: any) {
  if (str) {
    try {
      return fromQueryString(str);
    } catch (e) {}
  }
  return [];
}

const Home: NextPage<{ fromUrl: Filters<any> }> = ({ fromUrl }) => {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters<any>>(fromUrl);
  const addDummyRule = () => {
    setFilters([...filters, ["fieldName", Operators.equal, 0]]);
  };

  useEffect(() => {
    router.push(`/?filters=${toQueryString(filters)}`);
  }, [filters]);

  return (
    <div className="min-h-screen flex justify-between flex-col">
      <Head>
        <title>filters playground</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="m-4 text-xl text-gray-400">
        <h1>
          Playground for{" "}
          <Link
            href={`https://www.npmjs.com/package/@barhamon/filters/v/${version}`}
          >
            <a className="no-underline hover:underline text-gray-300">
              {name}:{version}
            </a>
          </Link>
        </h1>
      </header>
      <main className="grid grid-cols-2 gap-2 m-4 mb-auto">
        <div className=" ">
          <Form filters={filters} setFilters={setFilters} />
          <Button onClick={addDummyRule} content="+ add rule" />
        </div>
        <div className="divide-y divide-gray-600">
          <Code command="filters">
            <pre>{JSON.stringify(filters, null, 2)}</pre>
          </Code>

          <Code command="toString(filters)" collapse={false}>
            {toString(filters)}
          </Code>

          <Code command="toQueryString(filters)" collapse={false}>
            {toQueryString(filters)}
          </Code>

          <Code command="toMongoQuery(filters)">
            <pre>{JSON.stringify(toMongoQuery(filters), null, 2)}</pre>
          </Code>
        </div>
      </main>

      <footer className="m-4 flex justify-center">
        <img
          className="filter invert mr-2"
          height="16"
          width="16"
          src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/github.svg"
        />
        <a
          className="no-underline hover:underline text-gray-400"
          href="https://github.com/Lurk/filters-playground"
        >
          fork me
        </a>
      </footer>
    </div>
  );
};

export default Home;

Home.getInitialProps = (ctx) => {
  return { fromUrl: getRulesArrayFromQuery(ctx.query.filters) };
};
