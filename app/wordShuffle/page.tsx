'use client';

import { useState } from 'react';

export default function WordShuffle() {
  const [originalText, setOriginalText] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalText(event.target?.result as string);
    };
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
      .map((line) =>
        line.replace(/(\p{L}+)/gu, (match) => shuffleWord(match))
      )
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
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-3xl text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">1.</h1>
        <p className="text-center mb-6 opacity-90">
          PLIK .TXT, MIESZANIE LITER W ŚRODKU
        </p>

        {/* Input pliku */}
        <div className="flex flex-col items-center gap-4 w-full">
          <label className=" bg-linear-to-r from-blue-400 to-purple-500 flex flex-col items-center rounded-full px-5 py-1 cursor-pointer hover:">
            <span className="mb-1 text-white  font-extrabold">Wybierz plik</span>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="text-sm text-white/90">
              {fileName || 'Nie wybrano pliku'}
            </span>
          </label>

          <div className="flex flex-wrap justify-center gap-4 w-full">
            <button
              onClick={processText}
              disabled={!originalText}
              className={`px-6 py-2 rounded-full font-semibold text-white transition-transform duration-200
                ${
                  originalText
                    ? 'bg-linear-to-r from-orange-400 to-pink-500 hover:scale-105'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
              Przetwórz tekst
            </button>

            <button
              onClick={downloadProcessedFile}
              disabled={!processedText}
              className={`px-6 py-2 rounded-full font-semibold text-white transition-transform duration-200
                ${
                  processedText
                    ? 'bg-linear-to-r from-pink-500 to-orange-400 hover:scale-105'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
              Pobierz wynik
            </button>
          </div>
        </div>

        {/* Teksty */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Oryginał:</h3>
            <textarea
              rows={8}
              value={originalText}
              readOnly
              className="w-full rounded-lg p-3 bg-white/20 text-white border border-white/30 resize-none font-mono"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Wynik:</h3>
            <textarea
              rows={8}
              value={processedText}
              readOnly
              className="w-full rounded-lg p-3 bg-white/20 text-white border border-white/30 resize-none font-mono"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
