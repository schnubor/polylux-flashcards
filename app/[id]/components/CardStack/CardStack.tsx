'use client';

import { Card } from './Card';

// Hooks
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import { useSearchParams } from 'next/navigation';

// Types
import { FlashcardData } from '@/app/types/flashcards';

interface Props {
    cards: FlashcardData[];
}

export function CardStack({ cards }: Props) {
    const searchParams = useSearchParams();

    const cardId = searchParams.get('card');
    const currentCardIndex = cards.findIndex((card) => card.id === cardId); // works
    const currentCard = cardId ? cards.find((card) => card.id === cardId) : cards[0];

    return (
        <div>
            <Card card={currentCard} />
        </div>
    );
}
