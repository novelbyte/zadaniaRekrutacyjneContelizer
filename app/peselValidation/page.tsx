'use client';
import { useState } from 'react';
import { isValidPesel } from '../utils/peselValidator';

export default function PeselValidation() {
  const [pesel, setPesel] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleValidate = () => {
    if (!pesel) return setResult('Podaj numer PESEL');
    setResult(isValidPesel(pesel) ? '✅ PESEL prawidłowy' : '❌ PESEL nieprawidłowy');
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/5 rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Zadanie 2 — Walidator PESEL</h1>

        <input type="text" maxLength={11} value={pesel} onChange={(e) => setPesel(e.target.value)}
          placeholder="Wpisz PESEL" className="w-full p-3 rounded mb-4 text-black" />

        <div className="flex justify-center gap-3">
          <button onClick={handleValidate} className="px-5 py-2 rounded-full bg-linear-to-r from-slate-700 to-slate-900 text-white font-semibold">Sprawdź</button>
        </div>

        {result && <p className="mt-4 text-center">{result}</p>}
      </div>
    </main>
  );
}
