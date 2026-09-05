// src/data/trips.ts

export interface Trip {
  id: number;
  slug: string;
  image?: string;
  images?: string[];
  location?: string;
  experience: string;
  duration: string;
  title: string;
  originalPrice?: string;
  currentPrice: string;
  country?: string;
  price?: number;
  oldPrice?: number;
  category?: string;
  description?: string;
  groupSize?: string;
  highlights?: string[];
  itinerary?: { day: number; title: string; desc: string }[];
}

export const tripCategories: Record<string, Trip[]> = {
  "Only Tripona experiences": [
    {
      id: 1,
      slug: "sabah-adventure",
      image: "/images/trips/trip1.jpg",
      experience: "Kinabalu summit at sunrise",
      duration: "11 days",
      title: "Sabah Adventure",
      originalPrice: "3170",
      currentPrice: "2536",
      country: "Malaysia",
      groupSize: "Max 12 people",
      description:
        "Scale Southeast Asia's highest peak, cruise through lush rainforest rivers searching for pygmy elephants, and unwind on untouched tropical beaches.",
      highlights: [
        "Sunrise summit climb of Mount Kinabalu",
        "Kinabatangan River safari with wildlife spotting",
        "Snorkeling in Tunku Abdul Rahman Marine Park",
        "Authentic Kadazan-Dusun cultural experience",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kota Kinabalu",
          desc: "Meet your guide and explore the vibrant night food market.",
        },
        {
          day: 2,
          title: "Kinabalu National Park",
          desc: "Acclimatization day and botanical garden trails.",
        },
        {
          day: 3,
          title: "Summit Attack Day",
          desc: "Climb to Laban Rata and prepare for sunrise peak push.",
        },
        {
          day: 4,
          title: "Kinabatangan Wildlife River",
          desc: "Boat safari looking for proboscis monkeys and hornbills.",
        },
      ],
    },
    {
      id: 2,
      slug: "turkey-highlights",
      image: "/images/trips/trip2.jpg",
      experience: "Cappadocia weaving",
      duration: "8 days",
      title: "Turkey Highlights",
      originalPrice: "1840",
      currentPrice: "1380",
      country: "Turkey",
      groupSize: "Max 14 people",
      description:
        "Journey across the crossroads of Europe and Asia. From the bustling Grand Bazaar of Istanbul to surreal fairy chimneys and hot air balloons in Cappadocia.",
      highlights: [
        "Sunrise hot air balloon flight over Cappadocia valleys",
        "Underground cities of Derinkuyu",
        "Historical guided tour of Hagia Sophia & Topkapi Palace",
        "Traditional Anatolian culinary workshop",
      ],
      itinerary: [
        {
          day: 1,
          title: "Istanbul Arrival",
          desc: "Welcome dinner overlooking the Bosphorus Strait.",
        },
        {
          day: 2,
          title: "Historic Sultanahmet",
          desc: "Explore Blue Mosque, Hagia Sophia, and Grand Bazaar.",
        },
        {
          day: 3,
          title: "Fly to Cappadocia",
          desc: "Sunset valley hike and traditional cave hotel stay.",
        },
        {
          day: 4,
          title: "Balloons & Underground City",
          desc: "Early morning balloon flight and Derinkuyu expedition.",
        },
      ],
    },
    {
      id: 3,
      slug: "galapagos-island-hopping",
      image: "/images/trips/trip3.jpg",
      experience: "Galapagos swim stops",
      duration: "8 days",
      title: "Galapagos Island Hopping",
      originalPrice: "3125",
      currentPrice: "2257",
      country: "Ecuador",
      groupSize: "Max 10 people",
      description:
        "Encounter ancient giant tortoises, marine iguanas, and playful sea lions in one of the most biodiverse marine reserves on earth.",
      highlights: [
        "Snorkeling with sea lions, turtles, and harmless reef sharks",
        "Visit Charles Darwin Research Station",
        "Hike Sierra Negra Volcano crater",
        "Speedboat transfers between Santa Cruz and Isabela islands",
      ],
      itinerary: [
        {
          day: 1,
          title: "Baltra Island & Highlands",
          desc: "Arrival and first encounter with giant tortoises in the wild.",
        },
        {
          day: 2,
          title: "Isabela Island & Tintoreras",
          desc: "Snorkeling with white-tip sharks and penguins.",
        },
        {
          day: 3,
          title: "Sierra Negra Volcano",
          desc: "Hiking along the world's second-largest active caldera.",
        },
        {
          day: 4,
          title: "Tortuga Bay Beach",
          desc: "Kayaking and relaxing with marine iguanas.",
        },
      ],
    },
    {
      id: 4,
      slug: "vietnam-express-southbound",
      image: "/images/trips/trip4.jpg",
      experience: "Late night bites",
      duration: "10 days",
      title: "Vietnam Express Southbound",
      currentPrice: "1465",
      country: "Vietnam",
      groupSize: "Max 16 people",
      description:
        "Travel from the northern colonial charm of Hanoi down through limestone karsts in Halong Bay to ancient lanterns in Hoi An.",
      highlights: [
        "Overnight cruise on Halong Bay",
        "Street food scooter tour in Hanoi",
        "Lantern making and tailoring in Hoi An",
        "Cu Chi Tunnels exploration in Ho Chi Minh City",
      ],
    },
    {
      id: 5,
      slug: "japan-land-of-the-rising-sun",
      image: "/images/trips/trip5.jpg",
      experience: "Learning from locals",
      duration: "12 days",
      title: "Japan: Land of the Rising Sun",
      originalPrice: "5330",
      currentPrice: "4264",
      country: "Japan",
      groupSize: "Max 12 people",
      description:
        "An incredible mix of hyper-modern Tokyo and timeless Kyoto temples, connected by high-speed bullet trains.",
      highlights: [
        "Bullet train ride at 300 km/h past Mount Fuji",
        "Stay at a traditional Ryokan with natural Onsen hot springs",
        "Bamboo groves of Arashiyama & Fushimi Inari torii gates",
        "Tsukiji fish market morning tasting",
      ],
    },
  ],

  "New trips": [
    {
      id: 11,
      slug: "arctic-norway-explorer",
      image: "/images/trips/trip11.jpg",
      experience: "Northern lights hunting",
      duration: "7 days",
      title: "Arctic Norway Explorer",
      currentPrice: "2990",
      country: "Norway",
      groupSize: "Max 8 people",
      description:
        "Chase the magical Aurora Borealis above the Arctic Circle, ride dog sleds, and sleep in cozy wooden fjord cabins.",
      highlights: [
        "Guided Aurora chasing across Tromsø wilderness",
        "Husky sledding expedition",
        "Sami reindeer camp & cultural dinner",
        "Fjord cruise through dramatic Arctic landscapes",
      ],
    },
    {
      id: 12,
      slug: "peru-adventure-trek",
      image: "/images/trips/trip12.jpg",
      experience: "Andes mountain trails",
      duration: "9 days",
      title: "Peru Adventure Trek",
      originalPrice: "2490",
      currentPrice: "1990",
      country: "Peru",
      groupSize: "Max 12 people",
      description:
        "From Cusco’s cobblestones through Sacred Valley ruins up to the breathtaking sun gate overlooking Machu Picchu.",
      highlights: [
        "Guided expedition of Machu Picchu ruins",
        "Sacred Valley salt mines of Maras & Moray",
        "Scenic mountain train journey via PeruRail",
        "Authentic Peruvian culinary experience",
      ],
    },
    {
      id: 13,
      slug: "kenya-wildlife-safari",
      image: "/images/trips/trip13.jpg",
      experience: "Safari under the stars",
      duration: "8 days",
      title: "Kenya Wildlife Safari",
      currentPrice: "3290",
      country: "Kenya",
      groupSize: "Max 6 people",
      description:
        "Experience the golden savannah of Maasai Mara with prime opportunities to see the Big Five in their natural habitat.",
      highlights: [
        "Daily game drives with certified local rangers",
        "Luxury tented camp experience",
        "Flamingo watching at Lake Nakuru",
        "Maasai village visit",
      ],
    },
    {
      id: 14,
      slug: "greek-islands-escape",
      image: "/images/trips/trip14.jpg",
      experience: "Mediterranean island hopping",
      duration: "10 days",
      title: "Greek Islands Escape",
      originalPrice: "2690",
      currentPrice: "2190",
      country: "Greece",
      groupSize: "Max 14 people",
      description:
        "Whitewashed villages, turquoise Aegean waters, fresh seafood, and iconic golden hour sunsets in Santorini and Mykonos.",
      highlights: [
        "Santorini caldera catamaran cruise",
        "Oia village sunset walking tour",
        "Delos archaeological sacred island excursion",
        "Traditional Greek cooking class with local wine",
      ],
    },
    {
      id: 15,
      slug: "costa-rica-nature-break",
      image: "/images/trips/trip15.jpg",
      experience: "Rainforest wildlife",
      duration: "6 days",
      title: "Costa Rica Nature Break",
      currentPrice: "1750",
      country: "Costa Rica",
      groupSize: "Max 10 people",
      description:
        "Immerse in the pure biodiversity of Central America: zip-line through cloud forests, soak in volcanic hot springs, and spot sloths in the wild.",
      highlights: [
        "Arenal Volcano hot springs & canopy suspension bridges",
        "Monteverde Cloud Forest night guided walk",
        "Manuel Antonio National Park beach and wildlife tour",
        "Fair-trade organic coffee & chocolate plantation tour",
      ],
    },
  ],

  "Popular trips": [
    {
      id: 19,
      slug: "inca-trail-express",
      image: "/images/trips/trip19.jpg",
      experience: "Classic Inca Trail",
      duration: "8 days",
      title: "Inca Trail Express",
      originalPrice: "2250",
      currentPrice: "1890",
      country: "Peru",
      groupSize: "Max 10 people",
      description:
        "Hike the world-renowned stone-paved trail across misty cloud forests, high-altitude passes, and hidden Incan fortresses.",
      highlights: [
        "Permit-included Classic Inca Trail hike",
        "Porter support and chef-prepared campsite meals",
        "Sunrise arrival at Inti Punku (Sun Gate)",
        "Guided exploration of the lost city of Machu Picchu",
      ],
    },
    {
      id: 20,
      slug: "serengeti-ngorongoro-safari",
      image: "/images/trips/trip20.jpg",
      experience: "Big five safari",
      duration: "10 days",
      title: "Serengeti & Ngorongoro Safari",
      currentPrice: "3490",
      country: "Tanzania",
      groupSize: "Max 7 people",
      description:
        "Witness the endless plains of the Serengeti and descend into the world’s largest intact volcanic caldera packed with wildlife.",
      highlights: [
        "Ngorongoro Crater full-day safari expedition",
        "Serengeti endless plains game tracking",
        "Olduvai Gorge historical evolutionary site",
        "Stargazing from remote wilderness camps",
      ],
    },
    {
      id: 21,
      slug: "cambodia-vietnam-discovery",
      image: "/images/trips/trip21.jpg",
      experience: "Temples at sunrise",
      duration: "9 days",
      title: "Cambodia & Vietnam Discovery",
      originalPrice: "1980",
      currentPrice: "1590",
      country: "Cambodia",
      groupSize: "Max 14 people",
      description:
        "Unravel ancient Khmer wonders at Angkor Wat and experience the authentic vibrant pulse of the Mekong Delta.",
      highlights: [
        "Angkor Wat sunrise temple tour with historian guide",
        "Ta Prohm jungle temple (Tomb Raider temple)",
        "Mekong Delta riverboat navigation and homestay",
        "Siem Reap night artisan markets",
      ],
    },
    {
      id: 22,
      slug: "turkey-sailing-adventure",
      image: "/images/trips/trip22.jpg",
      experience: "Sailing the turquoise coast",
      duration: "8 days",
      title: "Turkey Sailing Adventure",
      currentPrice: "1740",
      country: "Turkey",
      groupSize: "Max 12 people",
      description:
        "Cruise the Turkish Riviera aboard a traditional wooden gulet yacht, swimming in crystal-clear secluded coves and exploring sunken ruins.",
      highlights: [
        "7 nights aboard a handcrafted wooden gulet yacht",
        "Swimming at Butterfly Valley and Oludeniz Blue Lagoon",
        "Sunken ruins of Kekova viewed through crystal waters",
        "Fresh Mediterranean grilled seafood prepared on board",
      ],
    },
    {
      id: 23,
      slug: "best-of-thailand",
      image: "/images/trips/trip23.jpg",
      experience: "Local food markets",
      duration: "12 days",
      title: "Best of Thailand",
      originalPrice: "2290",
      currentPrice: "1832",
      country: "Thailand",
      groupSize: "Max 14 people",
      description:
        "From dazzling golden temples of Bangkok to ethical elephant sanctuaries in Chiang Mai and limestone cliffs in Krabi.",
      highlights: [
        "Bangkok Grand Palace and floating market longtail boat",
        "Ethical elephant rescue haven in Chiang Mai",
        "Traditional Thai cooking masterclass",
        "Island hopping and sea cave kayaking in Railay/Krabi",
      ],
    },
  ],
};

// لیست تمام تورها به صورت یکجا
export const allTrips: Trip[] = Object.values(tripCategories).flat();

// فانکشن کمکی پیدا کردن تور بر اساس slug
export function getTripBySlug(slug: string): Trip | undefined {
  return allTrips.find((trip) => trip.slug === slug);
}
