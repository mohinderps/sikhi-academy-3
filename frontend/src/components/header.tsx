import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({
  headerAction,
}: {
  headerAction?: React.ReactNode;
}) {
  return (
    <header className="bg-orange-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <HomeIcon className="mr-2" />
          Sikhi Academy
        </Link>
        {headerAction}
      </div>
    </header>
  );
}
