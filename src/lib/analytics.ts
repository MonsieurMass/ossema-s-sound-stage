import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { getSessionId, getVisitorContext } from "@/lib/session";

export type AnalyticsEventType =
  | "page_view"
  | "audio_play"
  | "audio_duration"
  | "presave_click"
  | "streaming_click"
  | "fanlist_submit"
  | "poster_download"
  | "merch_size_select"
  | "video_play"
  | "share_click";

export const trackEvent = async (
  eventType: AnalyticsEventType,
  metadata: Record<string, unknown> = {}
) => {
  if (!isSupabaseConfigured || !supabase) return;

  const visitor = getVisitorContext();

  await supabase.from("analytics_events").insert({
    event_type: eventType,
    session_id: getSessionId(),
    metadata: {
      ...metadata,
      city: visitor.city ?? null,
      country: visitor.country ?? null,
      pathname: typeof window !== "undefined" ? window.location.pathname : null,
    },
  });
};
