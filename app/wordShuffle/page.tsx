'use client';
import { useState } from 'react';

export default function WordShuffle() {
  const [originalText, setOriginalText] = useState('');
  const [processedText, setProcessedText] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setOriginalText(ev.target?.result as string);
    reader.readAsText(file, 'UTF-8');
  };

  const shuffleWord = (word: string) => {
    if (word.length <= 3) return word;
    const middle = word.slice(1, -1).split('');
    for (let i = middle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [middle[i], middle[j]] = [middle[j], middle[i]];
    }
    return word[0] + middle.join('') + word[word.length - 1];
  };

  const processText = () => {
    const result = originalText
      .split('\n')
      .map((line) => line.replace(/(\p{L}+)/gu, (m) => shuffleWord(m)))
      .join('\n');
    setProcessedText(result);
  };

  const downloadProcessedFile = () => {
    const blob = new Blob([processedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'przetworzony_tekst.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/5 rounded-2xl shadow p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-4">Zadanie 1 — Losowe przestawianie liter</h1>
        <p className="text-center mb-4">Wgraj plik .txt, aplikacja przetasuje litery w środku wyrazów (pierwsza i ostatnia litera zachowana).</p>

        <div className="flex flex-col items-center gap-4 mb-6">
          <input type="file" accept=".txt" onChange={handleFileUpload}
            className="file:bg-white file:text-black file:px-4 file:py-2 file:rounded-full cursor-pointer" />

          <div className="flex gap-3">
            <button onClick={processText} disabled={!originalText}
              className={`px-5 py-2 rounded-full font-semibold ${originalText ? 'bg-linear-to-r from-slate-700 to-slate-900 text-white hover:scale-105' : 'bg-gray-400 text-white cursor-not-allowed'}`}>
              Przetwórz tekst
            </button>

            <button onClick={downloadProcessedFile} disabled={!processedText}
              className={`px-5 py-2 rounded-full font-semibold ${processedText ? 'bg-linear-to-r from-slate-700 to-slate-900 text-white hover:scale-105' : 'bg-gray-400 text-white cursor-not-allowed'}`}>
              Pobierz wynik
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="mb-2 font-semibold">Oryginał</h3>
            <textarea readOnly value={originalText} rows={10} className="w-full p-3 rounded bg-white/5 text-white resize-none font-mono" />
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Wynik</h3>
            <textarea readOnly value={processedText} rows={10} className="w-full p-3 rounded bg-white/5 text-white resize-none font-mono" />
          </div>
        </div>
      </div>
    </main>
  );
}
