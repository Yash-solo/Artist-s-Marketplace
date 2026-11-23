 //Dummy Data for Single Artist Profile
export const ARTIST_DATA: object = {
  name: "Aarav Sharma",
  username: "aarav_sketches",
  city: "Jaipur, Rajasthan",
  avatar: "https://unsplash.com",
  bio: "Self-taught graphite & charcoal portrait artist. Har sketch 100% haath se bana hota hai—koi digital filter ya AI nahi. Custom gifts ke liye orders open hain!",
  artStyles: ["Pencil Sketch", "Charcoal", "Color Pencil"],
  completedOrders: 4,
  avgDeliveryDays: 4,
  isAvailableForCustom: true,
  // Rate Card (Isse humein pata chalta hai ki User model mein rateCard array rakhna best rahega!)
  rateCard: [
    { size: "A4 (8.3 x 11.7 in)", faces: "Single Face", price: 799, days: 3 },
    { size: "A4 (8.3 x 11.7 in)", faces: "Couple / 2 Faces", price: 1199, days: 4 },
    { size: "A3 (11.7 x 16.5 in)", faces: "Single / Couple", price: 1599, days: 6 }
  ],
  artworks: [
    {
      id: 101,
      title: "Hyper-Realistic Couple Portrait",
      category: "Pencil Sketch",
      size: "A4",
      price: 1199,
      listingType: "portfolio_sample",
      imageUrl: "https://unsplash.com",
      proofUrl: "https://unsplash.com"
    },
    {
      id: 102,
      title: "Vintage Old Man Charcoal Study",
      category: "Charcoal",
      size: "A3",
      price: 1899,
      listingType: "ready_to_ship",
      imageUrl: "https://unsplash.com",
      proofUrl: "https://unsplash.com"
    },
    {
      id: 103,
      title: "Birthday Gift Pencil Sketch",
      category: "Pencil Sketch",
      size: "A4",
      price: 799,
      listingType: "portfolio_sample",
      imageUrl: "https://unsplash.com",
      proofUrl: "https://unsplash.com"
    }
  ],
  reviews: [
    {
      id: 1,
      buyerName: "Sneha Gupta",
      rating: 5,
      comment: "Apne bhai ke birthday ke liye banwaya tha. Packing bahut safe thi aur detailing bilkul photo jaisi hai!",
      date: "2 weeks ago"
    }
  ]
};