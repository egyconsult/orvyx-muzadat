'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ApprovedPage() {
  const [status, setStatus] = useState<'loading' | 'approved' | 'pending'>('loading');
  const router = useRouter();

  useEffect(() => {
    const checkApproval = () => {
      setTimeout(() => {
        // محاكاة التحقق (Supabase لاحقاً)
        const approved = localStorage.getItem('userApproved') !== 'false';
        setStatus(approved ? 'approved' : 'pending');
        
        if (approved) {
          setTimeout(() => router.push('/dashboard'), 2000);
        }
      }, 800);
    };

    checkApproval();
  }, [router]);

  const Button = ({ 
    children, 
    onClick, 
    disabled 
  }: { 
    children: React.ReactNode; 
    onClick?: () => void; 
    disabled?: boolean 
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform ${
        disabled
          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
          : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:shadow-2xl hover:scale-[1.02] text-white'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/50">
        {/* Loading */}
        {status === 'loading' && (
          <div className="flex flex-col items-center space-y-6">
            <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <p className="text-xl text-gray-600 font-semibold">جاري التحقق من الموافقة...</p>
          </div>
        )}

        {/* Approved */}
        {status === 'approved' && (
          <>
            <div className="w-32 h-32 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-xl">
              <span className="text-5xl font-black">✅</span>
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-6">
              تمت الموافقة!
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              حسابك مُعتمد الآن ✅<br/>
              يمكنك البدء في المزايدة على العقارات الفاخرة
            </p>
            <Button onClick={() => router.push('/auctions')}>
              🚀 ابدأ المزايدة الآن
            </Button>
          </>
        )}

        {/* Pending */}
        {status === 'pending' && (
          <>
            <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-xl animate-pulse">
              <span className="text-5xl font-black">⏳</span>
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
              قيد المراجعة
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              طلبك وصل لفريق دار المزادات<br/>
              سيتم إخطارك عند انتهاء المراجعة
            </p>
            <Button onClick={() => router.push('/dashboard')}>
              📋 لوحة التحكم
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
