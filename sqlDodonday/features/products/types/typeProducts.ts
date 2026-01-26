export interface Products {
    id: number; 
    name: string;
    description: string | null;
    icon: string | null;
    link: string | null; 
    is_active: boolean;
    created_at: string;
    updated_at: string;
    text_color: string;
    bg_color: string;
}