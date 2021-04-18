import Head from "next/head";
import {
  toString,
  toQueryString,
  toMongoQuery,
  fromArray,
  RulesArray,
  Operators,
} from "@barhamon/filters";
import { useState } from "react";
import { Code } from "../components/code";
import { Button } from "../components/button";
import { Form } from "../components/form";

export default function Home() {
  const [filters, setFilters] = useState<RulesArray<any, any>[]>([]);

  const addDummyRule = () => {
    setFilters([...filters, ["fieldName", Operators.equal, 0]]);
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>filters playground</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-2 gap-2 m-4">
        <div className=" ">
          <Form filters={filters} setFilters={setFilters} />
          <Button onClick={addDummyRule} content="+ add rule" />
        </div>
        <div className="divide-y divide-gray-600">
          <Code command="filters">
            <pre>{JSON.stringify(fromArray(filters), null, 2)}</pre>
          </Code>

          <Code command="toString(filters)" collapse={false}>
            {toString(fromArray(filters))}
          </Code>

          <Code command="toQueryString(filters)" collapse={false}>
            {toQueryString(fromArray(filters))}
          </Code>

          <Code command="toArray(filters)">
            <pre>{JSON.stringify(filters, null, 2)}</pre>
          </Code>

          <Code command="toMongoQuery(filters)">
            <pre>
              {JSON.stringify(toMongoQuery(fromArray(filters)), null, 2)}
            </pre>
          </Code>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
