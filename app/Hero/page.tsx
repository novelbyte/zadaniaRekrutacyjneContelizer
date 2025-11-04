'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="w-full text-white py-12 flex flex-col items-center justify-center bg-white/5 backdrop-blur-md rounded-xl shadow-lg mb-10 p-6 sm:p-10">
      <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent text-center">
        Zadania Rekrutacyjne — Contelizer
      </h1>
      <p className="text-3xl font-extrabold mb-4 bg-gray-400 bg-clip-text text-transparent text-center">
        KACPER PIERON
      </p>
      <p className="text-center text-lg text-white/70 max-w-2xl mb-6">
        Cześć, przesyłam zadania rekrutacyjne.
        Poniżej zamieszczam linki do linkedina i githuba z kodem zadań :D
      </p>
      PS. Oczywiscie .env.local bym nie commitowal w prawdziwym projekcie :P
      <div className="flex gap-2 pt-4">
        <Link
          href="https://github.com/novelbyte/zadaniaRekrutacyjneContelizer"
          target='blank'
          className='flex items-center px-5 py-2 rounded-full bg-linear-to-r from-gray-700 to-gray-900 hover:scale-105 transition-transform'
        >
          GITHUB
        </Link>

        <Link
          href="https://www.linkedin.com/in/kacperpieron/"
          target='blank'
          className='flex items-center px-5 py-2 rounded-full bg-linear-to-r from-gray-700 to-gray-900 hover:scale-105 transition-transform'
        >
          LINKEDIN
        </Link>
      </div>
    </section>
  );
}
