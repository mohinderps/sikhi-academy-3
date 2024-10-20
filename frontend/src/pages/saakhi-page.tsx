import { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BookmarkIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  ListIcon,
} from "lucide-react";
import { useLastReadSaakhi } from "@/hooks/useLastReadSaakhi";
import { useSaakhiBookmark } from "@/hooks/useSaakhiBookmark";
import { useSaakhiLike } from "@/hooks/useSaakhiLike";
import { useFetchSaakhiById } from "@/apis/hooks/useFetchSaakhiById";
import { useFetchAllSaakhiSummaries } from "@/apis/hooks/useFetchAllSaakhiSummaries";

export function SaakhiPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const showSaakhiQueue = location.state?.showSaakhiQueue || false;
  const currentSaakhiId = id!;
  const { updateLastReadSaakhi } = useLastReadSaakhi();
  const { isSaakhiBookmarked, toggleSaakhiBookmark } =
    useSaakhiBookmark(currentSaakhiId);
  const { isSaakhiLiked, toggleSaakhiLike } = useSaakhiLike(currentSaakhiId);
  const {
    data: saakhiData,
    error: saakhiError,
    isLoading: isSaakhiLoading,
  } = useFetchSaakhiById(currentSaakhiId);
  const {
    data: allSaakhiSummaries,
    error: summariesError,
    isLoading: isSummariesLoading,
  } = useFetchAllSaakhiSummaries(showSaakhiQueue);

  useEffect(() => {
    if (saakhiData?.currentSaakhi) {
      updateLastReadSaakhi(currentSaakhiId);
    }
  }, [saakhiData, currentSaakhiId, updateLastReadSaakhi]);

  if (isSaakhiLoading || isSummariesLoading) {
    return <div>Loading...</div>;
  }

  if (
    saakhiError ||
    summariesError ||
    !saakhiData ||
    !saakhiData.currentSaakhi ||
    (showSaakhiQueue && !allSaakhiSummaries)
  ) {
    return (
      <div>
        {saakhiError?.message || summariesError?.message || "Saakhi not found"}
      </div>
    );
  }

  const { currentSaakhi, previousSaakhi, nextSaakhi } = saakhiData;

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <header className="bg-orange-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <HomeIcon className="mr-2" />
            Sikhi Academy
          </Link>
          {showSaakhiQueue && allSaakhiSummaries ? (
            <nav>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-orange-200"
                  >
                    <ListIcon className="mr-2 h-4 w-4" />
                    All Saakhis
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <ScrollArea className="h-[calc(100vh-4rem)]">
                    <h2 className="text-xl font-bold mb-4 text-orange-800">
                      All Saakhis
                    </h2>
                    {allSaakhiSummaries.map((summary) => (
                      <Link to={`/saakhis/${summary.id}`} key={summary.id}>
                        <div
                          className={`mb-2 p-2 rounded cursor-pointer ${
                            summary.id === currentSaakhiId
                              ? "bg-orange-500 text-white"
                              : "hover:bg-orange-200"
                          }`}
                        >
                          <h3 className="font-semibold">{summary.title}</h3>
                          <p className="text-sm">{summary.guruJi.name}</p>
                        </div>
                      </Link>
                    ))}
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </nav>
          ) : null}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 overflow-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-2 text-orange-600">
              {currentSaakhi.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {currentSaakhi.guruJi.name}
            </p>
            <div className="flex space-x-4 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleSaakhiBookmark}
                className={
                  isSaakhiBookmarked ? "text-blue-500" : "text-gray-500"
                }
              >
                <BookmarkIcon className="mr-2 h-4 w-4" />
                {isSaakhiBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleSaakhiLike}
                className={isSaakhiLiked ? "text-red-500" : "text-gray-500"}
              >
                <HeartIcon className="mr-2 h-4 w-4" />
                {isSaakhiLiked ? "Liked" : "Like"}
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-inner">
              <p className="text-lg leading-relaxed">{currentSaakhi.content}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-between items-center space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
          {previousSaakhi ? (
            <Button asChild variant="outline">
              <Link to={`/saakhis/${previousSaakhi.id}`}>
                <ChevronLeftIcon className="mr-2 h-4 w-4" />
                Previous: {previousSaakhi.title}
              </Link>
            </Button>
          ) : (
            <div></div>
          )}
          {nextSaakhi && (
            <Button asChild variant="outline">
              <Link to={`/saakhis/${nextSaakhi.id}`}>
                Next: {nextSaakhi.title}
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
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
