interface ButtonProps {
  onClick: () => void;
  content: string;
}
export const Button: React.FC<ButtonProps> = ({ onClick, content }) => {
  return (
    <button
      className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2 px-4 leading-tight focus:outline-none focus:shadow-outline border rounded"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {content}
    </button>
  );
};
