import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { HomeIcon, BookIcon } from "lucide-react";
import { useFetchAllSaakhiSummaries } from "@/apis/hooks/useFetchAllSaakhiSummaries";
import { Link } from "react-router-dom";
import { useFilteredSaakhis } from "@/hooks/useFilteredSaakhis";
import { useSaakhisPageTitle } from "@/hooks/useSaakhisPageTitle";

export function SaakhiListing() {
  const { data: allSaakhiSummaries, error } = useFetchAllSaakhiSummaries();
  const filteredSaakhis = useFilteredSaakhis(allSaakhiSummaries);
  const title = useSaakhisPageTitle();

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!allSaakhiSummaries) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <header className="bg-orange-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <HomeIcon className="mr-2" />
            Sikhi Academy
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-orange-800">{title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSaakhis.map((saakhi) => (
            <Card
              key={saakhi.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-orange-700">
                  {saakhi.title}
                </CardTitle>
                <CardDescription>
                  <p className="text-gray-600 mb-2">{saakhi.guruJi.name}</p>
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/saakhis/${saakhi.id}`}>
                    <BookIcon className="mr-2 h-4 w-4" />
                    Read Saakhi
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-orange-100 text-center p-4">
        <p className="text-gray-600">
          &copy; 2024 Sikhi Academy. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
