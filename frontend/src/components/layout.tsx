import Header from "./header";
import Footer from "./footer";
import { Loader } from "./ui/loader";
import { trackPageView } from "../utils/analytics";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Layout({
  children,
  headerAction,
  isLoading,
}: {
  children?: React.ReactNode;
  headerAction?: React.ReactNode;
  isLoading?: boolean;
}) {
  const location = useLocation();

  useEffect(() => {
    const fullPath = `${location.pathname}${location.search}`;
    trackPageView(fullPath);
  }, [location]);

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <Header headerAction={headerAction} />
      {isLoading ? (
        <div className="flex justify-center items-center flex-1">
          <Loader />
        </div>
      ) : (
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      )}

      <Footer />
    </div>
  );
}
