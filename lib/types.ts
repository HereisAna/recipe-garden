export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
          id: string
          title: string
          difficulty: 'easy' | 'medium' | 'hard'
          categories: string[]
          description: string
          ingredients: Ingredient[]
          steps: string[]
          notes: string | null
          image_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          difficulty: 'easy' | 'medium' | 'hard'
          categories: string[]
          description: string
          ingredients: Ingredient[]
          steps: string[]
          notes?: string | null
          image_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          difficulty?: 'easy' | 'medium' | 'hard'
          categories?: string[]
          description?: string
          ingredients?: Ingredient[]
          steps?: string[]
          notes?: string | null
          image_url?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Recipe = Database['public']['Tables']['recipes']['Row'];
export type RecipeInsert = Database['public']['Tables']['recipes']['Insert'];
export type RecipeUpdate = Database['public']['Tables']['recipes']['Update'];

export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 'breakfast' | 'lunch' | 'dinner' | 'drinks' | 'snacks';
