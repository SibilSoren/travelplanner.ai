import { Calendar, MapPin, PersonStanding, Search } from "lucide-react";
import "./App.css";
import Autocomplete from "react-google-autocomplete";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";
import CustomNavBar from "./components/CustomNavBar";
import Footer from "./components/Footer";

function App() {
  const [formData, setFromData] = useState({
    location: "",
    days: "1",
    guests: "1",
  });
  const [trip, setTrip] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageList] = useState([
    "https://images.unsplash.com/photo-1558981012-236ee58eb5c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MTk2ODZ8MHwxfHNlYXJjaHwxfHw3JTIwd29uZGVyc3xlbnwwfDB8fHwxNzE3NjUyODc3fDA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1545562083-a600704fa486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MTk2ODZ8MHwxfHNlYXJjaHwyfHw3JTIwd29uZGVyc3xlbnwwfDB8fHwxNzE3NjUyODc3fDA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1614949260630-1d8a27791215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MTk2ODZ8MHwxfHNlYXJjaHwzfHw3JTIwd29uZGVyc3xlbnwwfDB8fHwxNzE3NjUyODc4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1545562083-c583d014b4f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MTk2ODZ8MHwxfHNlYXJjaHw0fHw3JTIwd29uZGVyc3xlbnwwfDB8fHwxNzE3NjUyODc4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1632836388763-3a52d354cd7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MTk2ODZ8MHwxfHNlYXJjaHw1fHw3JTIwd29uZGVyc3xlbnwwfDB8fHwxNzE3NjUyODc4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1599511872836-e71161a5d5c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MTk2ODZ8MHwxfHNlYXJjaHw2fHw3JTIwd29uZGVyc3xlbnwwfDB8fHwxNzE3NjUyODc4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1517481700215-fddbbf01b509?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MTk2ODZ8MHwxfHNlYXJjaHw3fHw3JTIwd29uZGVyc3xlbnwwfDB8fHwxNzE3NjUyODc4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1612810436541-336b73fbcf9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MTk2ODZ8MHwxfHNlYXJjaHw4fHw3JTIwd29uZGVyc3xlbnwwfDB8fHwxNzE3NjUyODc4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1605647851614-974467137eca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MTk2ODZ8MHwxfHNlYXJjaHw5fHw3JTIwd29uZGVyc3xlbnwwfDB8fHwxNzE3NjUyODc4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1548586196-aa5803b77379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MTk2ODZ8MHwxfHNlYXJjaHwxMHx8NyUyMHdvbmRlcnN8ZW58MHwwfHx8MTcxNzY1Mjg3OHww&ixlib=rb-4.0.3&q=80&w=1080",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const contentMap = {
    trip: "Act as an expert travel agent. I will give you a location and number of days, give me a complete trip for those days. Give me day wise breakdown and include bars, clubs, hikes, and other attractions that I can visit. Give this in a markdown format. beautifully formatted like a paragraph for each day, make the headings bold and the places bold so that is easy to identify",
  };

  async function fetchResponse() {
    if (!formData.location) return toast.error("Please select a location");
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.CHAT_GPT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.GPT_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: contentMap.trip,
            },
            {
              role: "user",
              content: `${formData.location} location, ${formData.days} days for ${formData.guests} persons`,
            },
          ],
        }),
      });
      const data = await response.json();
      setTrip(data.choices[0].message.content);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function handleChange(key, value) {
    setFromData({ ...formData, [key]: value });
  }

  const loadingTexts = [
    "Charting your course to adventure... 🗺️",
    "Packing your bags and setting the itinerary... 🧳",
    "Mapping out your dream destination... 🌏",
    "Planning the perfect escape just for you... ✈️",
    "Navigating your travel dreams... 🚀",
    "Preparing your travel route... 🛤️",
    "Getting everything ready for your journey... 🚗",
    "Loading your travel itinerary... 📋",
    "Bringing your travel plans to life... 🏖️",
    "Ready to explore? Hang tight, we're almost there... 🏝️",
  ];

  function getRandomLoadingText() {
    const randomIndex = Math.floor(Math.random() * loadingTexts.length);
    return loadingTexts[randomIndex];
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [imageList.length]);

  return (
    <>
      <CustomNavBar />
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-[1024px] w-full flex flex-row justify-between px-6 mt-6">
          <div
            className="h-[50vh] w-full bg-gradient-to-b from-fuchsia-200 to-violet-400 rounded-3xl flex flex-col items-center relative fade-in"
            style={{
              backgroundImage: `url(${imageList[currentIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
              transition: "all 1s ease-in-out",
            }}
          >
            <p className="m-5">Where are you planning today ?</p>
            <h1
              className="text-2xl md:text-5xl font-bold"
              style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.7)" }}
            >
              Explore Beautiful Places
            </h1>
            <div className="bg-white p-8 rounded-2xl md:absolute -bottom-2/3 md:-bottom-16 shadow-lg md:flex  gap-6 items-center w-[90%] md:w-[80%] mt-8 md:mt-0">
              <div className="flex flex-col gap-4 m-2 ">
                <div className="flex items-center gap-4">
                  <MapPin
                    size={35}
                    className="bg-violet-200 rounded-full p-2"
                  />
                  <h2 className="font-semibold">Location</h2>
                </div>
                <Autocomplete
                  apiKey={import.meta.env.APIKEY}
                  onPlaceSelected={(place) =>
                    handleChange("location", place.formatted_address)
                  }
                  placeholder="Where to?"
                  className="w-full bg-[#f4f4f5] p-2 rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-4 m-2">
                <div className="flex items-center gap-4">
                  <Calendar
                    size={35}
                    className="bg-violet-200 rounded-full p-2"
                  />
                  <h2 className="font-semibold">Total Days</h2>
                </div>
                <Input
                  type="number"
                  placeholder="1"
                  onChange={(event) => handleChange("days", event.target.value)}
                />
              </div>

              <div className="flex flex-col gap-4 m-2">
                <div className="flex items-center gap-4">
                  <PersonStanding
                    size={35}
                    className="bg-violet-200 rounded-full p-2"
                  />
                  <h2 className="font-semibold">Guests</h2>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="1"
                    onChange={(event) =>
                      handleChange("guests", event.target.value)
                    }
                  />
                </div>
              </div>

              <Button
                isIconOnly
                onClick={fetchResponse}
                className=" w-full md:w-auto  my-2"
              >
                <Search />
              </Button>
            </div>
          </div>
        </div>
        <div
          className={`max-w-[1024px] w-full flex flex-col justify-between px-6 mt-36 mb-28 gap-6 ${
            loading && "items-center"
          }`}
        >
          {loading ? (
            <>
              <CircularProgress color="secondary" aria-label="Loading..." />
              <h1>{getRandomLoadingText()}</h1>
            </>
          ) : (
            <Markdown remarkPlugins={[remarkGfm]}>{trip}</Markdown>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
