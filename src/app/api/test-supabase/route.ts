import { supabase } from '@/lib/supabaseClient'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data, error } = await supabase.from('properties').select('*')
  return NextResponse.json({ data, error })
}
