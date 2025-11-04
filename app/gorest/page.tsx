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

export default function GoRest() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?page=1&per_page=20`);
      const data = await res.json();
      setUsers(data);
      setFiltered(data);
    } catch {
      setMsg('❌ Błąd podczas pobierania użytkowników');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!search.trim()) setFiltered(users);
    else {
      const q = search.toLowerCase();
      setFiltered(
        users.filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)
        )
      );
    }
  }, [search, users]);

  async function handleSave() {
    if (!editing) return;
    try {
      const res = await fetch(`${API_URL}/${editing.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          name: editing.name,
          email: editing.email,
          gender: editing.gender,
          status: editing.status,
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      setMsg('✅ Zaktualizowano użytkownika');
      await fetchUsers();
      setEditing(null);
      
    } catch {
      setMsg('❌ Brak tokena lub błąd zapisu (403/401)');
    }
  }
  useEffect(() => {
  if (!msg) return; 

  const timer = setTimeout(() => {
    setMsg(''); 
  }, 5000);

  return () => clearTimeout(timer);
}, [msg]);

  return (
    <main className="min-h-screen flex items-center justify-center text-white p-4">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center shadow-xl relative">
        {msg && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 px-6 py-3 rounded-lg text-white shadow-md">
            {msg}
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">3.</h1>

        <input
          type="text"
          placeholder="Szukaj po imieniu lub e-mailu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full p-3 rounded-md bg-white/20 placeholder-white/70 border border-white/30 text-center text-lg"
        />

        {loading ? (
          <p>Ładowanie danych...</p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse text-sm text-left">
              <thead>
                <tr className="border-b border-white/30 text-lg">
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">Imię i nazwisko</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Płeć</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3 text-right">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <td className="py-2 px-3">{u.id}</td>
                    <td className="py-2 px-3">{u.name}</td>
                    <td className="py-2 px-3">{u.email}</td>
                    <td className="py-2 px-3">{u.gender}</td>
                    <td className="py-2 px-3">{u.status}</td>
                    <td className="py-2 px-3 text-right">
                      <button
                        onClick={() => setEditing(u)}
                        className="px-3 py-1 bg-linear-to-r from-orange-400 to-pink-500 rounded-full hover:scale-105 transition-transform"
                      >
                        Edytuj
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editing && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl w-full max-w-md text-white">
              <h2 className="text-2xl font-bold mb-4">✏️ Edycja użytkownika</h2>
              <label className="block mb-2 text-sm">Imię i nazwisko</label>
              <input
                type="text"
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
                className="w-full mb-3 p-2 rounded bg-white/20 border border-white/30"
              />

              <label className="block mb-2 text-sm">Email</label>
              <input
                type="email"
                value={editing.email}
                onChange={(e) =>
                  setEditing({ ...editing, email: e.target.value })
                }
                className="w-full mb-3 p-2 rounded bg-white/20 border border-white/30"
              />

              <label className="block mb-2 text-sm">Status</label>
              <select
                value={editing.status}
                onChange={(e) =>
                  setEditing({ ...editing, status: e.target.value })
                }
                className="w-full mb-3 p-2 rounded bg-white/20 border border-white/30"
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 bg-gray-500 rounded-full"
                >
                  Anuluj
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-linear-to-r from-green-400 to-emerald-500 rounded-full hover:scale-105 transition-transform"
                >
                  Zapisz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
