export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      analytics_events: {
        Row: {
          id: string;
          session_id: string;
          event_type: string;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          event_type: string;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          event_type?: string;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      fan_subscribers: {
        Row: {
          artist: string;
          consent_at: string | null;
          consent_given: boolean;
          country: string | null;
          city: string | null;
          created_at: string;
          email: string;
          id: string;
          preferred_platform: string | null;
          referrer: string | null;
          source: string | null;
        };
        Insert: {
          artist?: string;
          consent_at?: string | null;
          consent_given?: boolean;
          country?: string | null;
          city?: string | null;
          created_at?: string;
          email: string;
          id?: string;
          preferred_platform?: string | null;
          referrer?: string | null;
          source?: string | null;
        };
        Update: {
          artist?: string;
          consent_at?: string | null;
          consent_given?: boolean;
          country?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          preferred_platform?: string | null;
          referrer?: string | null;
          source?: string | null;
        };
        Relationships: [];
      };
      merch_waitlist: {
        Row: {
          id: string;
          email: string;
          product_slug: string;
          size: string | null;
          consent_given: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          product_slug: string;
          size?: string | null;
          consent_given?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          product_slug?: string;
          size?: string | null;
          consent_given?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      page_visitors: {
        Row: {
          session_id: string;
          country: string | null;
          city: string | null;
          arrived_at: string;
          last_seen_at: string;
        };
        Insert: {
          session_id: string;
          country?: string | null;
          city?: string | null;
          arrived_at?: string;
          last_seen_at?: string;
        };
        Update: {
          session_id?: string;
          country?: string | null;
          city?: string | null;
          arrived_at?: string;
          last_seen_at?: string;
        };
        Relationships: [];
      };
      poster_downloads: {
        Row: {
          id: string;
          lyric_line: string;
          format: string;
          theme: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          lyric_line: string;
          format: string;
          theme: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          lyric_line?: string;
          format?: string;
          theme?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
