"use client";

import { useState } from "react";

export default function ContactForm() {
  const [terkirim, setTerkirim] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTerkirim(true);
    e.currentTarget.reset();
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="input-box">
        <label htmlFor="nama">Nama</label>
        <input id="nama" name="nama" type="text" placeholder="Nama lengkap Anda" required />
      </div>

      <div className="input-box">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="nama@email.com" required />
      </div>

      <div className="input-box">
        <label htmlFor="pesan">Pesan</label>
        <textarea id="pesan" name="pesan" rows={5} placeholder="Tulis pesanan atau pertanyaan Anda" required />
      </div>

      <button type="submit" className="btn btn-solid">
        Kirim Pesan
      </button>

      {terkirim && (
        <p className="form-status">Terima kasih! Pesan Anda sudah kami terima.</p>
      )}
    </form>
  );
}
