import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen, BookmarkIcon, HeartIcon, ListIcon } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLikes } from "@/hooks/useLikes";
import { useLastReadSaakhi } from "@/hooks/useLastReadSaakhi";
import { useFetchInitialData } from "@/apis/hooks/useFetchInitialData";

export function LandingPage() {
  const { bookmarks } = useBookmarks();
  const { likes } = useLikes();
  const { lastReadSaakhiId } = useLastReadSaakhi();

  const { data: initialData, error } = useFetchInitialData(
    lastReadSaakhiId,
    likes,
    bookmarks
  );

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-orange-500 text-white p-4">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-3xl font-bold">Sikhi Academy</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {initialData.firstSaakhi && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-orange-600">
                  Start reading
                </h2>
                <p className="text-gray-600 mb-4">
                  Begin your journey with the first saakhi.
                </p>
                <div className="text-sm text-gray-500">
                  <p>{initialData.firstSaakhi.title}</p>
                  <p>{initialData.firstSaakhi.guruJi.name}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Link
                    to={`/saakhis/${initialData.firstSaakhi.id}`}
                    state={{ showSaakhiQueue: true }}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read first saakhi
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )}

          {initialData.lastReadSaakhi && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-orange-600">
                  Continue reading
                </h2>
                <p className="text-gray-600 mb-4">
                  Pick up where you left off.
                </p>
                <div className="text-sm text-gray-500">
                  <p>{initialData.lastReadSaakhi.title}</p>
                  <p>{initialData.lastReadSaakhi.guruJi.name}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Link
                    to={`/saakhis/${initialData.lastReadSaakhi.id}`}
                    state={{ showSaakhiQueue: true }}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continue reading
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )}

          {initialData.saakhisCount ? (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-orange-600">
                  All saakhis
                </h2>
                <p className="text-gray-600 mb-4">
                  Explore our full collection of {initialData.saakhisCount}{" "}
                  saakhis.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Link to="/saakhis">
                    <ListIcon className="mr-2 h-4 w-4" />
                    View all saakhis
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ) : null}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-orange-600">
                <BookmarkIcon className="mr-2 h-5 w-5" />
                Bookmarked saakhis
              </h2>

              {initialData.bookmarkedSaakhis.length === 0 ? (
                <p className="text-gray-600">
                  No bookmarks yet. Start reading and bookmark your favorite
                  saakhis!
                </p>
              ) : null}

              <ul className="space-y-2">
                {initialData.bookmarkedSaakhis
                  .slice(0, 5)
                  .map((bookmarkedSaakhi) => {
                    return (
                      <li
                        key={bookmarkedSaakhi.id}
                        className="border-b border-gray-200 pb-2"
                      >
                        <Link
                          to={`/saakhis/${bookmarkedSaakhi.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {bookmarkedSaakhi.title}
                        </Link>
                        <p className="text-sm text-gray-500">
                          {bookmarkedSaakhi.guruJi.name}
                        </p>
                      </li>
                    );
                  })}
              </ul>
            </CardContent>

            {initialData.bookmarkedSaakhis.length > 0 && (
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/saakhis?bookmarks=true">View all bookmarks</Link>
                </Button>
              </CardFooter>
            )}
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-orange-600">
                <HeartIcon className="mr-2 h-5 w-5" />
                Liked saakhis
              </h2>

              {initialData.likedSaakhis.length === 0 ? (
                <p className="text-gray-600">
                  No likes yet. Start reading and like the saakhis you enjoy!
                </p>
              ) : null}

              <ul className="space-y-2">
                {initialData.likedSaakhis.slice(0, 5).map((likedSaakhi) => {
                  return (
                    <li
                      key={likedSaakhi.id}
                      className="border-b border-gray-200 pb-2"
                    >
                      <Link
                        to={`/saakhis/${likedSaakhi.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {likedSaakhi.title}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {likedSaakhi.guruJi.name}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </CardContent>

            {initialData.likedSaakhis.length > 0 && (
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/saakhis?likes=true">View all liked saakhis</Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        </section>
      </main>

      <footer className="bg-orange-100 text-center p-4">
        <p className="text-gray-600">
          &copy; 2024 Sikhi Academy. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
