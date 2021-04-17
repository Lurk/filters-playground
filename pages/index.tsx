import Head from "next/head";
import {
  operatorsAsArray,
  toArray,
  toString,
  toQueryString,
  toMongoQuery,
  fromArray,
  RulesArray,
  Operators,
} from "@barhamon/filters";
import { useState } from "react";
import { Command, Result } from "../components/code";
import { Button } from "../components/button";

const Rule: React.FC<{
  value: RulesArray<any, any>;
}> = ({ value: [key, op, value] }) => {
  return (
    <div className="w-full mb-2">
      <input
        value={key}
        onChange={() => {}}
        className="shadow appearance-none border rounded py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mr-2"
      />
      <select
        id="operators"
        className="shadow appearance-none border rounded py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mr-2"
      >
        {operatorsAsArray().map((o, i) => (
          <option
            value={o.value}
            selected={op === o.value}
            onChange={() => {}}
            key={i}
          >
            {o.content}
          </option>
        ))}
      </select>
      <input
        value={value.toString()}
        onChange={() => {}}
        className="shadow appearance-none border rounded py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mr-2"
      />
      <Button onClick={() => {}} content="- remove rule" />
    </div>
  );
};

const Form: React.FC<{ filters: RulesArray<any, any>[] }> = ({ filters }) => {
  return (
    <form>
      {filters.map((rule, i) => (
        <Rule value={rule} key={i} />
      ))}
    </form>
  );
};

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
          <Form filters={filters} />
          <Button onClick={addDummyRule} content="+ add rule" />
        </div>
        <div className="divide-y divide-gray-600">
          <Command>filters</Command>
          <Result>
            <pre>{JSON.stringify(fromArray(filters), null, 2)}</pre>
          </Result>

          <Command>toString(filters)</Command>
          <Result>{toString(fromArray(filters))}</Result>

          <Command>toQueryString(filters)</Command>
          <Result>{toQueryString(fromArray(filters))}</Result>

          <Command>toArray(filters)</Command>
          <Result>
            <pre>{JSON.stringify(filters, null, 2)}</pre>
          </Result>

          <Command>toMongoQuery(filters)</Command>
          <Result>
            <pre>
              {JSON.stringify(toMongoQuery(fromArray(filters)), null, 2)}
            </pre>
          </Result>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
