import { site } from "@/config";
import type { SuburbCopy } from "@/config/types";
import type { CopySource } from "@/lib/copy";
import type { JsonLd as JsonLdData } from "@/lib/seo";
import { getNearby, type Suburb } from "@/lib/suburbs";
import CtaBand from "./CtaBand";
import EquipmentGrid from "./EquipmentGrid";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import JsonLd from "./JsonLd";
import LocalInfo from "./LocalInfo";
import MobileBar from "./MobileBar";
import NearbySuburbs from "./NearbySuburbs";
import ProcessSteps from "./ProcessSteps";
import SiteQuoteModal from "./SiteQuoteModal";
import SectorCards from "./SectorCards";
import SuburbSwitcher from "./SuburbSwitcher";
import Ticker from "./Ticker";
import TrustStrip from "./TrustStrip";

interface Props {
  suburb: Suburb;
  copy: SuburbCopy;
  copySource: CopySource;
  jsonLd: JsonLdData;
  /** Suburb pages show the local facts + FAQ block. */
  local?: boolean;
}

export default function Landing({ suburb, copy, copySource, jsonLd, local = false }: Props) {
  const json = JSON.stringify(jsonLd);
  return (
    <>
      <JsonLd json={json} />
      <SuburbSwitcher current={{ slug: suburb.slug, suburb: suburb.suburb, state: suburb.state }} schemaJson={json} />
      <Header />
      <main id="main">
        <Hero suburb={suburb} intro={local ? copy.intro : undefined} />
        <Ticker items={site.ticker} />
        <TrustStrip />
        <SectorCards />
        <EquipmentGrid />
        <ProcessSteps />
        {local && <LocalInfo suburb={suburb} copy={copy} source={copySource} />}
        <NearbySuburbs suburb={suburb} nearby={getNearby(suburb)} />
        <CtaBand />
      </main>
      <Footer />
      <MobileBar />
      <SiteQuoteModal defaultSuburb={`${suburb.suburb} ${suburb.state} ${suburb.postcode}`} />
    </>
  );
}
