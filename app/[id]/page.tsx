// Utils
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

// UI
import { Navigation } from '@/app/components/Navigation';
import { Skeleton } from '@/app/components/Skeleton';

// Types
import { FlashsetData } from '@/app/types/flashcards';

export default async function Flashset({ params }: { params: { id: string } }) {
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
        return <div>Loading...</div>;
    }

    const { data: flashsets } = (await supabase
        .from('flashsets')
        .select('*, flashcards(*)')
        .filter('id', 'eq', params.id)) as { data: FlashsetData[] };

    if (!flashsets || !flashsets.length) return notFound();

    const flashset = flashsets[0];

    return (
        <div>
            <Navigation />

            <div className="mx-auto max-w-screen-lg p-3">
                <Suspense fallback={<Skeleton />}>
                    <h1>{flashset.name}</h1>
                </Suspense>
            </div>
        </div>
    );
}
