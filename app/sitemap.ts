import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/our-work",
  "/heart-care",
  "/heart-care/cardiac-screening",
  "/heart-care/congenital-heart-support",
  "/heart-care/patient-support",
  "/health-support",
  "/community-initiatives",
  "/impact",
  "/get-involved",
  "/patient-support",
  "/donate",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/heart-care") ? 0.9 : 0.7,
  }));
}
