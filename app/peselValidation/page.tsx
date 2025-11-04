'use client';
import { useState } from 'react';
import { isValidPesel } from '../utils/peselValidator';

export default function PeselValidation() {
  const [pesel, setPesel] = useState('');
  const [result, setResult] = useState<null | boolean>(null);

  const handleValidate = () => setResult(isValidPesel(pesel));

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6">2.</h1>
         <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Wpisz numer PESEL"
            maxLength={11}
            value={pesel}
            onChange={(e) => setPesel(e.target.value)}
            className="w-full rounded-lg p-3 bg-white/20 text-white border border-white/30 placeholder-white/70 text-center text-lg tracking-widest"
          />

          <button
            onClick={handleValidate}
           className=" py-2 bg-linear-to-r from-orange-400 to-pink-500 rounded-full hover:scale-105 transition-transform"
          >
            Sprawdź PESEL
          </button>

          {result !== null && (
            <div
              className={`text-center text-xl font-bold mt-3 ${
                result ? 'text-green-300' : 'text-red-300'
              }`}
            >
              {result ? '✅ Numer PESEL jest poprawny' : '❌ Niepoprawny numer PESEL'}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
