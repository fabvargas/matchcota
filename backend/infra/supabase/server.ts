import { createClient, SupabaseClient } from "@supabase/supabase-js";

export class SupabaseService {
  private static instance: SupabaseService;

  private supabase: SupabaseClient;
  private supabaseAdmin: SupabaseClient | null = null;

  private constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabasePublishableKey) {
      throw new Error("Missing Supabase environment variables");
    }

    // Cliente público (RLS)
    this.supabase = createClient(
      supabaseUrl,
      supabasePublishableKey
    );

    // Cliente admin (opcional)
    if (supabaseSecretKey) {
      this.supabaseAdmin = createClient(
        supabaseUrl,
        supabaseSecretKey
      );
    }
  }

  // 🔥 Singleton getter
  static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  // Cliente normal
  getClient(): SupabaseClient {
    return this.supabase;
  }

  // Cliente admin
  getAdminClient(): SupabaseClient {
    if (!this.supabaseAdmin) {
      throw new Error("Supabase admin client not configured");
    }
    return this.supabaseAdmin;
  }
}