import Header from "./header";
import Footer from "./footer";
import { Loader } from "./ui/loader";

export default function Layout({
  children,
  headerAction,
  isLoading,
}: {
  children?: React.ReactNode;
  headerAction?: React.ReactNode;
  isLoading?: boolean;
}) {
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
