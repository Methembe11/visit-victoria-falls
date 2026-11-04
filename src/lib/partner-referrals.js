// Pre-deployment partner pipeline.
// "prospect" means a business we intend to approach; it does NOT mean they have agreed.
// Website links and photographs below are sourced from the operators' public websites.
// Change status to "approved" only after written confirmation and a provider-approved booking URL.
// Remove a declined prospect from this file before public launch.
export const partnerProspects = [
  { id: "wild-horizons", name: "Wild Horizons", status: "prospect", categories: ["Experiences, tours and transfers"], website: "https://wildhorizons.co.za/", image: "https://wildhorizons.co.za/wp-content/uploads/2024/05/Lodge-Packages-800x800-6.png", imageAlt: "Wild Horizons safari lodge experience" },
  { id: "shearwater", name: "Shearwater", status: "prospect", categories: ["Adventure activities and tours"], website: "https://www.shearwatervictoriafalls.com/", image: "https://www.shearwatervictoriafalls.com/wp-content/uploads/2023/06/converted_image-32.webp", imageAlt: "Shearwater Victoria Falls experience" },
  { id: "adventure-zone", name: "Adventure Zone Victoria Falls", status: "prospect", categories: ["Adventure activities"], website: "http://www.adventurezonevicfalls.com", image: "https://visitzimbabwe.b-cdn.net/theme/theme-adventure.jpg", imageAlt: "Adventure activities in Victoria Falls" },
  { id: "shockwave-adventures", name: "Shockwave Adventures", status: "prospect", categories: ["White-water rafting and river adventures"], website: "https://www.shockwavevictoriafalls.com/", image: "https://static.wixstatic.com/media/24ba95_c1fa76f843834a10aa8bac518ddf3e45~mv2.jpg/v1/fill/w_900,h_600,al_c,q_85/24ba95_c1fa76f843834a10aa8bac518ddf3e45~mv2.jpg", imageAlt: "Shockwave Adventures rafting experience" },
  { id: "cuckoo-safaris", name: "Cuckoo Safaris", status: "prospect", categories: ["Guided tours and safaris"], website: "https://cuckoosafaris.com/", image: "https://irp.cdn-website.com/e6c865a4/dms3rep/multi/opt/The+Lions+Of+Camp+Silwane+Area-1920w.jpg?v=jxl", imageAlt: "African safari wildlife" },
  { id: "zambezi-helicopter-company", name: "The Zambezi Helicopter Company", status: "prospect", categories: ["Scenic helicopter flights"], website: "https://zambezihelicopters.com/", image: "https://zambezihelicopters.com/wp-content/uploads/2023/10/0fae2c83-5b24-4ade-b91d-0d2334b30fc1.png", imageAlt: "Zambezi Helicopter Company aircraft" },
  { id: "chikopokopo-helicopters", name: "Chikopokopo Helicopters", status: "prospect", categories: ["Scenic helicopter flights"], website: "https://www.chikopokopo.com/", image: "https://chikopokopo.com/wp-content/uploads/2025/10/helicopter_flights_victoria_falls_4.webp", imageAlt: "Chikopokopo helicopter flight over Victoria Falls" },
  { id: "pure-africa", name: "Pure Africa", status: "prospect", categories: ["Zambezi River cruises and experiences"], website: "https://pure.africa/", image: "https://pure.africa/wp-content/uploads/2024/07/pexels-charlotte-may-5947024-copy-5-1.webp", imageAlt: "Pure Africa river and dining experience" },
  { id: "savannah-adventures", name: "Savannah Adventures", status: "prospect", categories: ["Tours and safari experiences"], website: "https://www.savannahadventure.com/", image: "https://static.wixstatic.com/media/38db9a_379a4afc5e6046abb1fdae42f6bb3261~mv2.png/v1/fit/w_1800,h_1000,al_c/38db9a_379a4afc5e6046abb1fdae42f6bb3261~mv2.png", imageAlt: "Savannah Adventures safari experience" },
  { id: "africa-travel-tours", name: "Africa Travel Tours", status: "prospect", categories: ["Tours and travel experiences"], website: "https://africatravelvicfalls.com/", image: "https://africatravelvicfalls.com/wp-content/uploads/2023/09/ADRENALINE.jpg", imageAlt: "Africa Travel Tours adventure experience" },
  { id: "batoka-safaris", name: "Batoka Safaris", status: "prospect", categories: ["Tours and safaris"], website: "https://batokasafaris.co.zw/", image: "https://visitzimbabwe.b-cdn.net/theme/theme-nature.jpg", imageAlt: "Safari landscape in Victoria Falls" },
  { id: "victoria-falls-handy-taxis", name: "Victoria Falls Handy Taxis and Transfers", status: "prospect", categories: ["Local and airport transfers"], website: "https://www.handytaxisvictoriafalls.com/", image: "https://images.squarespace-cdn.com/content/v1/68c5ce538bafcb2cd864a4f3/1780919745395-7UEWKFNPIYTADSZPNNH8/1000121026.jpg", imageAlt: "Handy Taxis vehicles in Victoria Falls" },
  { id: "emmanuel-tours-transfers", name: "Victoria Falls Emmanuel Tours & Transfers", status: "prospect", categories: ["Tours and transfers"], website: "https://www.emmanueltaxistours.com/", image: "https://www.emmanueltaxistours.com/", imageAlt: "Emmanuel Taxis and Transfers vehicle" },
];

// Connect an approved provider to specific listings only after confirming which products they operate.
// Example after agreement:
// export const partnerReferrals = {
//   experience: {
//     "confirmed-experience-slug": {
//       providerId: "wild-horizons",
//       providerName: "Wild Horizons",
//       bookingUrl: "PROVIDER-APPROVED-URL",
//       approved: true,
//     },
//   },
// };
export const partnerReferrals = { accommodation: {}, experience: {}, dining: {} };

export function getApprovedReferral(type, slug) {
  const entry = partnerReferrals[type]?.[slug];
  if (!entry || entry.approved !== true || !entry.providerName || !entry.bookingUrl) return null;
  try {
    const url = new URL(entry.bookingUrl);
    if (!["https:", "http:"].includes(url.protocol)) return null;
    return { ...entry, bookingUrl: url.toString() };
  } catch { return null; }
}
