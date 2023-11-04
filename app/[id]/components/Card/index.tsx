'use client';

// Hooks
import { useState } from 'react';

// UI
import Tilt from 'react-parallax-tilt';
import { a, useSpring } from '@react-spring/web';

export function Card({
    id,
    front_primary,
    front_secondary,
    back,
}: {
    id: string;
    front_primary: string;
    front_secondary: string;
    back: string;
}) {
    const [flipped, setFlipped] = useState(false);

    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    function handleClick() {
        setFlipped(!flipped);
    }

    return (
        <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            gyroscope={true}
            className="aspect-card mx-auto w-full max-w-2xl sm:aspect-[4/3]"
        >
            <a.div
                id={id}
                className="aspect-card absolute w-full max-w-2xl overflow-auto rounded-xl border border-sky-200 bg-sky-100 p-4 shadow-lg sm:aspect-[4/3] sm:rounded-2xl sm:p-8"
                style={{ opacity: opacity.to((o) => 1 - o), transform }}
            >
                <div className="text-lg sm:text-xl">{back}</div>
            </a.div>
            <a.div
                id={id}
                className="aspect-card absolute mx-auto w-full max-w-2xl overflow-auto rounded-xl border bg-stone-100 p-4 shadow-lg sm:aspect-[4/3] sm:rounded-2xl sm:p-8"
                style={{
                    opacity,
                    transform,
                    rotateY: '180deg',
                }}
                onClick={handleClick}
            >
                <div className="text-xl">{front_primary}</div>
                <div className="text-neutral-400">{front_secondary}</div>
            </a.div>
        </Tilt>
    );
}
