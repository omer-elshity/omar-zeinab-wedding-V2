"use client";
import React, { useState, useEffect, useRef, memo } from "react";

interface TimeLeft {
  days: number; hours: number; minutes: number;
}

const NamesHeader = memo(() => (
  <div className="mb-12 w-full flex flex-col items-center" style={{ isolation: 'isolate' }}>
    <h1 className="font-royal text-4xl md:text-6xl font-medium tracking-[0.2em] leading-tight gold-text-metallic uppercase">
      Omar
    </h1>
    <span className="font-arabic text-3xl text-[#b8860b] my-4 leading-none opacity-80">&</span>
    <h1 className="font-royal text-4xl md:text-6xl font-medium tracking-[0.2em] leading-tight gold-text-metallic uppercase">
      Zeinab
    </h1>
    <p className="font-arabic text-[#5d4037] text-2xl mt-8 italic font-medium">ننتظركم بكل حب في حفل زفافنا</p>
  </div>
));
NamesHeader.displayName = "NamesHeader";

const InfoSection = memo(() => (
  <div className="w-full px-2 tabular mt-4">
    <p className="font-royal text-2xl md:text-3xl text-[#3d2b1f] tracking-[0.3em] mb-6 font-semibold">11 . 05 . 2026</p>
    <div className="mb-10 space-y-3">
      <p className="font-sans text-[14px] text-[#8c7355] font-bold uppercase tracking-[2px]">Ramage Hotel, New Cairo</p>
      <p className="font-sans text-[10px] text-[#777] uppercase tracking-[3px] italic font-medium">The Andalusian Open Air Venue | 7:00 PM</p>
    </div>
    
    {/* التعديل: زيادة المسافة فوق بيت الشعر لراحة العين */}
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
InfoSection.displayName = "InfoSection";

const TimerSection = memo(({ timeLeft }: { timeLeft: TimeLeft }) => (
  <section className="w-full py-8 border-y border-[#e8dfd5] mb-12 flex justify-center gap-8 md:gap-14 h-[110px] items-center">
    <TimeUnit value={timeLeft.days} label="Days" />
    <TimeUnit value={timeLeft.hours} label="Hours" />
    <TimeUnit value={timeLeft.minutes} label="Mins" />
  </section>
));
TimerSection.displayName = "TimerSection";

const WeddingInvitation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0 });
  const [mounted, setMounted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const doorAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2026-05-11T20:00:00").getTime();
    
    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 60000); 
    return () => clearInterval(timer);
  }, []);

  const handleOpen = () => {
    setIsOpening(true);
    if (doorAudioRef.current) {
      doorAudioRef.current.play().catch(err => console.log(err));
    }

    setTimeout(() => {
      setIsOpen(true);
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(err => console.log(err));
      }
    }, 2400); 
  };

  return (
    <main className="min-h-screen bg-[#f5f1ea] flex items-center justify-center p-4 overflow-hidden relative">
      <audio ref={audioRef} src="/music.mp3" preload="auto" loop />
      <audio ref={doorAudioRef} src="/door-open.mp3" preload="auto" />

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;500;700&family=Montserrat:wght@200;300;400;500;600;700&display=swap');
        
        .font-royal { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-arabic { font-family: 'Amiri', serif; }
        .tabular { font-variant-numeric: tabular-nums; }

        .rotating-text { 
          animation: rotateText 25s linear infinite; 
          transform-origin: center;
        }
        @keyframes rotateText { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .gold-text-metallic {
          background: linear-gradient(45deg, #a67c00 0%, #bf9b30 20%, #ffefca 45%, #ffffff 50%, #ffefca 55%, #bf9b30 80%, #a67c00 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: goldReflect 5s ease infinite;
        }
        @keyframes goldReflect { 
          0% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
          100% { background-position: 0% 50%; } 
        }

        .gold-dust {
          position: absolute;
          background: radial-gradient(circle, #f3cf7a 20%, #b8860b 80%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          animation: rainFall linear infinite;
        }

        @keyframes rainFall {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(110vh) translateX(30px) rotate(360deg); opacity: 0; }
        }

        .envelope-shake-open {
          animation: shakeOpen 2.4s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
        }

        @keyframes shakeOpen {
          0% { transform: scale(1); }
          15% { transform: rotate(8deg) scale(1.05); }
          30% { transform: rotate(-8deg) scale(1.05); }
          75% { transform: scale(1.2); opacity: 1; filter: blur(0px); }
          100% { transform: scale(4); opacity: 0; filter: blur(20px); }
        }

        .subtle-pulse { animation: subtlePulse 3s infinite ease-in-out; }
        @keyframes subtlePulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }

        .invitation-entrance { 
          animation: fadeInInvitation 1.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        @keyframes fadeInInvitation { from { opacity: 0; transform: translateY(50px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }

        .modal-enter {
          animation: modalFloatUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes modalFloatUp {
          from { opacity: 0; transform: translateY(40px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .overlay-fade {
          animation: fadeInOverlay 0.4s ease-out forwards;
        }
        @keyframes fadeInOverlay {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(12px); }
        }
      `}} />

      <div className="fixed inset-0 pointer-events-none z-0">
          {mounted && [...Array(120)].map((_, i) => (
            <div key={i} className="gold-dust" style={{
              left: `${Math.random() * 100}%`,
              top: `-5vh`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }} />
          ))}
      </div>

      {!isOpen ? (
        <div 
          onClick={handleOpen} 
          className={`relative cursor-pointer z-20 flex items-center justify-center transition-all duration-500 group ${isOpening ? 'envelope-shake-open' : 'subtle-pulse hover:brightness-110'}`}
        >
          <div className="relative w-[300px] md:w-[450px] flex items-center justify-center">
            <svg className={`absolute w-[130%] h-[130%] rotating-text transition-opacity duration-1000 ${isOpening ? 'opacity-0' : 'opacity-100'}`} viewBox="0 0 200 200">
              <defs>
                <linearGradient id="goldRefinement" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a67c00" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#a67c00" />
                  <animate attributeName="x1" values="-100%; 200%" dur="5s" repeatCount="indefinite" />
                </linearGradient>
                <path id="refinedCirclePath" d="M 100, 100 m -89, 0 a 89,89 0 1,1 178,0 a 89,89 0 1,1 -178,0" />
              </defs>
              <text className="font-sans text-[7px] uppercase tracking-[7.5px] font-[200]" style={{ opacity: 0.85 }}>
                <textPath href="#refinedCirclePath" fill="url(#goldRefinement)">
                  Unlock our story • Unlock our story •
                </textPath>
              </text>
            </svg>

            <img 
              src="/envelope.jpg" 
              alt="Wedding Monogram" 
              className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-full relative z-10 border-[3px] border-white/10 transition-transform group-hover:scale-[1.03] duration-700" 
            />
          </div>
        </div>
      ) : (
        <div className="invitation-entrance w-full max-w-[550px] relative shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-[#d4af37]/20 rounded-[2.5rem] bg-[#fdf8f2]/40 backdrop-blur-sm overflow-hidden z-10 mx-4 px-2 py-2">
          
          <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none">
              <div className="w-full h-full bg-cover bg-center scale-110" style={{ backgroundImage: "url('/bg.jpg')" }} />
          </div>

          <div className="relative z-10 p-8 md:p-14 flex flex-col items-center text-center border-[1px] border-[#d4af37]/15 rounded-[2.3rem]">
            <header className="mb-10">
              <p className="font-arabic text-[#b8860b] text-xl mb-4 font-bold tracking-widest">بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ</p>
              <h2 className="font-arabic italic text-[#5d4037] text-lg md:text-xl leading-relaxed px-4 opacity-90">
                "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّن أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"
              </h2>
            </header>

            <NamesHeader />
            <TimerSection timeLeft={timeLeft} />
            <InfoSection />

            <div className="flex flex-col md:flex-row gap-5 w-full justify-center px-4 mt-10">
              <button 
                onClick={() => setShowConfirm(true)} 
                className="min-w-[220px] py-4 bg-[#b8860b] text-white font-sans text-[11px] font-bold tracking-[3px] uppercase hover:bg-[#8c6609] active:scale-95 transition-all duration-300 shadow-xl rounded-full"
              >
                Confirm Attendance
              </button>
              <button 
                onClick={() => window.open("https://maps.app.goo.gl/LqBXAGUkNu5yeXb86")} 
                className="flex items-center justify-center gap-3 text-[#8c7355] font-sans text-[11px] tracking-[3px] uppercase hover:text-[#b8860b] transition-all font-bold"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {/* التعديل: اسم الزرار الجديد */}
                View Location
              </button>
            </div>
          </div>

          {showConfirm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 overlay-fade">
              <div className="bg-[#fdf8f2]/95 border-t-4 border-[#b8860b] p-8 md:p-12 max-w-[450px] w-full text-center shadow-[0_30px_70px_rgba(0,0,0,0.3)] relative rounded-3xl modal-enter backdrop-blur-md">
                <div className="mb-8 flex justify-center items-center">
                  <div className="w-16 h-[1px] bg-[#d4af37]"></div>
                  <span className="mx-4 text-[#b8860b] text-2xl">♥</span>
                  <div className="w-16 h-[1px] bg-[#d4af37]"></div>
                </div>
                <h3 className="font-arabic text-3xl text-[#3d2b1f] mb-6">ننتظركم بكل مودة</h3>
                <p className="font-arabic text-[#555] text-lg md:text-xl leading-relaxed mb-6 px-2 font-medium">
                  وجودكم بجانبنا في هذه الليلة هو فرحتنا الحقيقية، ومشاركتكم لنا هذه اللحظات الغالية هي أجمل ما ننتظره.. ننتظركم بقلوبٍ محبة، لتكتمل سعادتنا.
                </p>
                <div className="mb-10 opacity-90">
                  <p className="font-arabic italic text-2xl text-[#b8860b] transform -rotate-2 select-none">
                    عمر و زينب
                  </p>
                </div>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="font-sans text-[12px] uppercase tracking-[4px] text-[#b8860b] font-bold border-b-2 border-[#b8860b] pb-1 hover:text-[#8c6609] hover:border-[#8c6609] transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center w-20 md:w-28">
    <span className="text-4xl md:text-5xl font-sans font-light text-[#3d2b1f] mb-2 tabular-nums">{String(value).padStart(2, '0')}</span>
    <span className="text-[10px] uppercase tracking-[3px] text-[#b8860b] font-bold">{label}</span>
  </div>
);

export default WeddingInvitation;
