import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLikes } from "@/hooks/useLikes";

// Mock data for saakhis
const saakhis = [
  {
    id: "1",
    title: "The True Bargain",
    guruJi: "Guru Nanak Dev Ji",
    summary: "Learn about true devotion and honest living.",
    content:
      "ਇੱਕ ਵਾਰ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਇੱਕ ਸ਼ਹਿਰ ਵਿੱਚ ਗਏ। ਉੱਥੇ ਉਨ੍ਹਾਂ ਨੇ ਇੱਕ ਵਪਾਰੀ ਨੂੰ ਵੇਖਿਆ ਜੋ ਆਪਣੇ ਗਾਹਕਾਂ ਨਾਲ ਬੇਈਮਾਨੀ ਕਰ ਰਿਹਾ ਸੀ। ਗੁਰੂ ਜੀ ਨੇ ਉਸ ਵਪਾਰੀ ਨੂੰ ਸਿਖਾਇਆ ਕਿ ਸੱਚਾ ਵਪਾਰ ਕਰਨਾ ਕਿੰਨਾ ਮਹੱਤਵਪੂਰਨ ਹੈ। ਉਨ੍ਹਾਂ ਨੇ ਕਿਹਾ, 'ਸੱਚਾ ਸੌਦਾ ਕਰ, ਤਾਂ ਤੂੰ ਸੱਚੇ ਦਰਬਾਰ ਵਿੱਚ ਸਥਾਨ ਪਾਏਂਗਾ।' ਇਸ ਸਿੱਖਿਆ ਨੇ ਵਪਾਰੀ ਦੇ ਦਿਲ ਨੂੰ ਛੂਹ ਲਿਆ ਅਤੇ ਉਸਨੇ ਆਪਣੇ ਜੀਵਨ ਵਿੱਚ ਇਮਾਨਦਾਰੀ ਨੂੰ ਅਪਣਾ ਲਿਆ।",
  },
  {
    id: "2",
    title: "The Carpenter's Honesty",
    guruJi: "Guru Arjan Dev Ji",
    summary: "Discover the importance of truthfulness in life.",
    content:
      "ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦੇ ਦਰਬਾਰ ਵਿੱਚ ਇੱਕ ਗਰੀਬ ਤਰਖਾਣ ਆਇਆ। ਉਸਨੇ ਗੁਰੂ ਜੀ ਨੂੰ ਦੱਸਿਆ ਕਿ ਉਹ ਬਹੁਤ ਇਮਾਨਦਾਰ ਹੈ ਪਰ ਫਿਰ ਵੀ ਗਰੀਬ ਹੈ। ਗੁਰੂ ਜੀ ਨੇ ਉਸਨੂੰ ਇੱਕ ਸੋਨੇ ਦਾ ਸਿੱਕਾ ਦਿੱਤਾ ਅਤੇ ਕਿਹਾ ਕਿ ਉਹ ਇਸਨੂੰ ਕਿਸੇ ਨੂੰ ਨਾ ਦੱਸੇ। ਕੁਝ ਦਿਨਾਂ ਬਾਅਦ ਗੁਰੂ ਜੀ ਨੇ ਉਸਨੂੰ ਬੁਲਾਇਆ ਅਤੇ ਪੁੱਛਿਆ ਕਿ ਉਸਨੇ ਸਿੱਕੇ ਬਾਰੇ ਕਿਸੇ ਨੂੰ ਦੱਸਿਆ ਹੈ। ਤਰਖਾਣ ਨੇ ਸੱਚ ਬੋਲਿਆ ਕਿ ਉਸਨੇ ਆਪਣੀ ਪਤਨੀ ਨੂੰ ਦੱਸਿਆ ਹੈ। ਗੁਰੂ ਜੀ ਨੇ ਉਸਦੀ ਇਮਾਨਦਾਰੀ ਤੇ ਖੁਸ਼ ਹੋ ਕੇ ਉਸਨੂੰ ਹੋਰ ਇਨਾਮ ਦਿੱਤਾ ਅਤੇ ਕਿਹਾ, 'ਸੱਚ ਬੋਲਣਾ ਹਮੇਸ਼ਾ ਫਾਇਦੇਮੰਦ ਹੁੰਦਾ ਹੈ।'",
  },
  {
    id: "3",
    title: "The Milk and the Jasmine Flower",
    guruJi: "Guru Nanak Dev Ji",
    summary: "Explore the purity of the soul and good company.",
    content:
      "ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਨੇ ਆਪਣੇ ਸਿੱਖਾਂ ਨੂੰ ਇੱਕ ਸੁੰਦਰ ਉਦਾਹਰਣ ਦਿੱਤੀ। ਉਨ੍ਹਾਂ ਨੇ ਕਿਹਾ, 'ਜਿਵੇਂ ਦੁੱਧ ਵਿੱਚ ਚਮੇਲੀ ਦਾ ਫੁੱਲ ਪਾਉਣ ਨਾਲ ਦੁੱਧ ਖੁਸ਼ਬੂਦਾਰ ਹੋ ਜਾਂਦਾ ਹੈ, ਉਸੇ ਤਰ੍ਹਾਂ ਚੰਗੀ ਸੰਗਤ ਨਾਲ ਸਾਡਾ ਮਨ ਪਵਿੱਤਰ ਹੋ ਜਾਂਦਾ ਹੈ।' ਇਸ ਸਿੱਖਿਆ ਨੇ ਲੋਕਾਂ ਨੂੰ ਚੰਗੀ ਸੰਗਤ ਦੀ ਮਹੱਤਤਾ ਸਮਝਾਈ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਆਪਣੇ ਜੀਵਨ ਵਿੱਚ ਚੰਗੇ ਲੋਕਾਂ ਦੀ ਸੰਗਤ ਕਰਨ ਲਈ ਪ੍ਰੇਰਿਤ ਕੀਤਾ।",
  },
  {
    id: "4",
    title: "The Farmer's Faith",
    guruJi: "Guru Amar Das Ji",
    summary: "Learn about unwavering faith and perseverance.",
    content:
      "ਇੱਕ ਵਾਰ ਇੱਕ ਕਿਸਾਨ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਕੋਲ ਆਇਆ। ਉਸਨੇ ਕਿਹਾ, 'ਗੁਰੂ ਜੀ, ਮੇਰੀ ਫਸਲ ਸੁੱਕ ਰਹੀ ਹੈ। ਕੀ ਤੁਸੀਂ ਮੇਰੇ ਲਈ ਪ੍ਰਾਰਥਨਾ ਕਰੋਗੇ?' ਗੁਰੂ ਜੀ ਨੇ ਕਿਹਾ, 'ਭਾਈ, ਤੂੰ ਆਪਣੀ ਮਿਹਨਤ ਕਰ ਅਤੇ ਵਾਹਿਗੁਰੂ 'ਤੇ ਭਰੋਸਾ ਰੱਖ।' ਕਿਸਾਨ ਨੇ ਗੁਰੂ ਜੀ ਦੀ ਸਲਾਹ ਮੰਨੀ ਅਤੇ ਦਿਨ-ਰਾਤ ਮਿਹਨਤ ਕੀਤੀ। ਕੁਝ ਦਿਨਾਂ ਬਾਅਦ ਮੀਂਹ ਪਿਆ ਅਤੇ ਉਸਦੀ ਫਸਲ ਬਚ ਗਈ। ਇਸ ਘਟਨਾ ਨੇ ਕਿਸਾਨ ਨੂੰ ਸਿਖਾਇਆ ਕਿ ਮਿਹਨਤ ਅਤੇ ਵਿਸ਼ਵਾਸ ਦਾ ਮੇਲ ਕਿੰਨਾ ਸ਼ਕਤੀਸ਼ਾਲੀ ਹੁੰਦਾ ਹੈ।",
  },
  {
    id: "5",
    title: "The Humble King",
    guruJi: "Guru Gobind Singh Ji",
    summary: "Discover the power of humility in leadership.",
    content:
      "ਇੱਕ ਵਾਰ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਦਰਬਾਰ ਵਿੱਚ ਇੱਕ ਰਾਜਾ ਆਇਆ। ਉਹ ਆਪਣੇ ਰਾਜ ਦੀ ਸ਼ਾਨ ਵਿੱਚ ਬਹੁਤ ਘੁਮੰਡੀ ਸੀ। ਗੁਰੂ ਜੀ ਨੇ ਉਸਨੂੰ ਇੱਕ ਕਟੋਰਾ ਦਿੱਤਾ ਅਤੇ ਕਿਹਾ, 'ਇਸ ਨੂੰ ਪਾਣੀ ਨਾਲ ਭਰ ਕੇ ਲਿਆਓ, ਪਰ ਇੱਕ ਸ਼ਰਤ ਹੈ - ਪਾਣੀ ਡੁੱਲ੍ਹਣਾ ਨਹੀਂ ਚਾਹੀਦਾ।' ਰਾਜੇ ਨੇ ਬਹੁਤ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ ਪਰ ਉਹ ਅਸਫਲ ਰਿਹਾ। ਫਿਰ ਗੁਰੂ ਜ਼ੀ ਨੇ ਇੱਕ ਸਾਧਾਰਨ ਸਿੱਖ ਨੂੰ ਇਹੀ ਕੰਮ ਕਰਨ ਲਈ ਕਿਹਾ। ਸਿੱਖ ਨੇ ਨਿਮਰਤਾ ਨਾਲ ਕਟੋਰੇ ਨੂੰ ਸਿਰ 'ਤੇ ਰੱਖ ਕੇ ਪਾਣੀ ਭਰ ਲਿਆਂਦਾ। ਗੁਰੂ ਜੀ ਨੇ ਰਾਜੇ ਨੂੰ ਸਮਝਾਇਆ, 'ਜਦੋਂ ਅਸੀਂ ਨਿਮਰ ਹੁੰਦੇ ਹਾਂ, ਤਾਂ ਸਾਡੇ ਕੰਮ ਵੀ ਸਫਲ ਹੁੰਦੇ ਹਨ।' ਇਸ ਘਟਨਾ ਨੇ ਰਾਜੇ ਨੂੰ ਨਿਮਰਤਾ ਦਾ ਪਾਠ ਸਿਖਾਇਆ।",
  },
];

export function SaakhiPage() {
  const { id } = useParams<{ id: string }>();
  const currentSaakhiId = id!;
  const { updateLastReadSaakhi } = useLastReadSaakhi();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const isSaakhiBookmarked = isBookmarked(currentSaakhiId);
  const { isLiked, addLike, removeLike } = useLikes();
  const isSaakhiLiked = isLiked(currentSaakhiId);

  useEffect(() => {
    if (currentSaakhiId) {
      updateLastReadSaakhi(currentSaakhiId);
    }
  }, [currentSaakhiId, updateLastReadSaakhi]);

  const currentSaakhi = saakhis.find((s) => s.id === currentSaakhiId);

  if (!currentSaakhi) {
    return <div>Saakhi not found</div>;
  }

  const currentIndex = saakhis.findIndex((s) => s.id === currentSaakhiId);
  const prevSaakhi = currentIndex > 0 ? saakhis[currentIndex - 1] : null;
  const nextSaakhi =
    currentIndex < saakhis.length - 1 ? saakhis[currentIndex + 1] : null;

  const handleBookmark = () => {
    if (isBookmarked(currentSaakhiId)) {
      removeBookmark(currentSaakhiId);
    } else {
      addBookmark(currentSaakhiId);
    }
  };

  const handleLike = () => {
    if (isLiked(currentSaakhiId)) {
      removeLike(currentSaakhiId);
    } else {
      addLike(currentSaakhiId);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <header className="bg-orange-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold flex items-center">
            <HomeIcon className="mr-2" />
            Sikhi Academy
          </a>
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
                  {saakhis.map((saakhi) => (
                    <div
                      key={saakhi.id}
                      className={`mb-2 p-2 rounded cursor-pointer ${
                        saakhi.id === currentSaakhiId
                          ? "bg-orange-500 text-white"
                          : "hover:bg-orange-200"
                      }`}
                      // onClick={() => {
                      //   setCurrentSaakhiId(saakhi.id);
                      //   document.body.click(); // Close the sheet
                      // }}
                    >
                      <h3 className="font-semibold">{saakhi.title}</h3>
                      <p className="text-sm">{saakhi.guruJi}</p>
                    </div>
                  ))}
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 overflow-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-2 text-orange-600">
              {currentSaakhi.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{currentSaakhi.guruJi}</p>
            <div className="flex space-x-4 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmark}
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
                onClick={handleLike}
                className={isSaakhiLiked ? "text-red-500" : "text-gray-500"}
              >
                <HeartIcon className="mr-2 h-4 w-4" />
                {isSaakhiLiked ? "Liked" : "Like"}
              </Button>
            </div>
            <p className="text-gray-700 mb-6">{currentSaakhi.summary}</p>
            <div className="bg-white p-6 rounded-lg shadow-inner">
              <p className="text-lg leading-relaxed">{currentSaakhi.content}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          {prevSaakhi ? (
            <Button
              variant="outline"
              // onClick={() => setCurrentSaakhiId(prevSaakhi.id)}
            >
              <ChevronLeftIcon className="mr-2 h-4 w-4" />
              Previous: {prevSaakhi.title}
            </Button>
          ) : (
            <div></div>
          )}
          {nextSaakhi && (
            <Button
              variant="outline"
              // onClick={() => setCurrentSaakhiId(nextSaakhi.id)}
            >
              Next: {nextSaakhi.title}
              <ChevronRightIcon className="ml-2 h-4 w-4" />
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
