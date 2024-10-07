import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HomeIcon, BookIcon } from "lucide-react";
// import {SearchIcon} from 'lucide-react'

// Mock data for saakhis (same as in the saakhi-page.tsx)
const saakhis = [
  {
    id: 1,
    title: "The True Bargain",
    guruJi: "Guru Nanak Dev Ji",
    summary: "Learn about true devotion and honest living.",
    content:
      "ਇੱਕ ਵਾਰ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਇੱਕ ਸ਼ਹਿਰ ਵਿੱਚ ਗਏ। ਉੱਥੇ ਉਨ੍ਹਾਂ ਨੇ ਇੱਕ ਵਪਾਰੀ ਨੂੰ ਵੇਖਿਆ ਜੋ ਆਪਣੇ ਗਾਹਕਾਂ ਨਾਲ ਬੇਈਮਾਨੀ ਕਰ ਰਿਹਾ ਸੀ। ਗੁਰੂ ਜੀ ਨੇ ਉਸ ਵਪਾਰੀ ਨੂੰ ਸਿਖਾਇਆ ਕਿ ਸੱਚਾ ਵਪਾਰ ਕਰਨਾ ਕਿੰਨਾ ਮਹੱਤਵਪੂਰਨ ਹੈ। ਉਨ੍ਹਾਂ ਨੇ ਕਿਹਾ, 'ਸੱਚਾ ਸੌਦਾ ਕਰ, ਤਾਂ ਤੂੰ ਸੱਚੇ ਦਰਬਾਰ ਵਿੱਚ ਸਥਾਨ ਪਾਏਂਗਾ।' ਇਸ ਸਿੱਖਿਆ ਨੇ ਵਪਾਰੀ ਦੇ ਦਿਲ ਨੂੰ ਛੂਹ ਲਿਆ ਅਤੇ ਉਸਨੇ ਆਪਣੇ ਜੀਵਨ ਵਿੱਚ ਇਮਾਨਦਾਰੀ ਨੂੰ ਅਪਣਾ ਲਿਆ।",
  },
  {
    id: 2,
    title: "The Carpenter's Honesty",
    guruJi: "Guru Arjan Dev Ji",
    summary: "Discover the importance of truthfulness in life.",
    content:
      "ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦੇ ਦਰਬਾਰ ਵਿੱਚ ਇੱਕ ਗਰੀਬ ਤਰਖਾਣ ਆਇਆ। ਉਸਨੇ ਗੁਰੂ ਜੀ ਨੂੰ ਦੱਸਿਆ ਕਿ ਉਹ ਬਹੁਤ ਇਮਾਨਦਾਰ ਹੈ ਪਰ ਫਿਰ ਵੀ ਗਰੀਬ ਹੈ। ਗੁਰੂ ਜੀ ਨੇ ਉਸਨੂੰ ਇੱਕ ਸੋਨੇ ਦਾ ਸਿੱਕਾ ਦਿੱਤਾ ਅਤੇ ਕਿਹਾ ਕਿ ਉਹ ਇਸਨੂੰ ਕਿਸੇ ਨੂੰ ਨਾ ਦੱਸੇ। ਕੁਝ ਦਿਨਾਂ ਬਾਅਦ ਗੁਰੂ ਜੀ ਨੇ ਉਸਨੂੰ ਬੁਲਾਇਆ ਅਤੇ ਪੁੱਛਿਆ ਕਿ ਉਸਨੇ ਸਿੱਕੇ ਬਾਰੇ ਕਿਸੇ ਨੂੰ ਦੱਸਿਆ ਹੈ। ਤਰਖਾਣ ਨੇ ਸੱਚ ਬੋਲਿਆ ਕਿ ਉਸਨੇ ਆਪਣੀ ਪਤਨੀ ਨੂੰ ਦੱਸਿਆ ਹੈ। ਗੁਰੂ ਜੀ ਨੇ ਉਸਦੀ ਇਮਾਨਦਾਰੀ ਤੇ ਖੁਸ਼ ਹੋ ਕੇ ਉਸਨੂੰ ਹੋਰ ਇਨਾਮ ਦਿੱਤਾ ਅਤੇ ਕਿਹਾ, 'ਸੱਚ ਬੋਲਣਾ ਹਮੇਸ਼ਾ ਫਾਇਦੇਮੰਦ ਹੁੰਦਾ ਹੈ।'",
  },
  {
    id: 3,
    title: "The Milk and the Jasmine Flower",
    guruJi: "Guru Nanak Dev Ji",
    summary: "Explore the purity of the soul and good company.",
    content:
      "ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਨੇ ਆਪਣੇ ਸਿੱਖਾਂ ਨੂੰ ਇੱਕ ਸੁੰਦਰ ਉਦਾਹਰਣ ਦਿੱਤੀ। ਉਨ੍ਹਾਂ ਨੇ ਕਿਹਾ, 'ਜਿਵੇਂ ਦੁੱਧ ਵਿੱਚ ਚਮੇਲੀ ਦਾ ਫੁੱਲ ਪਾਉਣ ਨਾਲ ਦੁੱਧ ਖੁਸ਼ਬੂਦਾਰ ਹੋ ਜਾਂਦਾ ਹੈ, ਉਸੇ ਤਰ੍ਹਾਂ ਚੰਗੀ ਸੰਗਤ ਨਾਲ ਸਾਡਾ ਮਨ ਪਵਿੱਤਰ ਹੋ ਜਾਂਦਾ ਹੈ।' ਇਸ ਸਿੱਖਿਆ ਨੇ ਲੋਕਾਂ ਨੂੰ ਚੰਗੀ ਸੰਗਤ ਦੀ ਮਹੱਤਤਾ ਸਮਝਾਈ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਆਪਣੇ ਜੀਵਨ ਵਿੱਚ ਚੰਗੇ ਲੋਕਾਂ ਦੀ ਸੰਗਤ ਕਰਨ ਲਈ ਪ੍ਰੇਰਿਤ ਕੀਤਾ।",
  },
  {
    id: 4,
    title: "The Farmer's Faith",
    guruJi: "Guru Amar Das Ji",
    summary: "Learn about unwavering faith and perseverance.",
    content:
      "ਇੱਕ ਵਾਰ ਇੱਕ ਕਿਸਾਨ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਕੋਲ ਆਇਆ। ਉਸਨੇ ਕਿਹਾ, 'ਗੁਰੂ ਜੀ, ਮੇਰੀ ਫਸਲ ਸੁੱਕ ਰਹੀ ਹੈ। ਕੀ ਤੁਸੀਂ ਮੇਰੇ ਲਈ ਪ੍ਰਾਰਥਨਾ ਕਰੋਗੇ?' ਗੁਰੂ ਜੀ ਨੇ ਕਿਹਾ, 'ਭਾਈ, ਤੂੰ ਆਪਣੀ ਮਿਹਨਤ ਕਰ ਅਤੇ ਵਾਹਿਗੁਰੂ 'ਤੇ ਭਰੋਸਾ ਰੱਖ।' ਕਿਸਾਨ ਨੇ ਗੁਰੂ ਜੀ ਦੀ ਸਲਾਹ ਮੰਨੀ ਅਤੇ ਦਿਨ-ਰਾਤ ਮਿਹਨਤ ਕੀਤੀ। ਕੁਝ ਦਿਨਾਂ ਬਾਅਦ ਮੀਂਹ ਪਿਆ ਅਤੇ ਉਸਦੀ ਫਸਲ ਬਚ ਗਈ। ਇਸ ਘਟਨਾ ਨੇ ਕਿਸਾਨ ਨੂੰ ਸਿਖਾਇਆ ਕਿ ਮਿਹਨਤ ਅਤੇ ਵਿਸ਼ਵਾਸ ਦਾ ਮੇਲ ਕਿੰਨਾ ਸ਼ਕਤੀਸ਼ਾਲੀ ਹੁੰਦਾ ਹੈ।",
  },
  {
    id: 5,
    title: "The Humble King",
    guruJi: "Guru Gobind Singh Ji",
    summary: "Discover the power of humility in leadership.",
    content:
      "ਇੱਕ ਵਾਰ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਦਰਬਾਰ ਵਿੱਚ ਇੱਕ ਰਾਜਾ ਆਇਆ। ਉਹ ਆਪਣੇ ਰਾਜ ਦੀ ਸ਼ਾਨ ਵਿੱਚ ਬਹੁਤ ਘੁਮੰਡੀ ਸੀ। ਗੁਰੂ ਜੀ ਨੇ ਉਸਨੂੰ ਇੱਕ ਕਟੋਰਾ ਦਿੱਤਾ ਅਤੇ ਕਿਹਾ, 'ਇਸ ਨੂੰ ਪਾਣੀ ਨਾਲ ਭਰ ਕੇ ਲਿਆਓ, ਪਰ ਇੱਕ ਸ਼ਰਤ ਹੈ - ਪਾਣੀ ਡੁੱਲ੍ਹਣਾ ਨਹੀਂ ਚਾਹੀਦਾ।' ਰਾਜੇ ਨੇ ਬਹੁਤ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ ਪਰ ਉਹ ਅਸਫਲ ਰਿਹ",
  },
];

export function SaakhiListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGuruJi] = useState("");

  const filteredSaakhis = saakhis.filter(
    (saakhi) =>
      saakhi.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterGuruJi === "" || saakhi.guruJi === filterGuruJi)
  );

  // const uniqueGuruJis = Array.from(
  //   new Set(saakhis.map((saakhi) => saakhi.guruJi))
  // );

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <header className="bg-orange-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold flex items-center">
            <HomeIcon className="mr-2" />
            Sikhi Academy
          </a>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-orange-800">All Saakhis</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search saakhis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              // icon={<SearchIcon className="h-4 w-4 text-gray-500" />}
            />
          </div>
          {/* <div className="w-full md:w-64">
            <Select value={filterGuruJi} onValueChange={setFilterGuruJi}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Guru Ji" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Guru Jis</SelectItem>
                {uniqueGuruJis.map(guruJi => (
                  <SelectItem key={guruJi} value={guruJi}>{guruJi}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
        </div>

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
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{saakhi.guruJi}</p>
                <p className="text-gray-700 mb-4">{saakhi.summary}</p>
                <Button asChild variant="outline" className="w-full">
                  <a href={`/saakhi/${saakhi.id}`}>
                    <BookIcon className="mr-2 h-4 w-4" />
                    Read Saakhi
                  </a>
                </Button>
              </CardContent>
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
