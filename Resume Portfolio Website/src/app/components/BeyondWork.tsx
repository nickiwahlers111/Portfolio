import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, CookingPot, MapPin, Globe2, Trees } from "lucide-react";
import { Link } from "react-router";

const pnwPhotos = [
  { src: "/pacific-northwest/white-shirt.jpg", alt: "Nicki in a white shirt hiking beside coastal cliffs and the ocean", caption: "Coastal adventures", position: "44% 65%" },
  { src: "/pacific-northwest/ocean.jpg", alt: "Ocean waves washing into a rocky cove beneath tree-lined cliffs", caption: "The Oregon coast", position: "center 65%" },
  { src: "/pacific-northwest/black-shirt.jpg", alt: "Nicki in a black shirt and backpack on a mossy forest trail", caption: "At home on the trail", position: "center 60%" },
  { src: "/pacific-northwest/green-trees.jpg", alt: "A sunlit path winding through lush green Pacific Northwest forest", caption: "All that green", position: "center 65%" },
];

const cookingPhotos = [
  { src: "/cooking/berry-galette.jpg", alt: "A homemade mixed berry galette with golden pastry on a baking tray", caption: "Mixed berry galette", position: "center 65%" },
  { src: "/cooking/roast-chicken-dinner.jpg", alt: "Roast chicken served with golden potatoes and a green salad", caption: "A roast chicken dinner", position: "center 65%" },
  { src: "/cooking/fruit-bowl.jpg", alt: "A wooden bowl of dragon fruit, pear, watermelon, passion fruit and citrus beside a pool", caption: "A colorful fruit bowl", position: "center 75%" },
  { src: "/cooking/cinnamon-rolls.jpg", alt: "A tray of homemade cinnamon rolls topped with frosting", caption: "Freshly frosted pumpkin cinnamon rolls", position: "center 65%" },
];

const laPhotos = [
  { src: "/los-angeles/coliseum.jpg", alt: "Football field and crowds at the Los Angeles Memorial Coliseum beneath a blue sky", caption: "Game day at the Coliseum", position: "center 80%" },
  { src: "/los-angeles/griffith-observatory.jpg", alt: "Griffith Observatory on a hillside above a trail", caption: "Griffith Observatory", position: "center 75%" },
  { src: "/los-angeles/california-welcome.jpg", alt: "A California Welcomes You sign surrounded by tall evergreen trees", caption: "Hello, California!", position: "center 85%" },
  { src: "/los-angeles/city-interior.jpg", alt: "A warmly lit lounge with arched windows, patterned ceiling beams and colorful armchairs", caption: "Finding new favorite corners", position: "center 60%" },
];

const travelPhotos = [
  { src: "/travel/mexico-city.jpg", alt: "A leafy courtyard with a stone fountain and historic building in Mexico City", caption: "Mexico City", position: "center 75%" },
  { src: "/travel/tokyo.jpg", alt: "Red temple buildings and a pagoda beneath a clear blue sky in Tokyo", caption: "Tokyo", position: "center 65%" },
  { src: "/travel/el-salvador.jpg", alt: "A rocky coastline with ocean waves and a palm-covered headland in El Salvador", caption: "El Salvador", position: "center 70%" },
  { src: "/travel/hong-kong.jpg", alt: "A wooden boat in Hong Kong harbor with the city skyline behind it", caption: "Hong Kong", position: "center 65%" },
  { src: "/travel/paris.jpg", alt: "The Louvre glass pyramid framed by a carved stone archway in Paris", caption: "Paris", position: "center 60%" },
];

export default function BeyondWork() {
  const travelGallery = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const gallery = travelGallery.current;
    if (!gallery) return;
    const update = () => {
      setCanScrollLeft(gallery.scrollLeft > 1);
      setCanScrollRight(gallery.scrollLeft + gallery.clientWidth < gallery.scrollWidth - 1);
    };
    update();
    gallery.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(gallery);
    return () => {
      gallery.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  function scrollTravel(direction: number) {
    const gallery = travelGallery.current;
    if (!gallery) return;
    const firstPhoto = gallery.querySelector("figure");
    const step = firstPhoto ? firstPhoto.getBoundingClientRect().width + 24 : gallery.clientWidth;
    gallery.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <main className="max-w-screen-xl mx-auto px-8 lg:px-16 pt-32 pb-16">
      <div className="border-b border-border pb-12 mb-14">
        <p className="font-['Geist'] text-[0.65rem] tracking-[0.25em] uppercase text-primary mb-4">A little more about me</p>
        <h1 className="font-['Instrument_Serif'] font-normal leading-[1.1]" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>Beyond work.</h1>
        <p className="font-['Geist'] font-light text-base leading-[1.8] mt-6 max-w-xl">A few things that make me, me: Pacific Northwest roots, a new chapter in Los Angeles, a love of cooking, and a curiosity about the world. Here&apos;s a little peek into my camera roll.</p>
      </div>

      <section aria-labelledby="pnw-title" className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-20">
        <div>
          <div className="flex items-center gap-2 text-primary mb-5">
            <Trees size={18} strokeWidth={1.5} aria-hidden="true" />
            <span className="font-['Geist'] text-xs tracking-[0.15em] uppercase">Pacific Northwest roots</span>
          </div>
          <h2 id="pnw-title" className="font-['Instrument_Serif'] font-normal text-3xl sm:text-4xl leading-[1.2]">A little Oregon, wherever I go.</h2>
        </div>
        <div className="lg:pt-10">
          <p className="font-['Geist'] font-light text-base leading-[1.85] max-w-lg">Originally from the beautiful Pacific Northwest, I&apos;ve recently traded rainy Portland days for sunny Los Angeles. I&apos;m so excited for the chance to live somewhere new, but I&apos;ll always have a soft spot for Oregon&apos;s forests, coastlines, and mountains.</p>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pnwPhotos.map((photo) => (
            <figure key={photo.src}>
              <img src={photo.src} alt={photo.alt} loading="lazy" style={{ objectPosition: photo.position }} className="w-full aspect-[4/5] object-cover bg-muted" />
              <figcaption className="font-['Geist'] text-sm mt-3 leading-relaxed">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section aria-labelledby="la-title" className="mt-20 pt-14 border-t border-border grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-20">
        <div>
          <div className="flex items-center gap-2 text-primary mb-5">
            <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />
            <span className="font-['Geist'] text-xs tracking-[0.15em] uppercase">Los Angeles, CA</span>
          </div>
          <h2 id="la-title" className="font-['Instrument_Serif'] font-normal text-3xl sm:text-4xl leading-[1.2]">New city. New chapter.</h2>
        </div>
        <div className="lg:pt-10">
          <p className="font-['Geist'] font-light text-base leading-[1.85] max-w-lg">I&apos;m new to LA and getting to know the city. If you have a favorite neighborhood spot or a recipe worth trying, I&apos;m all ears.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 font-['Geist'] text-sm mt-7 border-b border-foreground pb-1 hover:text-primary hover:border-primary focus-visible:outline-primary">Send a recommendation <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {laPhotos.map((photo) => (
            <figure key={photo.src}>
              <img src={photo.src} alt={photo.alt} loading="lazy" width={1206} height={2144} style={{ objectPosition: photo.position }} className="w-full aspect-[4/5] object-cover bg-muted" />
              <figcaption className="font-['Geist'] text-sm mt-3 leading-relaxed">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section aria-labelledby="cooking-title" className="mt-20 pt-14 border-t border-border space-y-10">
        <div>
          <div className="flex items-center gap-2 text-primary mb-5">
            <CookingPot size={18} strokeWidth={1.5} aria-hidden="true" />
            <span className="font-['Geist'] text-xs tracking-[0.15em] uppercase">In the kitchen</span>
          </div>
          <h2 id="cooking-title" className="font-['Instrument_Serif'] font-normal text-3xl sm:text-4xl leading-[1.2] mb-5">A different kind of project.</h2>
          <p className="font-['Geist'] font-light text-base leading-[1.85] max-w-md">I love to cook. This is a little space for what I&apos;ve been making lately, outside of roadmaps and release cycles.</p>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cookingPhotos.map((photo) => (
              <figure key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" width={1206} height={2144} style={{ objectPosition: photo.position }} className="w-full aspect-[4/5] object-cover bg-muted" />
                <figcaption className="font-['Geist'] text-sm mt-3 leading-relaxed">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>

      </section>

      <section aria-labelledby="travel-title" className="mt-20 pt-14 border-t border-border grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-20">
        <div>
          <div className="flex items-center gap-2 text-primary mb-5">
            <Globe2 size={18} strokeWidth={1.5} aria-hidden="true" />
            <span className="font-['Geist'] text-xs tracking-[0.15em] uppercase">Out in the world</span>
          </div>
          <h2 id="travel-title" className="font-['Instrument_Serif'] font-normal text-3xl sm:text-4xl leading-[1.2]">New places. New perspectives.</h2>
        </div>
        <div className="lg:pt-10">
          <p className="font-['Geist'] font-light text-base leading-[1.85] max-w-lg">I love to travel — experiencing new cultures, trying new foods, and taking in beautiful sights. There&apos;s always something new to discover, whether it&apos;s on the plate in front of me or in the view just around the corner.</p>
        </div>
        <div className="lg:col-span-2 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-5">
            <p id="travel-gallery-hint" className="font-['Geist'] text-sm text-muted-foreground">A few places along the way. Scroll to explore.</p>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => scrollTravel(-1)} disabled={!canScrollLeft} aria-label="Previous travel photo" aria-controls="travel-gallery" className="inline-flex items-center justify-center size-11 border border-border rounded-full hover:border-primary hover:text-primary focus-visible:outline-primary disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => scrollTravel(1)} disabled={!canScrollRight} aria-label="Next travel photo" aria-controls="travel-gallery" className="inline-flex items-center justify-center size-11 border border-border rounded-full hover:border-primary hover:text-primary focus-visible:outline-primary disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div id="travel-gallery" ref={travelGallery} role="region" aria-label="Travel photos" aria-describedby="travel-gallery-hint" tabIndex={0} className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[calc(50%-12px)] lg:auto-cols-[calc(25%-18px)] gap-6 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-4 focus-visible:outline-primary">
            {travelPhotos.map((photo) => (
              <figure key={photo.src} className="min-w-0 snap-start">
                <img src={photo.src} alt={photo.alt} loading="lazy" style={{ objectPosition: photo.position }} className="w-full aspect-[4/5] object-cover bg-muted" />
                <figcaption className="font-['Geist'] text-sm mt-3 leading-relaxed">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
