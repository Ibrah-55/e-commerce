// "use client";

// import { useParams } from 'next/navigation';
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// // Internationalization
// import { useTranslation } from "@/app/i18n/client";
// import type { LocaleTypes } from "@/app/i18n/settings";

// interface Slide {
//   title: string;
//   description: string;
//   image: {
//     title?: string;
//     description?: string;
//     contentType?: string;
//     fileName?: string;
//     size?: string;
//     url: string;
//     width?: number;
//     height?: number;
//   };
// }

// interface HeroSliderProps {
//   data: Slide[];
// }

// const HeroSlider: React.FC<HeroSliderProps> = ({ data }) => {
//   const locale = useParams()?.locale as LocaleTypes;
//   const { t } = useTranslation(locale, "common");

//   // Debugging: Log data to see its content
//   console.log("HeroSlider data:", data);

//   if (!data || data.length === 0) {
//     // Display a loading state or an empty state if data is not available
//     return <div>Loading slides...</div>;
//   }

//   return (
//     <section className="w-full">
//       <div className="h-[60vh] md:h-full">
//         <Swiper
//           navigation
//           pagination={{ type: "bullets", clickable: true }}
//           autoplay={{ delay: 5000 }} // Adjust autoplay delay as needed
//           loop
//           modules={[Autoplay, Navigation, Pagination]}
//         >
//           {data.map((slide, index) => (
//             <SwiperSlide key={index}>
//               <div
//                 className="h-[60vh] md:min-h-[50vh] w-full relative"
//                 style={{
//                   background: `url(${slide.image.url}) center center / cover no-repeat`,
//                 }}
//                 aria-label={slide.image.description || slide.title}
//               >
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center text-white bg-black/40 py-5 px-5">
//                     <p className="text-3xl sm:text-4xl lg:text-6xl font-bold">
//                       {slide.title}
//                     </p>
//                     <div className="mt-4 sm:mt-2 md:mt-3">
//                       {slide.description}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default HeroSlider;
