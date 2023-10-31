export interface FlashcardData {
    id: string;
    created_at: string;
    flashset_id: string;
    front_primary: string;
    front_secondary: string;
    back: string;
}

export interface FlashsetData {
    id: string;
    created_at: string;
    name: string;
    color: string;
    flashcards: FlashcardData[];
}
