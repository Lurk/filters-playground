import { RulesArray, operatorsAsArray } from "@barhamon/filters";
import { Button } from "./button";

const Rule: React.FC<{
  value: RulesArray<any, any>;
  removeRule: () => void;
}> = ({ value: [key, op, value], removeRule }) => {
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
        value={op}
        onChange={() => {}}
      >
        {operatorsAsArray().map((o) => (
          <option
            value={o.value}
            // selected={op === o.value}
            onChange={() => {}}
            key={o.value}
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
      <Button onClick={removeRule} content="- remove rule" />
    </div>
  );
};

export const Form: React.FC<{
  filters: RulesArray<any, any>[];
  setFilters: (filters: RulesArray<any, any>[]) => void;
}> = ({ filters, setFilters }) => {
  const removeRule = (i: number) =>
    setFilters([...filters.slice(0, i), ...filters.slice(i + 1)]);

  return (
    <form>
      {filters.map((rule, i) => (
        <Rule value={rule} key={i} removeRule={() => removeRule(i)} />
      ))}
    </form>
  );
};
