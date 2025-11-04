'use client';
import WordShuffle from './wordShuffle/page';
import PeselValidation from './peselValidation/page';
import Gorest from './gorest/page';
import Hero from './Hero/page';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-[1000px] w-screen bg-white/5 rounded-xl p-8">
        <Hero />
        <WordShuffle />
        <PeselValidation />
        <Gorest />
      </div>
    </main>
  );
}

