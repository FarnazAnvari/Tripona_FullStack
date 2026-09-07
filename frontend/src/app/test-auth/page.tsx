'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function TestAuthPage() {
  const { user, token, loading, login, register, logout } = useAuth();

  // استیت‌های فرم
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await register(name, email, password);
      setMessage('ثبت‌نام با موفقیت انجام شد!');
    } catch (err: any) {
      setError(err.message || 'خطا در ثبت‌نام');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await login(email, password);
      setMessage('ورود با موفقیت انجام شد!');
    } catch (err: any) {
      setError(err.message || 'خطا در ورود');
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-lg font-medium">
        در حال بررسی وضعیت کاربر...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white border rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        تست سیستم احراز هویت (Auth)
      </h1>

      {/* نمایش پیام‌ها */}
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      {message && (
        <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm">
          {message}
        </div>
      )}

      {/* وضعیت لاگین */}
      {user ? (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          <div className="text-green-600 font-semibold">
            ✅ شما وارد حساب شده‌اید:
          </div>
          <p><strong>نام:</strong> {user.name}</p>
          <p><strong>ایمیل:</strong> {user.email}</p>
          <p className="text-xs text-gray-500 break-all">
            <strong>توکن:</strong> {token?.slice(0, 25)}...
          </p>
          <button
            onClick={logout}
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            خروج از حساب (Logout)
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* فرم لاگین */}
          <form onSubmit={handleLogin} className="space-y-3">
            <h2 className="font-semibold text-gray-700">فرم ورود</h2>
            <input
              type="email"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg outline-none focus:border-blue-500"
              required
            />
            <input
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg outline-none focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              ورود (Login)
            </button>
          </form>

          <hr />

          {/* فرم ثبت‌نام */}
          <form onSubmit={handleRegister} className="space-y-3">
            <h2 className="font-semibold text-gray-700">فرم ثبت‌نام سریع</h2>
            <input
              type="text"
              placeholder="نام و نام خانوادگی"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg outline-none focus:border-green-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
            >
              ثبت‌نام (Register)
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
