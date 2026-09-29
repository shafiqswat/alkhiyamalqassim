/** @format */

/**
 * Rewrite Cloudinary delivery URLs for smaller, faster images.
 * Leaves non-Cloudinary URLs unchanged.
 */
export function optimizeImageUrl(url, { width = 480, height, quality = "auto" } = {}) {
  if (!url || typeof url !== "string") return url || "";
  try {
    if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
      return url;
    }
    // Already transformed
    if (/\/upload\/[^/]*[wf]_/.test(url)) return url;

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

    return url.replace("/upload/", `/upload/${transforms}/`);
  } catch {
    return url;
  }
}
