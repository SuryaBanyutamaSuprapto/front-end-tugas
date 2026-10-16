"use client";

import type { JSX } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

const navLinks = [
  { href: "#beranda", label: "Beranda", id: "beranda" },
  { href: "#menu", label: "Menu", id: "menu" },
  { href: "#tentang", label: "Tentang Kami", id: "tentang" },
  { href: "#kontak", label: "Kontak", id: "kontak" },
];

const menuItems = [
  { nama: "Es Kopi Kelapa", deskripsi: "Espresso segar berpadu dengan air kelapa muda asli dan sedikit gula aren.", harga: "Rp 22.000", gambar: "/images/kopi-kelapa.jpg" },
  { nama: "Kopi Susu Gula Aren", deskripsi: "Perpaduan klasik kopi robusta lokal, susu segar, dan gula aren asli.", harga: "Rp 20.000", gambar: "/images/kopi-guren.jpg" },
  { nama: "Americano", deskripsi: "Espresso murni dengan air panas, cocok untuk penikmat kopi hitam.", harga: "Rp 18.000", gambar: "/images/americano.jpg" },
  { nama: "Cappuccino", deskripsi: "Espresso dengan foam susu lembut dan taburan bubuk cokelat.", harga: "Rp 24.000", gambar: "/images/cappuccino.jpg" },
  { nama: "Kopi Klepon", deskripsi: "Minuman kopi khas Indonesia dengan rasa manis dari klepon.", harga: "Rp 20.000", gambar: "/images/kopi-klepon.jpg" },
  { nama: "Kopi Rarobang", deskripsi: "Kopi khas Maluku berempah cengkeh dan kayu manis, disajikan dengan taburan kenari.", harga: "Rp 22.000", gambar: "/images/kopi-rarobang.jpeg" },
  { nama: "Kopi Joss (Arang)", deskripsi: "Kopi hitam khas yang disajikan unik dengan celupan arang membara pilihan.", harga: "Rp 15.000", gambar: "/images/kopi-arang.jpg" },
  { nama: "Kopi Tubruk", deskripsi: "Seduhan tradisional dengan aroma kuat dan bodi tebal khas warkop Nusantara.", harga: "Rp 12.000", gambar: "/images/kopi-tubruk.jpg" },
  { nama: "Kopi Klotok", deskripsi: "Kopi khas Jogja yang direbus bersama bubuknya, menghasilkan rasa pahit gurih yang unik.", harga: "Rp 14.000", gambar: "/images/kopi-klotok.jpg" },
  { nama: "Kopi Jahe", deskripsi: "Paduan rempah jahe bakar dan kopi hitam yang hangat serta menyegarkan tubuh.", harga: "Rp 17.000", gambar: "/images/kopi-jahe.jpeg" },
];

const poinTentang = [
  "Biji kopi pilihan langsung dari petani lokal",
  "Diseduh segar setiap hari di dapur rumahan kami",
  "Bisa dipesan kapan saja lewat WhatsApp",
];

export default function Home(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("beranda");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [terkirim, setTerkirim] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      setShowScrollTop(top > 400);
      for (const { id } of navLinks) {
        const section = document.getElementById(id);
        if (!section) continue;
        const offset = section.offsetTop - 150;
        if (top >= offset && top < offset + section.offsetHeight) {
          setActiveId(id);
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTerkirim(true);
    e.currentTarget.reset();
  }

  return (
    <>
      <header className="header">
        <a href="#beranda" className="logo">
          <span className="logo-dot" />
          Kopi Nusantara
        </a>

        <button
          id="menu-icon"
          type="button"
          aria-label="Buka menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          &#9776;
        </button>

        <nav className={`navbar ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={activeId === link.id ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="title-banner">
        <h1>Surya Banyutama Suprapto</h1>
        <p>NIM: 535250100</p>
      </div>

      <main>
        <section className="hero" id="beranda">
          <div className="hero-content">
            <p className="hero-label">
              Sejak 2019 - Diracik di Rumah, Disajikan dengan Hati
            </p>
            <h2>Secangkir Kehangatan Khas Nusantara</h2>
            <p>
              Kopi Nusantara menghadirkan biji kopi pilihan dari pelosok
              Indonesia, diseduh langsung setiap hari tanpa bahan pengawet.
              Nikmati dari layar HP, tablet, atau laptop Anda, tampilan kami
              menyesuaikan di mana pun Anda membuka halaman ini.
            </p>
            <div className="hero-btn-group">
              <a href="#menu" className="btn btn-solid">Lihat Menu</a>
              <a href="#kontak" className="btn btn-outline">Pesan Sekarang</a>
            </div>
          </div>

          <div className="hero-img">
            <div className="steam">
              <span />
              <span />
              <span />
            </div>
            <div className="cup">
              <div className="cup-foam" />
              <div className="cup-handle" />
            </div>
          </div>
        </section>

        <section className="menu" id="menu">
          <h2 className="heading">Menu Favorit Kami</h2>
          <p className="subheading">
            Menu andalan yang paling sering dipesan pelanggan.
          </p>

          <div className="menu-container">
            {menuItems.map((item) => (
              <div className="menu-box" key={item.nama}>
                <Image
                  src={item.gambar}
                  alt={item.nama}
                  width={400}
                  height={300}
                  className="menu-img"
                />
                <h3>{item.nama}</h3>
                <p>{item.deskripsi}</p>
                <span className="price">{item.harga}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="about" id="tentang">
          <div className="about-icon">
            <Image src="/images/biji-kopi.png" alt="Biji kopi" width={180} height={180} />
          </div>

          <div className="about-content">
            <h2 className="heading">Tentang Kopi Nusantara</h2>
            <p>
              Berawal dari dapur rumahan di tahun 2019, Kopi Nusantara tumbuh
              dari kecintaan terhadap biji kopi lokal Indonesia dari Gayo,
              Toraja, hingga Kintamani. Kami percaya secangkir kopi terbaik
              lahir dari proses yang jujur dan bahan yang berkualitas.
            </p>

            <ul className="about-list">
              {poinTentang.map((teks) => (
                <li key={teks}>
                  <span className="dot" />
                  {teks}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="contact" id="kontak">
          <div className="contact-info">
            <h2 className="heading">Hubungi &amp; Pesan</h2>
            <p>Isi formulir berikut, tim kami akan segera menghubungi Anda kembali.</p>
            <p><b>Alamat:</b> Jl. Melati No. 12, Bandung</p>
            <p><b>WhatsApp:</b> 0812-3456-7890</p>
            <p><b>Jam Buka:</b> Setiap hari, 08.00 - 21.00</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-box">
              <label htmlFor="nama">Nama</label>
              <input type="text" id="nama" name="nama" placeholder="Nama lengkap Anda" />
            </div>

            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="nama@email.com" />
            </div>

            <div className="input-box">
              <label htmlFor="pesan">Pesan</label>
              <textarea
                id="pesan"
                name="pesan"
                rows={5}
                placeholder="Tuliskan pesanan atau pertanyaan Anda"
              />
            </div>

            <input type="submit" value="Kirim Pesan" className="btn btn-solid" />
            {terkirim && (
              <p className="form-status">Terima kasih! Pesan Anda sudah kami terima.</p>
            )}
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Kopi Nusantara. Seluruh hak cipta dilindungi.</p>
      </footer>

      <a
        href="#beranda"
        className={`scroll-top ${showScrollTop ? "show" : ""}`}
        aria-label="Kembali ke atas"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        &uarr;
      </a>
    </>
  );
}