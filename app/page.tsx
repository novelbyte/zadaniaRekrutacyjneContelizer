'use client';
import WordShuffle from './wordShuffle/page';
import PeselValidation from './peselValidation/page';
import Gorest from './gorest/page';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white/5 rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Zadania Rekrutacyjne - Contelizer</h1>
          <WordShuffle />
          <PeselValidation />
          <Gorest />
      </div>
    </main>
  );
}

