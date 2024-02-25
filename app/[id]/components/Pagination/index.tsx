'use client';

// UI
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

// Utils
import clsx from 'clsx';

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
        <div className="mt-6 flex items-center justify-center space-x-4 sm:mt-12">
            <button
                className={clsx(
                    'rounded-lg bg-sky-100 p-2 text-sky-600 shadow-md hover:bg-sky-200 focus:outline-none',
                    {
                        'cursor-not-allowed opacity-50': currentIndex === 0,
                        'hover:bg-stone-200': currentIndex !== 0,
                    },
                )}
                onClick={handlePrevClick}
                disabled={currentIndex === 0}
            >
                <ChevronLeftIcon className="size-5" />
            </button>

            <div className="text-sm text-stone-500">
                Karte {currentIndex + 1} von {cards.length}
            </div>

            <button
                className={clsx(
                    'rounded-lg bg-sky-100 p-2 text-sky-600 shadow-md hover:bg-sky-200 focus:outline-none',
                    {
                        'cursor-not-allowed opacity-50': currentIndex === cards.length - 1,
                        'hover:bg-stone-200': currentIndex !== cards.length - 1,
                    },
                )}
                onClick={handleNextClick}
                disabled={currentIndex === cards.length - 1}
            >
                <ChevronRightIcon className="size-5" />
            </button>
        </div>
    );
}
