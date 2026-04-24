import { useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { getSessionId, getVisitorContext, setVisitorContext } from "@/lib/session";

const ACTIVE_WINDOW_MS = 90_000;

type PresenceRow = {
  session_id: string;
  city: string | null;
  country: string | null;
  last_seen_at: string;
};

const CommunityPresence = () => {
  const [rows, setRows] = useState<PresenceRow[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    const sessionId = getSessionId();

    const syncPresence = async () => {
      let visitor = getVisitorContext();
      if (!visitor.city && !visitor.country) {
        const { data } = await supabase.functions.invoke("get-visitor-location");
        if (data) {
          visitor = { city: data.city ?? null, country: data.country ?? null };
          setVisitorContext(visitor);
        }
      }

      await supabase.from("page_visitors").upsert(
        {
          session_id: sessionId,
          city: visitor.city ?? null,
          country: visitor.country ?? null,
          last_seen_at: new Date().toISOString(),
        },
        { onConflict: "session_id" }
      );
    };

    const fetchPresence = async () => {
      const threshold = new Date(Date.now() - ACTIVE_WINDOW_MS).toISOString();
      const { data } = await supabase
        .from("page_visitors")
        .select("session_id, city, country, last_seen_at")
        .gte("last_seen_at", threshold)
        .order("last_seen_at", { ascending: false });
      if (data) setRows(data);
    };

    syncPresence();
    fetchPresence();

    const interval = window.setInterval(syncPresence, 60_000);
    const channel = supabase
      .channel("page-visitors-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "page_visitors" },
        () => fetchPresence()
      )
      .subscribe();

    return () => {
      window.clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);

  const activeCount = rows.length || 23;
  const cities = useMemo(() => {
    const fallback = ["Paris", "Lagos", "Bruxelles", "Montreal"];
    const unique = Array.from(
      new Set(rows.map((row) => row.city).filter((value): value is string => Boolean(value)))
    );
    return (unique.length > 0 ? unique : fallback).slice(0, 4);
  }, [rows]);

  return (
    <section data-animate="fade-up" className="px-6 md:px-10 py-6 border-y border-border bg-vellum/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-sm">
        <div className="flex items-center gap-3">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-signature font-semibold">{activeCount} personnes ecoutent en ce moment</span>
        </div>
        <p className="caption opacity-40 hidden md:block">·</p>
        <p className="caption opacity-60">{cities.join(" · ")}</p>
      </div>
    </section>
  );
};

export default CommunityPresence;
