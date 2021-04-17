export const Command: React.FC = ({ children }) => (
  <p>
    <span className="text-gray-600">&gt;</span> {children}
  </p>
);

export const Result: React.FC = ({ children }) => (
  <div className="pl-4 text-gray-400">{children}</div>
);
