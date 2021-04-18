import { RulesArray, operatorsAsArray } from "@barhamon/filters";
import { Button } from "./button";

const Rule: React.FC<{
  rule: RulesArray<any, any>;
  removeRule: () => void;
  replaceRule: (newRule: RulesArray<any, any>) => void;
}> = ({ rule, removeRule, replaceRule }) => {
  const updateRule = (type: number, value: any) => {
    const tmp: RulesArray<any, any> = [...rule];
    tmp[type] = value;
    replaceRule(tmp);
  };

  return (
    <div className="w-full mb-2">
      <input
        value={rule[0]}
        onChange={({ target }) => updateRule(0, target.value)}
        className="shadow appearance-none border rounded py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mr-2"
      />
      <select
        id="operators"
        className="shadow appearance-none border rounded py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mr-2"
        value={rule[1]}
        onChange={({ target }) => updateRule(1, parseInt(target.value))}
      >
        {operatorsAsArray().map((o) => (
          <option value={o.value} key={o.value}>
            {o.content}
          </option>
        ))}
      </select>
      <input
        value={rule[2].toString()}
        onChange={({ target }) => updateRule(2, target.value)}
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

  const replaceRule = (i: number, rule: RulesArray<any, any>) =>
    setFilters([...filters.slice(0, i), rule, ...filters.slice(i + 1)]);
  return (
    <form>
      {filters.map((rule, i) => (
        <Rule
          rule={rule}
          key={i}
          removeRule={() => removeRule(i)}
          replaceRule={(rule) => replaceRule(i, rule)}
        />
      ))}
    </form>
  );
};
