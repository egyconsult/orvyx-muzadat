// src/app/auctions/page.tsx - صفحة المزادات الفاخرة
import Image from 'next/image';

const auctions = [
  {
    id: 1,
    title: 'قصر الملك - الشيخ زايد',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    currentBid: 2500000,
    endTime: '3d 12h',
    bids: 47
  },
  {
    id: 2,
    title: 'فيلا الشاطئ - المارينا',
    image: 'https://images.unsplash.com/photo-1600607687929-55e3a4aee3fa?w=800',
    currentBid: 1800000,
    endTime: '1d 8h',
    bids: 32
  },
  {
    id: 3,
    title: 'برج الخليج - داون تاون',
    image: 'https://images.unsplash.com/photo-1558618047-7c8d0c5d6e92?w=800',
    currentBid: 4500000,
    endTime: '5d 22h',
    bids: 89
  }
];

export default function AuctionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            المزادات الحالية
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-semibold max-w-2xl mx-auto">
            مزايد على أفخم العقارات في مصر والخليج
          </p>
        </div>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {auctions.map((auction) => (
            <div key={auction.id} className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={auction.image}
                  alt={auction.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  نشط
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {auction.title}
                </h3>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-black text-emerald-600">
                      ৳ {auction.currentBid.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">المزايدة الحالية</span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <span>🕐 {auction.endTime}</span>
                  <span>👥 {auction.bids} مزايدة</span>
                </div>

                {/* CTA */}
                <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
                  انضم للمزايدة 🚀
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
