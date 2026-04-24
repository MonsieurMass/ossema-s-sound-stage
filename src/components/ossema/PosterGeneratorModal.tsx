import { useEffect, useMemo, useState } from "react";
import { ossema } from "@/data/ossema";
import { downloadPoster, renderPoster } from "@/lib/poster";
import { trackEvent } from "@/lib/analytics";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { X } from "lucide-react";

export type PosterModalProps = {
  open: boolean;
  onClose: () => void;
};

const PosterGeneratorModal = ({ open, onClose }: PosterModalProps) => {
  const [line, setLine] = useState(ossema.lyrics[0]?.text ?? "");
  const [format, setFormat] = useState<"story" | "square" | "landscape" | "a3">("story");
  const [theme, setTheme] = useState<"noir" | "vellum" | "rouge">("noir");
  const [typography, setTypography] = useState<"playfair" | "serif" | "sans">("playfair");
  const [branding, setBranding] = useState(true);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    let active = true;
    renderPoster({ line, format, theme, typography, branding, artist: ossema.artist }).then((canvas) => {
      if (active) setPreview(canvas.toDataURL("image/png"));
    });
    return () => {
      active = false;
    };
  }, [branding, format, line, open, theme, typography]);

  const currentLineIndex = useMemo(
    () => Math.max(0, ossema.lyrics.findIndex((item) => item.text === line)),
    [line]
  );

  if (!open) return null;

  const handleDownload = async () => {
    await downloadPoster(
      { line, format, theme, typography, branding, artist: ossema.artist, handle: "@ossema" },
      `ossema-${format}-${currentLineIndex + 1}.png`
    );
    await trackEvent("poster_download", { line, format, theme });
    if (isSupabaseConfigured && supabase) {
      await supabase.from("poster_downloads").insert({ lyric_line: line, format, theme });
    }
  };

  return (
    <div className="fixed inset-0 z-[90] bg-ink/80 backdrop-blur-sm p-4 md:p-8">
      <div className="max-w-6xl h-full mx-auto bg-vellum text-ink silver-border grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] overflow-hidden">
        <div className="bg-ink flex items-center justify-center p-6 md:p-10 min-h-[45vh]">
          {preview ? (
            <img src={preview} alt="Apercu du poster" className="max-h-full max-w-full object-contain shadow-2xl" />
          ) : (
            <div className="text-vellum/70">Generation...</div>
          )}
        </div>
        <div className="p-6 md:p-8 overflow-y-auto">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="caption text-signature mb-2">Poster generator</p>
              <h3 className="font-serif-display text-3xl italic tracking-tight">Creer mon poster</h3>
            </div>
            <button onClick={onClose} className="size-10 border border-border flex items-center justify-center hover:bg-ink hover:text-vellum transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="space-y-5 text-sm">
            <label className="block">
              <span className="caption opacity-50 mb-2 block">Ligne</span>
              <select value={line} onChange={(e) => setLine(e.target.value)} className="w-full border border-border bg-transparent px-4 py-3">
                {ossema.lyrics.map((item) => (
                  <option key={item.time} value={item.text}>{item.text}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="caption opacity-50 mb-2 block">Format</span>
              <select value={format} onChange={(e) => setFormat(e.target.value as typeof format)} className="w-full border border-border bg-transparent px-4 py-3">
                <option value="story">Story 9:16</option>
                <option value="square">Carre 1:1</option>
                <option value="landscape">Paysage 16:9</option>
                <option value="a3">A3 Vertical</option>
              </select>
            </label>

            <label className="block">
              <span className="caption opacity-50 mb-2 block">Theme</span>
              <select value={theme} onChange={(e) => setTheme(e.target.value as typeof theme)} className="w-full border border-border bg-transparent px-4 py-3">
                <option value="noir">Noir</option>
                <option value="vellum">Vellum</option>
                <option value="rouge">Rouge</option>
              </select>
            </label>

            <label className="block">
              <span className="caption opacity-50 mb-2 block">Typographie</span>
              <select value={typography} onChange={(e) => setTypography(e.target.value as typeof typography)} className="w-full border border-border bg-transparent px-4 py-3">
                <option value="playfair">Playfair Display</option>
                <option value="serif">Serif</option>
                <option value="sans">Sans serif</option>
              </select>
            </label>

            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked={branding} onChange={(e) => setBranding(e.target.checked)} />
              Afficher le branding Kymia / @ossema
            </label>

            <button onClick={handleDownload} className="w-full bg-signature text-vellum px-6 py-4 caption font-bold hover:bg-signature-glow transition-colors">
              Telecharger le poster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterGeneratorModal;
