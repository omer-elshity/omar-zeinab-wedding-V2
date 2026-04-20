// 1. تعديل بسيط في الـ InfoSection لزيادة التباعد (Breathing Room)
const InfoSection = memo(() => (
  <div className="w-full px-2 tabular mt-4">
    <p className="font-royal text-2xl md:text-3xl text-[#3d2b1f] tracking-[0.3em] mb-6 font-semibold">11 . 05 . 2026</p>
    <div className="mb-10 space-y-3">
      <p className="font-sans text-[14px] text-[#8c7355] font-bold uppercase tracking-[2px]">Ramage Hotel, New Cairo</p>
      <p className="font-sans text-[10px] text-[#777] uppercase tracking-[3px] italic font-medium">The Andalusian Open Air Venue | 7:00 PM</p>
    </div>
    
    {/* تم زيادة الـ margin-top هنا لـ mt-10 لراحة العين */}
    <div className="mt-10 px-6 mx-auto border-t border-[#e8dfd5] pt-10">
      <p className="font-arabic text-[19px] md:text-[21px] text-[#5d4037] leading-loose italic font-medium">
        مَا لِلدِّيَارِ تَبَاهَتْ فِي أَنَاقَتِهَا
        <br />
        إِلَّا لِأَنَّكُمُ لِلرُّوحِ زُوَّارُ
      </p>
      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#b8860b] to-transparent mx-auto mt-6 opacity-60"></div>
    </div>
  </div>
));

// 2. تعديل نص الزرار في الجزء السفلي من الكود
<div className="flex flex-col md:flex-row gap-5 w-full justify-center px-4 mt-10">
  <button 
    onClick={() => setShowConfirm(true)} 
    className="min-w-[220px] py-4 bg-[#b8860b] text-white font-sans text-[11px] font-bold tracking-[3px] uppercase hover:bg-[#8c6609] active:scale-95 transition-all duration-300 shadow-xl rounded-full"
  >
    Confirm Attendance
  </button>
  <button 
    onClick={() => window.open("https://maps.app.goo.gl/YourActualMapLink")} 
    className="flex items-center justify-center gap-3 text-[#8c7355] font-sans text-[11px] tracking-[3px] uppercase hover:text-[#b8860b] transition-all font-bold"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
    {/* التغيير هنا: من Location Map إلى View Location */}
    View Location
  </button>
</div>
