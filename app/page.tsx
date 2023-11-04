// Utils
import { Suspense } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// UI
import { Navigation } from '@/app/components/Navigation';
import { Skeleton } from '@/app/components/Skeleton';

// Types
import { FlashsetData } from '@/app/types/flashcards';

export default async function Home() {
    const cookieStore = cookies();

    const canInitSupabaseClient = () => {
        try {
            return createClient(cookieStore);
        } catch (e) {
            return false;
        }
    };

    const supabase = canInitSupabaseClient() ? createClient(cookieStore) : null;

    if (!supabase) {
        return <Skeleton />;
    }

    const { data: flashsets } = (await supabase.from('flashsets').select('*, flashcards(*)')) as {
        data: FlashsetData[];
    };

    // create 2 character uppercase initials from string
    const getInitials = (string: string) => {
        const names = string.split(' ');
        let initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }

        return initials;
    };

    return (
        <div>
            <Navigation />

            <div className="mx-auto max-w-screen-lg p-3">
                <Suspense fallback={<Skeleton />}>
                    <ul
                        role="list"
                        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
                    >
                        {flashsets.map((flashset) => (
                            <li key={flashset.id} className="col-span-1 flex rounded-md shadow-sm">
                                <div
                                    className="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
                                    style={{ background: flashset.color }}
                                >
                                    {getInitials(flashset.name).toUpperCase()}
                                </div>
                                <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                                    <div className="flex-1 truncate px-4 py-2 text-sm">
                                        <Link
                                            href={flashset.id}
                                            className="font-medium text-gray-900 hover:text-gray-600"
                                        >
                                            {flashset.name}
                                        </Link>
                                        <p className="text-gray-500">
                                            {flashset.flashcards.length} Flashcards
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Suspense>
            </div>
        </div>
    );
}
