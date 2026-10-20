export type TeamMember = {
  slug: string;
  nama: string;
  peran: string;
  ringkas: string;
  deskripsi: string;
  tugas: string[];
  foto: string;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "lightning-mcqueen",
    nama: "Lightning McQueen",
    peran: "Founder & CEO",
    ringkas: "Pendiri yang percaya sate harus sampai ke meja secepat kilat.",
    deskripsi:
      "Lightning mendirikan Taichanese pada 2025 dengan satu prinsip: sate yang enak tidak boleh menunggu lama. Ia memimpin arah usaha, menentukan menu baru, dan memastikan setiap pelanggan pulang dengan senyum selebar grill depannya.",
    tugas: [
      "Menentukan visi dan arah Taichanese",
      "Mengambil keputusan besar soal menu dan cabang",
      "Menjadi wajah Taichanese di setiap acara",
    ],
    foto: "/images/team/lightning-mcqueen.jpg",
  },
  {
    slug: "doc-hudson",
    nama: "Doc Hudson",
    peran: "Head Pitmaster",
    ringkas: "Juru bakar senior dengan rahasia api arang yang tidak pernah bocor.",
    deskripsi:
      "Doc adalah veteran dapur yang sudah puluhan tahun bermain dengan api. Ia mengatur suhu bara, urutan bakar, dan memastikan setiap tusuk matang sempurna tanpa kecap manis. Resep sambalnya konon hanya ia yang tahu.",
    tugas: [
      "Mengawasi proses pembakaran sate",
      "Melatih juru bakar baru",
      "Menjaga rasa dan resep tetap konsisten",
    ],
    foto: "/images/team/doc-hudson.jpg",
  },
  {
    slug: "cruz-ramirez",
    nama: "Cruz Ramirez",
    peran: "Operations Manager",
    ringkas: "Mengatur ritme dapur, stok bahan, dan jadwal tim setiap hari.",
    deskripsi:
      "Cruz dulunya melatih orang lain untuk ngebut, sekarang ia melatih dapur supaya berjalan mulus. Dari stok ayam sampai jadwal shift, semuanya lewat meja Cruz sebelum Taichanese buka.",
    tugas: [
      "Mengatur stok bahan dan pembelian",
      "Menyusun jadwal kerja tim",
      "Memastikan operasional harian lancar",
    ],
    foto: "/images/team/cruz-ramirez.jpg",
  },
  {
    slug: "jackson-storm",
    nama: "Jackson Storm",
    peran: "Marketing & Brand Manager",
    ringkas: "Percaya diri tinggi, tugasnya bikin Taichanese dikenal banyak orang.",
    deskripsi:
      "Jackson memegang media sosial, promosi, dan identitas merek Taichanese. Gayanya percaya diri, tapi hasil kampanyenya memang bikin antrean makin panjang.",
    tugas: [
      "Mengelola media sosial dan konten",
      "Merancang promo dan kampanye",
      "Menjaga identitas visual Taichanese",
    ],
    foto: "/images/team/jackson-storm.jpg",
  },
  {
    slug: "shu-todoroki",
    nama: "Shu Todoroki",
    peran: "Quality Control Manager",
    ringkas: "Teliti memeriksa setiap tusuk sebelum keluar dari dapur.",
    deskripsi:
      "Shu terkenal sabar dan sangat teliti. Ia memeriksa tingkat kematangan, kebersihan, dan kesegaran sambal sebelum pesanan diantar, karena baginya satu tusuk yang kurang pas sudah terlalu banyak.",
    tugas: [
      "Memeriksa kualitas setiap pesanan",
      "Menjaga standar kebersihan dapur",
      "Menguji rasa sambal dan menu baru",
    ],
    foto: "/images/team/shu-todoroki.jpg",
  },
  {
    slug: "miss-fritter",
    nama: "Miss Fritter",
    peran: "Customer Service Lead",
    ringkas: "Mengatur antrean dan memastikan pelanggan selalu terlayani.",
    deskripsi:
      "Miss Fritter menyambut pelanggan, mencatat pesanan, dan menjaga antrean tetap tertib. Penampilannya memang mengintimidasi, tapi pelayanannya paling hangat di seluruh Taichanese.",
    tugas: [
      "Melayani pelanggan dan menangani keluhan",
      "Mengatur antrean saat ramai",
      "Mencatat pesanan dan masukan pelanggan",
    ],
    foto: "/images/team/miss-fritter.jpg",
  },
];

export function getMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug);
}
