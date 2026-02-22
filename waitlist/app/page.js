'use client';

import { useState, useCallback } from 'react';

/* ────────────────────────────
   WAITLIST FORM
   ──────────────────────────── */
function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (state === 'loading' || state === 'success') return;
    setState('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setState('error'); setMsg(data.error || 'Something went wrong.'); return; }
      setState('success');
      setMsg("You're on the list! We'll notify you when beta launches.");
      setEmail('');
    } catch {
      setState('error');
      setMsg('Network error. Please try again.');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-0">
        <div className="input-wrap flex items-center p-1.5 rounded-2xl">
          <div className="pl-3 pr-1.5 text-gray-500 shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
            placeholder={state === 'success' ? "You're on the list!" : 'your@email.com'}
            disabled={state === 'success'}
            className="flex-1 bg-transparent text-white placeholder-gray-600 focus:outline-none py-3 text-[15px] font-medium min-w-0"
          />
          <button
            type="submit"
            disabled={state === 'loading' || state === 'success'}
            className={`hidden sm:flex px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap items-center gap-2 shrink-0 transition-all ${
              state === 'success' ? 'bg-mint/20 text-mint' : 'cta-btn text-white'
            }`}
          >
            <BtnContent state={state} />
          </button>
        </div>
        <button
          type="submit"
          disabled={state === 'loading' || state === 'success'}
          className={`sm:hidden w-full py-3.5 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${
            state === 'success' ? 'bg-mint/20 text-mint' : 'cta-btn text-white'
          }`}
        >
          <BtnContent state={state} />
        </button>
      </form>
      {msg && (
        <p className={`mt-2 text-xs font-medium ${state === 'error' ? 'text-coral' : 'text-mint'}`}>{msg}</p>
      )}
    </div>
  );
}

function BtnContent({ state }) {
  if (state === 'loading') return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
  if (state === 'success') return (
    <>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
      On the waitlist!
    </>
  );
  return (
    <>
      Join Waitlist
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </>
  );
}

/* ────────────────────────────
   PHONE MOCKUP
   ──────────────────────────── */
function PhoneMockup() {
  const calDays = [
    { day: 'S', date: 15 },
    { day: 'M', date: 16 },
    { day: 'T', date: 17 },
    { day: 'W', date: 18, active: true, today: true },
    { day: 'T', date: 19 },
    { day: 'F', date: 20, active: true },
    { day: 'S', date: 21, active: true },
  ];

  return (
    <div className="relative mx-auto w-[220px] float-anim">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-electric/[0.06] blur-[80px] rounded-full pointer-events-none" />

      <div className="relative rounded-[2rem] p-2.5 bg-gradient-to-b from-[#1a1a24] to-[#111118] border-2 border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-surface-0 rounded-b-xl z-20" />

        <div className="bg-surface-0 rounded-[1.5rem] overflow-hidden">
          <div className="px-4 pt-7 pb-1.5 flex items-center justify-between">
            <span className="text-[8px] font-mono text-gray-500">10:58</span>
            <div className="w-4 h-2 rounded-sm border border-gray-500 flex items-center p-[1px]">
              <div className="w-1/2 h-full bg-mint rounded-sm" />
            </div>
          </div>

          <div className="px-2.5 pb-3 space-y-1.5">
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-md bg-electric flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold">Momentum</span>
                <span className="text-[6px] font-mono text-gray-500 bg-surface-2 px-1 py-0.5 rounded">v1.0.24</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-0.5 bg-surface-2 px-1 py-0.5 rounded-full">
                  <span className="text-[7px]">🔥</span>
                  <span className="text-[7px] font-bold">5</span>
                </div>
                <div className="w-4 h-4 rounded-full bg-electric flex items-center justify-center">
                  <span className="text-[6px] font-bold">B</span>
                </div>
              </div>
            </div>

            <div className="flex gap-1">
              <div className="flex-[1.2] bg-surface-2 rounded-lg p-2">
                <span className="text-[6px] font-semibold uppercase tracking-wider text-gray-400">Nutrition</span>
                <div className="flex justify-center my-1.5">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 progress-ring" viewBox="0 0 50 50">
                      <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                      <circle cx="25" cy="25" r="20" fill="none" stroke="#4F6EF7" strokeWidth="4"
                        strokeDasharray="125.6" strokeDashoffset="30" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[10px] font-bold">1,847</span>
                      <span className="text-[5px] text-gray-500">/ 3000</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-0.5">
                  {[
                    { label: 'Protein', val: '98', max: '130', color: 'bg-electric' },
                    { label: 'Carbs', val: '215', max: '450', color: 'bg-amber' },
                    { label: 'Fat', val: '52', max: '100', color: 'bg-pink-400' },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        <div className={`w-1 h-1 rounded-full ${m.color}`} />
                        <span className="text-[6px] text-gray-400">{m.label}</span>
                      </div>
                      <span className="text-[6px] font-semibold">{m.val}<span className="text-gray-500">/{m.max}g</span></span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex-1 bg-surface-2 rounded-lg p-2">
                  <div className="flex items-center gap-0.5 mb-0.5">
                    <span className="text-[6px]">💧</span>
                    <span className="text-[6px] font-semibold uppercase text-gray-400">Water</span>
                  </div>
                  <p className="text-[9px] font-bold">2,100<span className="text-[6px] text-gray-500"> /3000ml</span></p>
                  <div className="w-full h-0.5 rounded-full bg-white/5 mt-1 overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: '70%' }} />
                  </div>
                  <div className="flex gap-0.5 mt-1">
                    <div className="flex-1 bg-surface-0/60 rounded py-0.5 text-center text-[5px] text-gray-400">+250</div>
                    <div className="flex-1 bg-surface-0/60 rounded py-0.5 text-center text-[5px] text-gray-400">+500</div>
                  </div>
                </div>
                <div className="flex-1 bg-surface-2 rounded-lg p-2">
                  <div className="flex items-center gap-0.5 mb-0.5">
                    <span className="text-[6px]">⚡</span>
                    <span className="text-[6px] font-semibold uppercase text-gray-400">Creatine</span>
                  </div>
                  <p className="text-[9px] font-bold">3<span className="text-[6px] text-gray-500"> /5g</span></p>
                  <div className="flex gap-0.5 mt-1">
                    <div className="flex-1 bg-surface-0/60 rounded py-0.5 text-center text-[5px] text-gray-400">+5g</div>
                    <div className="flex-1 bg-surface-0/60 rounded py-0.5 text-center text-[5px] text-gray-400">+1g</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-1">
              <div className="flex-1 bg-surface-2 rounded-lg py-2 flex items-center justify-center gap-1">
                <div className="w-4 h-4 rounded bg-teal-800/60 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <span className="text-[7px] font-semibold">Log Workout</span>
              </div>
              <div className="flex-1 bg-surface-2 rounded-lg py-2 flex items-center justify-center gap-1">
                <div className="w-4 h-4 rounded bg-amber/20 flex items-center justify-center">
                  <span className="text-[7px]">🍽</span>
                </div>
                <span className="text-[7px] font-semibold">Log Food</span>
              </div>
            </div>

            <div className="bg-surface-2 rounded-lg p-2">
              <div className="flex mb-1.5 bg-surface-0/40 rounded p-0.5">
                <div className="flex-1 text-center py-0.5 rounded bg-surface-3 text-[6px] font-semibold">Activity</div>
                <div className="flex-1 text-center py-0.5 text-[6px] text-gray-500">Weight</div>
              </div>
              <p className="text-[7px] font-bold text-center mb-0.5">Last 2 weeks</p>
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span className="text-[6px]">🔥 <b>5</b> <span className="text-gray-500">day streak</span></span>
                <span className="text-gray-600 text-[6px]">|</span>
                <span className="text-[6px]">🏆 <b>99</b> <span className="text-gray-500">best</span></span>
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {calDays.map((d, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-[5px] text-gray-500 mb-0.5">{d.day}</span>
                    <div className={`w-5 h-5 rounded flex flex-col items-center justify-center ${
                      d.today ? 'bg-electric text-white' : d.active ? 'bg-electric/20 border border-electric/40 text-white' : 'bg-surface-0/60 text-gray-500'
                    }`}>
                      <span className="text-[6px] font-bold leading-none">{d.date}</span>
                      {d.active && <div className="w-0.5 h-0.5 rounded-full bg-electric mt-px" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.04] px-3 py-1.5 flex items-center justify-between">
            <span className="text-[9px] opacity-30">🔔</span>
            <span className="text-[9px] opacity-30">🏋️</span>
            <div className="w-6 h-6 rounded-full bg-electric flex items-center justify-center shadow-[0_0_10px_rgba(79,110,247,0.4)]">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="text-[9px] opacity-30">🍎</span>
            <span className="text-[9px] opacity-30">👥</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────
   PAGE
   ──────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* NAV */}
      <nav className="fixed w-full z-50 top-0 bg-surface-0/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4 h-12 sm:h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-electric flex items-center justify-center shadow-[0_0_20px_rgba(79,110,247,0.35)]">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight">Momentum</span>
          </div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-2 border border-white/[0.06]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-coral" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono font-medium text-gray-300">
              <span className="text-white font-semibold">127</span> waitlist spots left
            </span>
          </div>
        </div>
      </nav>

      {/* HERO — single full-height section */}
      <main className="flex-1 relative flex items-center pt-12 sm:pt-14">
        {/* Background glows */}
        <div className="absolute w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(79,110,247,0.1)_0%,transparent_70%)] -top-20 -right-20 pointer-events-none" />
        <div className="absolute w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(52,211,153,0.05)_0%,transparent_70%)] bottom-0 -left-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 w-full py-6 sm:py-10 lg:py-0 lg:flex lg:items-center lg:gap-16">

          {/* Left: copy + form */}
          <div className="flex-1 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">

            <h1 className="fade-up text-[1.75rem] sm:text-[2.5rem] lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-[-0.03em] mb-3">
              Stop switching<br />between{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-blue-400 to-electric">
                5 fitness apps.
              </span>
            </h1>

            <p className="fade-up-d1 text-[13px] sm:text-base lg:text-lg text-gray-400 leading-relaxed mb-3 max-w-md mx-auto lg:mx-0">
              Workouts, nutrition, recovery, supplements, strength ranking, and social — all in one premium platform.{' '}
              <span className="text-gray-300 font-medium">Replace your entire fitness stack.</span>
            </p>

            {/* App pills */}
            <div className="fade-up-d2 flex flex-wrap gap-1.5 justify-center lg:justify-start mb-5">
              {['MyFitnessPal', 'Strong', 'MacroFactor', 'JEFIT', 'Strava'].map((app) => (
                <span key={app} className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-surface-2 border border-white/[0.06] text-gray-400 line-through decoration-coral/60">
                  {app}
                </span>
              ))}
            </div>

            {/* Phone mockup — mobile only, between pills and form */}
            <div className="fade-up-d2 flex justify-center mb-6 lg:hidden">
              <PhoneMockup />
            </div>

            {/* Form */}
            <div className="fade-up-d3 max-w-md mx-auto lg:mx-0">
              <WaitlistForm />

              {/* Social proof */}
              <div className="mt-3 flex items-center gap-2 justify-center lg:justify-start">
                <div className="flex -space-x-1.5">
                  {[33, 47, 12, 68].map((id) => (
                    <img key={id} src={`https://i.pravatar.cc/80?img=${id}`} alt=""
                      className="w-5 h-5 rounded-full border-[1.5px] border-surface-0 object-cover" loading="lazy" />
                  ))}
                </div>
                <p className="text-[11px] text-gray-400">
                  <span className="text-white font-semibold">2,481</span> signed up
                  <span className="text-gray-600 mx-1">·</span>
                  <span className="text-mint font-medium">Limited spots</span>
                </p>
              </div>

              <p className="mt-2 text-[10px] text-gray-600 text-center lg:text-left">No spam. We&apos;ll only email you when it&apos;s your turn.</p>
            </div>
          </div>

          {/* Right: phone mockup — desktop only */}
          <div className="hidden lg:flex flex-1 justify-center">
            <PhoneMockup />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.04] py-4 bg-surface-0">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-1.5 opacity-60">
            <div className="w-3.5 h-3.5 rounded bg-electric flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xs tracking-tight">Momentum</span>
          </div>
          <p className="text-[9px] text-gray-600 font-mono">&copy; 2026 Momentum. Built by lifters, for lifters.</p>
          <div className="flex gap-4 text-[10px] text-gray-500">
            <a href="#" className="active:text-white">Twitter</a>
            <a href="#" className="active:text-white">Instagram</a>
            <a href="#" className="active:text-white">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
