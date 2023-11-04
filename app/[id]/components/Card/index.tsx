'use client';

// Hooks
import { useEffect, useState } from 'react';

// Utils
import { a, useSpring } from '@react-spring/web';
import clsx from 'clsx';
import Tilt from 'react-parallax-tilt';

// Types
import { FlashcardData } from '@/app/types/flashcards';

export function Card({ card }: { card?: FlashcardData }) {
    const [flipped, setFlipped] = useState(true);

    useEffect(() => {
        setFlipped(true);
    }, [card?.id]);

    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    if (!card) return null;

    const cardClass =
        'aspect-card absolute w-full max-w-2xl overflow-auto rounded-xl border p-4 flex items-center justify-center shadow-lg sm:aspect-[4/3] sm:rounded-2xl sm:p-8 bg-gradient-to-b';

    function handleClick() {
        setFlipped(!flipped);
    }

    return (
        <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            className="aspect-card mx-auto w-full max-w-2xl sm:aspect-[4/3]"
        >
            <a.div
                className={clsx(cardClass, 'border-sky-200 from-sky-100 to-sky-50')}
                style={{ opacity: opacity.to((o) => 1 - o), transform }}
            >
                <div className="text-lg sm:text-xl">{card.back}</div>
            </a.div>
            <a.div
                className={clsx(cardClass, 'border-stone-200 from-stone-100 to-stone-50')}
                style={{
                    opacity,
                    transform,
                    rotateY: '180deg',
                }}
                onClick={handleClick}
            >
                <div className="text-center">
                    <div className="text-xl">{card.front_primary}</div>
                    <div className="mt-4 text-neutral-400">{card.front_secondary}</div>
                </div>
            </a.div>
        </Tilt>
    );
}
