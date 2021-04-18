import { useState } from "react";

const Command: React.FC<{ isCollapsed: boolean; onClick: () => void }> = ({
  children,
  isCollapsed,
  onClick,
}) => (
  <p className="cursor-pointer" onClick={onClick}>
    <span
      className={`inline-block text-gray-600 mr-2${
        isCollapsed ? "" : " transform rotate-90"
      }`}
    >
      &gt;
    </span>
    {children}
  </p>
);

const Result: React.FC<{ isHidden: boolean }> = ({ children, isHidden }) => (
  <div className={`pl-4 break-all text-gray-400${isHidden ? " hidden" : ""}`}>
    {children}
  </div>
);

export const Code: React.FC<{ command: string; collapse?: boolean }> = ({
  command,
  children,
  collapse = true,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapse);

  return (
    <>
      <Command
        isCollapsed={isCollapsed}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {command}
      </Command>
      <Result isHidden={isCollapsed}>{children}</Result>
    </>
  );
};
