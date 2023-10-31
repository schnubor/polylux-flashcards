import DeployButton from '../components/DeployButton'
import AuthButton from '../components/AuthButton'
import { createClient } from '@/utils/supabase/server'
import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps'
import SignUpUserSteps from '@/components/SignUpUserSteps'
import Header from '@/components/Header'
import { cookies } from 'next/headers'
import {FlashsetData} from "@/app/types";

export default async function Index() {
  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    try {
      return createClient(cookieStore);
    } catch (e) {
      return false
    }
  }

  const supabase = canInitSupabaseClient() ? createClient(cookieStore) : null;

  if(!supabase) {
    return <div>Loading...</div>
  }

  const { data: flashsets } = (await supabase.from('flashsets').select('*, flashcards(*)')) as {
    data: FlashsetData[];
  };

  return (
      <div>TODO...</div>
  )

}
