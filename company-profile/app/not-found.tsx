import ButtonLink from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container center">
        <h1>Halaman tidak ditemukan</h1>
        <p className="not-found-text">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>
        <ButtonLink href="/">Kembali ke Home</ButtonLink>
      </div>
    </section>
  );
}
