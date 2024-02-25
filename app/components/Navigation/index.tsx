// Utils
import Link from 'next/link';

// UI
import { CardStackIcon } from '@radix-ui/react-icons';

export function Navigation({ title }: { title?: string }) {
    return (
        <nav className="mx-auto flex h-16 w-full max-w-screen-lg justify-start">
            <div className="text-foreground flex w-full min-w-0 items-center justify-between truncate p-6 text-sm md:max-w-4xl lg:max-w-screen-lg xl:max-w-screen-xl">
                <Link href="/" className="flex min-w-0 items-center">
                    <CardStackIcon className="inline h-6 w-6 flex-shrink-0 text-sky-500" />
                    {title ? (
                        <span className="truncate pl-3 text-lg font-bold">{title}</span>
                    ) : (
                        <>
                            <span className="pl-3 text-lg font-bold">Polylux</span>
                            <span className="pl-1 text-lg font-bold text-sky-500">Flashcards</span>
                        </>
                    )}
                </Link>
            </div>
        </nav>
    );
}
