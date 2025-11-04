'use client';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

const API_URL = 'https://gorest.co.in/public/v2/users';
const TOKEN = process.env.NEXT_PUBLIC_GOREST_TOKEN || '';

export default function Gorest() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<User | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const headers: Record<string, string> = {};
      // jeśli chcesz widzieć swoje edytowane użytkowniki, odkomentuj poniższą linię i ustaw token w .env.local
      // if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

      const res = await fetch(`${API_URL}?page=1&per_page=20`, { headers });
      const data = await res.json();
      setUsers(data);
      setFiltered(data);
    } catch {
      setMessage('Błąd przy pobieraniu użytkowników');
    }
  }

  useEffect(() => {
    if (!search.trim()) setFiltered(users);
    else {
      const q = search.toLowerCase();
      setFiltered(users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)));
    }
  }, [search, users]);

  async function handleSave() {
    if (!editing) return;
    try {
      const res = await fetch(`${API_URL}/${editing.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
          name: editing.name,
          email: editing.email,
          status: editing.status
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'unknown' }));
        throw new Error(JSON.stringify(err));
      }

      setMessage('Zaktualizowano użytkownika');
      await fetchUsers();
      setEditing(null);
    } catch {
      setMessage('Błąd zapisu — sprawdź token/uprawnienia');
    }
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Zadanie 3 — GoREST Users</h1>

        <input type="text" placeholder="Szukaj po imieniu lub e-mailu..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded mb-4 text-black" />

        {message && <div className="mb-4 text-red-500">{message}</div>}

        <div className="space-y-3">
          {filtered.map(u => (
            <div key={u.id} className="p-4 bg-white/5 rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{u.name}</div>
                <div className="text-sm opacity-80">{u.email}</div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setEditing(u)} className="px-3 py-1 rounded bg-linear-to-r from-slate-700 to-slate-900 text-white">Edytuj</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-xl font-bold mb-3">Edytuj użytkownika</h2>
            <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              className="w-full p-2 mb-2 border rounded" />
            <input type="email" value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })}
              className="w-full p-2 mb-2 border rounded" />
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-200 rounded">Anuluj</button>
              <button onClick={handleSave} className="px-4 py-2 bg-linear-to-r from-green-600 to-emerald-500 text-white rounded">Zapisz</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

