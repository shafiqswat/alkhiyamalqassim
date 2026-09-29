/** @format */

/**
 * Rewrite Cloudinary delivery URLs for smaller, faster images.
 * Leaves non-Cloudinary URLs unchanged.
 */
export function optimizeImageUrl(
  url,
  { width = 400, height, quality = "auto:eco" } = {}
) {
  if (!url || typeof url !== "string") return url || "";
  try {
    if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
      return url;
    }

    // Strip prior transforms then re-apply lean ones
    const cleaned = url.replace(
      /\/upload\/(?:[^/]+\/)*(?=v\d+|[^/]+$)/,
      "/upload/"
    );

    const transforms = [
      "f_auto",
      "q_" + quality,
      "c_fill",
      `w_${width}`,
      height ? `h_${height}` : null,
      "dpr_auto",
    ]
      .filter(Boolean)
      .join(",");

    return cleaned.replace("/upload/", `/upload/${transforms}/`);
  } catch {
    return url;
  }
}
