import type { SiteConfig } from "./types";
import { lowerFirst, pick, stateName } from "@/lib/text";

type Copy = SiteConfig["copy"];

export const heavyMoversCopy: Copy = {
  metaTitle: (s) => `${s.suburb} Heavy Movers | ${s.state} Specialist Lifting`,
  metaDescription: (s) =>
    `Heavy-item lifting in ${s.suburb} ${s.postcode}: stair-climbers, gantries and trained crews for hospitals, schools, removalists and government in ${s.council}.`,
  fallback: (s) => {
    const openers = [
      `Moving something heavy in ${s.suburb}? Our crews handle the loads standard removalists can't — safely, on schedule and fully planned.`,
      `${s.suburb} jobs often come down to one difficult item. We bring the stair-climbers, gantries and crew to move it without drama.`,
      `From clinical equipment to school lab benches, we plan every heavy lift in ${s.suburb} around the access you actually have.`,
    ];
    const school = s.nearbySchool
      ? ` Schools such as ${s.nearbySchool} can book relocations for holiday periods so classes aren't disrupted.`
      : "";
    return {
      intro: pick(openers, s.slug),
      localContext:
        `Clinical moves around ${s.nearbyHospital} are planned for after-hours windows with clean, padded handling.${school} ` +
        `On the ground in ${s.suburb}, ${lowerFirst(s.localAccessNote)} That is why every job in the ${s.council} area starts with a route check, so the right equipment arrives the first time.`,
      faqs: [
        {
          q: `Can you move heavy items up stairs in ${s.suburb}?`,
          a: `Yes. Powered stair-climbers handle most fixed staircases. We confirm step count, landing size and floor loading before the job so there are no surprises on the day.`,
        },
        {
          q: `Do you work with hospitals near ${s.suburb}?`,
          a: `We plan clinical moves around ward operations, including after-hours windows, wipe-clean padding and lift bookings — including sites like ${s.nearbyHospital}.`,
        },
        {
          q: `Do you subcontract to removalists in ${stateName(s.state)}?`,
          a: `Yes. Removalists can hand us the heavy item while their crew completes the rest of the move. We can work under your brand.`,
        },
      ],
    };
  },
};
