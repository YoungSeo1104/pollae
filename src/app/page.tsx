import { GRAD_HERO } from "@/lib/theme";

// 임시 랜딩 — Phase 4에서 실제 랜딩(cute-create.jsx 기반)으로 교체 예정.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <span
        className="rounded-full px-4 py-1.5 text-sm font-bold text-white"
        style={{ background: GRAD_HERO }}
      >
        폴래 · Pollae
      </span>
      <h1 className="text-2xl font-black tracking-tight">
        우리, 언제 만날까요?
      </h1>
      <p className="text-sm opacity-60">
        회원가입 없이 링크 하나로 날짜를 정해요. (준비 중)
      </p>
    </main>
  );
}
