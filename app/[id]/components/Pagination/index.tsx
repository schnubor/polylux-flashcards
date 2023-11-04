'use client';

// UI
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

// Hooks
import { useSearchParams, useRouter } from 'next/navigation';

// Types
import type { FlashcardData } from '@/app/types/flashcards';

export function Pagination({ cards, setId }: { cards: FlashcardData[]; setId: string }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentCardId = searchParams.get('card');
    const currentIndex = currentCardId ? cards.findIndex((card) => card.id === currentCardId) : 0;

    const handlePrevClick = () => {
        const prevCard = cards[currentIndex - 1];

        if (prevCard) {
            router.push(`/${setId}?card=${prevCard.id}`);
        }
    };

    const handleNextClick = () => {
        const nextCard = cards[currentIndex + 1];

        if (nextCard) {
            router.push(`/${setId}?card=${nextCard.id}`);
        } else {
            router.push(`/${setId}`);
        }
    };

    return (
        <div className="mt-4 flex justify-center space-x-4">
            <button
                className="rounded-lg bg-stone-100 p-2 shadow-lg hover:bg-stone-200 focus:outline-none"
                onClick={handlePrevClick}
                disabled={currentIndex === 0}
            >
                <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
                className="rounded-lg bg-stone-100 p-2 shadow-lg hover:bg-stone-200 focus:outline-none"
                onClick={handleNextClick}
                disabled={currentIndex === cards.length - 1}
            >
                <ChevronRightIcon className="h-5 w-5" />
            </button>
        </div>
    );
}
