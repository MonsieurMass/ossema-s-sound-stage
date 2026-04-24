type PosterFormat = "story" | "square" | "landscape" | "a3";
type PosterTheme = "noir" | "vellum" | "rouge";
type PosterTypography = "playfair" | "serif" | "sans";

export type PosterOptions = {
  line: string;
  format: PosterFormat;
  theme: PosterTheme;
  typography: PosterTypography;
  branding?: boolean;
  artist?: string;
  handle?: string;
};

const SIZES: Record<PosterFormat, { width: number; height: number }> = {
  story: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
  landscape: { width: 1600, height: 900 },
  a3: { width: 2480, height: 3508 },
};

const THEMES: Record<PosterTheme, { background: string; text: string; accent: string }> = {
  noir: { background: "#08080a", text: "#f8f7f1", accent: "#bc2121" },
  vellum: { background: "#fcfcf9", text: "#101010", accent: "#bc2121" },
  rouge: { background: "#8d1717", text: "#fff8f6", accent: "#f0d9d4" },
};

const getFontFamily = (typography: PosterTypography) => {
  if (typography === "sans") return '600 92px Inter, Arial, sans-serif';
  if (typography === "serif") return 'italic 92px Georgia, serif';
  return 'italic 92px "Playfair Display", Georgia, serif';
};

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  lineHeight: number,
  x: number,
  y: number
) => {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
};

export const renderPoster = async ({
  line,
  format,
  theme,
  typography,
  branding = true,
  artist = "OSSEMA",
  handle = "@ossema",
}: PosterOptions) => {
  await document.fonts?.ready;

  const { width, height } = SIZES[format];
  const colors = THEMES[theme];
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");

  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, width, height);

  const gradient = ctx.createRadialGradient(width * 0.5, height * 0.18, 10, width * 0.5, height * 0.18, width * 0.45);
  gradient.addColorStop(0, `${colors.accent}66`);
  gradient.addColorStop(1, `${colors.accent}00`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = `${colors.text}22`;
  ctx.lineWidth = Math.max(2, width * 0.002);
  ctx.strokeRect(width * 0.06, height * 0.06, width * 0.88, height * 0.88);

  ctx.fillStyle = colors.text;
  ctx.font = getFontFamily(typography);
  ctx.textBaseline = "top";
  wrapText(ctx, line, width * 0.72, 118, width * 0.14, height * 0.24);

  ctx.font = '600 28px Inter, Arial, sans-serif';
  ctx.fillStyle = colors.accent;
  ctx.fillText("KYMIA MUSIC", width * 0.14, height * 0.12);

  if (branding) {
    ctx.font = 'italic 44px "Playfair Display", Georgia, serif';
    ctx.fillStyle = colors.text;
    ctx.fillText(artist, width * 0.14, height * 0.78);
    ctx.font = '500 28px Inter, Arial, sans-serif';
    ctx.fillStyle = `${colors.text}cc`;
    ctx.fillText(handle, width * 0.14, height * 0.835);
  }

  return canvas;
};

export const downloadPoster = async (options: PosterOptions, filename = "ossema-poster.png") => {
  const canvas = await renderPoster(options);
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = filename;
  link.click();
};
