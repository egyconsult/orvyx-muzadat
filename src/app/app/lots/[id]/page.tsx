import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LotPage({ params }: PageProps) {
  const { id } = await params;  // ✅ Await params - no ! needed [web:14]
  console.log('🆔 Lot ID:', id);  // DEBUG

  const { data: lot, error } = await supabase
    .from('properties')  // أو auctions/loans حسب table [memory:1]
    .select('*')
    .eq('id', id)
    .single();

  if (error || !lot) {
    console.error('❌ Lot not found:', error?.message);
    notFound();  // ✅ Next.js notFound() بدل return null عشان 404 clean
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">{lot.title}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <img src={lot.image_url} alt={lot.title} className="rounded-xl shadow-2xl" />
        <div>
          <p className="text-3xl font-bold text-emerald-600 mb-4">
            ${Number(lot.price).toLocaleString()}
          </p>
          {/* باقي details: bids, end_time, etc */}
        </div>
      </div>
    </div>
  );
}
