import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen, BookmarkIcon, HeartIcon, ListIcon } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLikes } from "@/hooks/useLikes";
import { useLastReadSaakhi } from "@/hooks/useLastReadSaakhi";
import { fetchInitialData } from "@/api";
import { SaakhiSummary } from "@/types";

export function LandingPage() {
  const { bookmarks } = useBookmarks();
  const { likes } = useLikes();
  const { lastReadSaakhiId } = useLastReadSaakhi();
  const [saakhisCount, setSaakhisCount] = useState<number | null>(null);
  const [firstSaakhi, setFirstSaakhi] = useState<SaakhiSummary | null>(null);
  const [lastReadSaakhi, setLastReadSaakhi] = useState<SaakhiSummary | null>(
    null
  );
  const [likedSaakhis, setLikedSaakhis] = useState<SaakhiSummary[]>([]);
  const [bookmarkedSaakhis, setbookmarkedSaakhis] = useState<SaakhiSummary[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const initialData = await fetchInitialData(
        lastReadSaakhiId,
        likes,
        bookmarks
      );
      const {
        saakhisCount,
        firstSaakhi: first,
        lastReadSaakhi: lastRead,
        likedSaakhis: liked,
        bookmarkedSaakhis: bookmarked,
      } = initialData;

      setSaakhisCount(saakhisCount);

      if (first) {
        setFirstSaakhi(first);
      }
      if (lastRead) {
        setLastReadSaakhi(lastRead);
      }
      if (liked.length > 0) {
        setLikedSaakhis(liked);
      }
      if (bookmarked.length > 0) {
        setbookmarkedSaakhis(bookmarked);
      }
    };
    // if (lastReadSaakhiId || likes.length > 0 || bookmarks.length > 0) {
    //   fetchData();
    // }

    fetchData();
  }, [lastReadSaakhiId, likes, bookmarks]);

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-orange-500 text-white p-4">
        <div className="container mx-auto flex justify-center items-cente">
          <h1 className="text-3xl font-bold">Sikhi Academy</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {firstSaakhi && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-orange-600">
                  Start reading
                </h2>
                <p className="text-gray-600 mb-4">
                  Begin your journey with the first saakhi.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Title: {firstSaakhi.title}</p>
                  <p>Guru ji: {firstSaakhi.guruJiName}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Link to={`/saakhis/${firstSaakhi.id}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read first saakhi
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )}

          {lastReadSaakhi && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-orange-600">
                  Continue reading
                </h2>
                <p className="text-gray-600 mb-4">
                  Pick up where you left off.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Title: {lastReadSaakhi.title}</p>
                  <p>Guru ji: {lastReadSaakhi.guruJiName}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Link to={`/saakhis/${lastReadSaakhi.id}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continue reading
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )}

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-orange-600">
                All saakhis
              </h2>
              <p className="text-gray-600 mb-4">
                Explore our full collection of {saakhisCount} saakhis.
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
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-orange-600">
                <BookmarkIcon className="mr-2 h-5 w-5" />
                Bookmarked saakhis
              </h2>

              {bookmarks.length === 0 ? (
                <p className="text-gray-600">
                  No bookmarks yet. Start reading and bookmark your favorite
                  saakhis!
                </p>
              ) : null}

              <ul className="space-y-2">
                {bookmarkedSaakhis.slice(0, 5).map((bookmarkedSaakhi) => {
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
                        {bookmarkedSaakhi.guruJiName}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </CardContent>

            {bookmarks.length > 0 && (
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/saakhis">View all bookmarks</Link>
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

              {likes.length === 0 ? (
                <p className="text-gray-600">
                  No likes yet. Start reading and like the saakhis you enjoy!
                </p>
              ) : null}

              <ul className="space-y-2">
                {likedSaakhis.slice(0, 5).map((likedSaakhi) => {
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
                        {likedSaakhi.guruJiName}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </CardContent>

            {likes.length > 0 && (
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/saakhis">View all liked saakhis</Link>
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
