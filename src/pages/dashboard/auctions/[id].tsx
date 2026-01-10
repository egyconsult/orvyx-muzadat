import { supabase } from '@/lib/supabaseClient';

export default async function LotPage({ params }: { params: { id: string } }) {
  const lotId = params.id;
  
  const { data: lot, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', lotId)
    .single();

  if (error || !lot) {
    return <div>مزاد غير موجود: {lotId}</div>;
  }

  return (
    <div>
      <h1>{lot.title}</h1>
      <p>${lot.price}</p>
      <img src={lot.image_url} alt={lot.title} />
    </div>
  );
}
