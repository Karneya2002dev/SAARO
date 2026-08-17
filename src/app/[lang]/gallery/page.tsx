import type { Metadata } from "next";
import { Gallery } from "@/components/sections/Gallery";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.gallery.metaTitle,
    description: dict.gallery.metaDescription,
  };
}

export default function GalleryPage() {
  return <Gallery />;
}
