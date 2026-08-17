import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { RoadCar, RoadCarVertical } from "@/components/ui/RoadCar";
import { RoadPath } from "@/components/ui/RoadPath";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepBadge } from "@/components/ui/StepBadge";
import { ROAD, stepFrame } from "@/lib/road";
import { steps } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";

/*
 * Type sizes inside the road composition are expressed in `cqw` — percent of
 * the road container's own width — so the whole layout keeps the design's
 * exact proportions as it scales, instead of the text drifting out of
 * relation with the artwork. Each one carries a floor so the copy stays
 * legible once the container gets small.
 *
 * The floors are a backstop, not a working range: once one engages the type has
 * stopped scaling with the artwork and starts outgrowing its fixed-percentage
 * box. The body floor is the first to bite, at a 884px container. That is why
 * the road only appears from `lg` — see the container below — where the
 * narrowest container is 976px and every size is still proportional. Tamil is
 * the case that decides it: the same copy runs 30–40% longer than English, so
 * it has no slack to give up.
 */
const ROAD_TITLE = "text-[max(17px,2.29cqw)]";
const ROAD_BODY = "text-[max(13px,1.47cqw)]";
const ROAD_BADGE = "text-[max(15px,2.2cqw)]";

function StepPhoto({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={461}
      height={260}
      /* The rendered width per band, so the browser stops fetching more than
         it can show: 466px in the road composition, at most 368px in the
         tablet pair, and the capped single column below that. */
      sizes="(min-width: 1024px) 466px, (min-width: 768px) 368px, (min-width: 550px) 461px, 88vw"
      className={className}
    />
  );
}

export async function HowItWorks() {
  const dict = await getDictionary();

  return (
    <section id="how-it-works" className="scroll-mt-24 pb-10 pt-4 sm:pb-12 lg:pb-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5 lg:px-6">
        <Reveal>
          <SectionHeading
            eyebrow={dict.howItWorks.eyebrow}
            title={dict.howItWorks.title}
          />
        </Reveal>

        {/* ---- Winding road: desktop -----------------------------------
            The container is locked to the artwork's aspect ratio and marked
            as a query container, so the percentage-positioned steps and the
            cqw-sized type scale together and stay pinned to their bend in
            the road at any width.

            `lg` and up only: the composition needs a container of at least
            884px to stay proportional (see the type floors above), and with
            `lg:px-6` either side that means a 1024px viewport. */}
        <div
          className="@container relative mx-auto mt-10 hidden w-full max-w-[1092px] lg:mt-14 lg:block"
          style={{ aspectRatio: `${ROAD.width} / ${ROAD.height}` }}
        >
          <RoadPath className="absolute inset-0" />
          <RoadCar className="absolute inset-0 h-full w-full" />

          {steps.map((step, index) => {
            const frame = stepFrame(index);
            const copy = dict.howItWorks.steps[step.id];

            return (
              /* `data-road-step` hands this group to RoadCar, which brings the
                 marked parts in as the car turns onto their row. The parts are
                 the reveal targets, not this wrapper: a transform here would
                 make it the containing block and break their percentage
                 placement against the road. */
              <div key={step.id} data-road-step>
                <StepBadge
                  number={step.number}
                  data-road-part="badge"
                  className={`absolute z-10 ${ROAD_BADGE}`}
                  style={frame.badge}
                />

                <div className="absolute" data-road-part="photo" style={frame.image}>
                  <StepPhoto
                    src={step.image}
                    alt={copy.imageAlt}
                    className="size-full rounded-xl object-cover shadow-media"
                  />
                </div>

                <div
                  className="absolute flex flex-col justify-center"
                  data-road-part="copy"
                  style={frame.text}
                >
                  <h3
                    className={`${ROAD_TITLE} font-semibold tracking-[-0.02em] text-heading`}
                  >
                    {copy.title}
                  </h3>
                  <p className={`mt-[0.8em] ${ROAD_BODY} leading-[1.6] text-muted`}>
                    {copy.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ---- Phones and tablets ---------------------------------------
            Narrower than `lg` the four-column composition would squeeze body
            copy under its legible floor, so the road straightens into a
            single vertical run with the steps stacked beside it.

            From `md` each step turns into a photo/copy pair: a single column
            would otherwise stretch the photo to ~900px at the top of this
            range, which dwarfs everything around it. */}
        <Reveal
          as="ol"
          stagger={0.14}
          /* Capped through the tablet band: left to fill, a row would reach
             ~880px just below `lg` and the photo would tower over its copy. */
          className="relative mt-10 flex flex-col gap-9 md:mx-auto md:max-w-215 md:gap-12 lg:hidden"
        >
          <span
            aria-hidden
            className="absolute bottom-6 left-0 top-6 w-7 rounded-full bg-road"
          />
          <span
            aria-hidden
            className="absolute bottom-10 left-[11px] top-10 w-[3px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #fff 0 20px, transparent 20px 56px)",
            }}
          />
          {/* Inset to the ends of the tarmac bar above, and centred on the
              w-7 bar's midline. */}
          <RoadCarVertical className="absolute inset-y-6 left-3.5" />

          {steps.map((step) => {
            const copy = dict.howItWorks.steps[step.id];

            return (
              /* The badge sits on the road itself. On phones the copy has to
                 start clear of it vertically; from `md` there is room to clear
                 it sideways instead, so it becomes a marker level with its
                 row. */
              <li key={step.id} className="relative pl-12 md:pl-24">
                <StepBadge
                  number={step.number}
                  className="absolute -left-1.5 top-1 z-10 h-11 w-[68px] text-[20px] md:top-1/2 md:-translate-y-1/2"
                />

                <div className="pt-14 md:grid md:grid-cols-2 md:items-center md:gap-7 md:pt-0">
                  {/* Held to the source's own 461px: a full-width single column
                      passes that at around a 550px viewport, and upscaling a
                      photo is worse than leaving white space beside it. The
                      two-column pair above never reaches the cap. */}
                  <StepPhoto
                    src={step.image}
                    alt={copy.imageAlt}
                    className="aspect-video w-full max-w-[461px] rounded-xl object-cover shadow-media"
                  />
                  {/* Sized in one place so the two columns and the single
                      column read the same. */}
                  <div className="mt-5 md:mt-0">
                    <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-heading">
                      {copy.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-muted">
                      {copy.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
