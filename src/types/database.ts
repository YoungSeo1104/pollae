export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      event_participants: {
        Row: {
          event_id: string
          guest_token: string | null
          has_voted: boolean
          id: string
          invited_at: string
          name: string
          user_id: string | null
        }
        Insert: {
          event_id: string
          guest_token?: string | null
          has_voted?: boolean
          id?: string
          invited_at?: string
          name: string
          user_id?: string | null
        }
        Update: {
          event_id?: string
          guest_token?: string | null
          has_voted?: boolean
          id?: string
          invited_at?: string
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          code: string
          created_at: string
          description: string | null
          host_id: string
          id: string
          title: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          host_id: string
          id?: string
          title: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          host_id?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          channel: Database["public"]["Enums"]["notify_channel"]
          created_at: string
          event_id: string
          id: string
          is_sent: boolean
          poll_id: string | null
          scheduled_at: string | null
          sent_at: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          channel: Database["public"]["Enums"]["notify_channel"]
          created_at?: string
          event_id: string
          id?: string
          is_sent?: boolean
          poll_id?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          channel?: Database["public"]["Enums"]["notify_channel"]
          created_at?: string
          event_id?: string
          id?: string
          is_sent?: boolean
          poll_id?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_items: {
        Row: {
          created_at: string
          description: string | null
          id: string
          label: string
          order: number
          poll_id: string
          slot_date: string | null
          slot_time: string | null
          slot_time_end: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          label: string
          order?: number
          poll_id: string
          slot_date?: string | null
          slot_time?: string | null
          slot_time_end?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          label?: string
          order?: number
          poll_id?: string
          slot_date?: string | null
          slot_time?: string | null
          slot_time_end?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "poll_items_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      polls: {
        Row: {
          anonymous_vote: boolean
          confirmed_at: string | null
          confirmed_item_id: string | null
          created_at: string
          event_id: string
          id: string
          order: number
          poll_type: Database["public"]["Enums"]["poll_type"]
          status: Database["public"]["Enums"]["poll_status"]
          title: string
          vote_deadline: string | null
        }
        Insert: {
          anonymous_vote?: boolean
          confirmed_at?: string | null
          confirmed_item_id?: string | null
          created_at?: string
          event_id: string
          id?: string
          order?: number
          poll_type: Database["public"]["Enums"]["poll_type"]
          status?: Database["public"]["Enums"]["poll_status"]
          title: string
          vote_deadline?: string | null
        }
        Update: {
          anonymous_vote?: boolean
          confirmed_at?: string | null
          confirmed_item_id?: string | null
          created_at?: string
          event_id?: string
          id?: string
          order?: number
          poll_type?: Database["public"]["Enums"]["poll_type"]
          status?: Database["public"]["Enums"]["poll_status"]
          title?: string
          vote_deadline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "polls_confirmed_item_fk"
            columns: ["confirmed_item_id"]
            isOneToOne: false
            referencedRelation: "poll_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "polls_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          id: string
          name?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          answer: Database["public"]["Enums"]["vote_answer"]
          id: string
          participant_id: string
          poll_item_id: string
          voted_at: string
        }
        Insert: {
          answer: Database["public"]["Enums"]["vote_answer"]
          id?: string
          participant_id: string
          poll_item_id: string
          voted_at?: string
        }
        Update: {
          answer?: Database["public"]["Enums"]["vote_answer"]
          id?: string
          participant_id?: string
          poll_item_id?: string
          voted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "event_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_poll_item_id_fkey"
            columns: ["poll_item_id"]
            isOneToOne: false
            referencedRelation: "poll_items"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_event_host: { Args: { target_event: string }; Returns: boolean }
    }
    Enums: {
      notify_channel: "email" | "webpush"
      poll_status: "voting" | "closed" | "confirmed"
      poll_type: "schedule" | "place" | "custom"
      vote_answer: "yes" | "maybe" | "no"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      notify_channel: ["email", "webpush"],
      poll_status: ["voting", "closed", "confirmed"],
      poll_type: ["schedule", "place", "custom"],
      vote_answer: ["yes", "maybe", "no"],
    },
  },
} as const
