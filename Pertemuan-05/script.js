const API_KEY = '7ab92b63b627f25d4863f853b604d887'; // <-- MANDATORY

var genres = {};

// Saat dokumen selesai dimuat (Vanilla JS)
document.addEventListener('DOMContentLoaded', () => {
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(r => {
      r.genres.forEach((genre) => {
        genres[genre.id] = genre.name;
      });
    })
    .catch(e => {
      alert("Gagal mengambil data genre");
    });
});

// Event handler saat tombol search di-klik (Vanilla JS)
document.getElementById('searchButton').addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah form submit bawaan browser

    // Clear error message
    document.getElementById('error').textContent = ""; 

    // Disabled search button & ubah text jadi loading
    const searchBtn = document.getElementById('searchButton');
    searchBtn.disabled = true;
    searchBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';

    // Clear previous results
    document.getElementById('result').innerHTML = "";

    // Ambil nilai input title
    const movieTitle = document.getElementById('title').value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieTitle)}&include_adult=false`;

    // Fetch data API
    fetch(url)
      .then(response => response.json())
      .then(r => {
        if (r.results.length === 0) {
          document.getElementById('error').textContent = '!!! No movie with this title.';
        } else {
          const tableResult = document.getElementById('result');
          r.results.forEach((movie) => {
            const tableCell = createCell(movie);
            tableResult.appendChild(tableCell);
          });
        }
      })
      .catch(e => {
        document.getElementById('error').textContent = '!!! Terjadi kesalahan pada server.';
      })
      .finally(() => {
        // Re-enable search button
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search';
      });
});

// Fungsi membuat baris tabel menggunakan DOM murni
function createCell(movie) {
  var row = document.createElement('tr');

  // Row number
  const resultTable = document.getElementById('result');
  const movieNo = resultTable.getElementsByTagName('tr').length + 1;
  
  var colNo = document.createElement('td');
  colNo.setAttribute('width', '10');
  
  var h2No = document.createElement('h2');
  h2No.className = "display-5";
  h2No.textContent = `#${movieNo}`;
  
  colNo.appendChild(h2No);
  row.appendChild(colNo);

  // Poster
  const posterUrl = (movie.poster_path !== null)
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '';
  
  var colPoster = document.createElement('td');
  colPoster.setAttribute('width', '100');
  
  var img = document.createElement('img');
  img.src = posterUrl;
  img.height = 200;
  
  colPoster.appendChild(img);
  row.appendChild(colPoster);

  // Movie information container
  const td = document.createElement('td');
  row.appendChild(td);

  // Title
  const title = document.createElement('h2');
  title.className = "display-5";
  title.textContent = movie.title;
  td.appendChild(title);

  // Overview
  const overview = document.createElement('p');
  overview.textContent = movie.overview;
  td.appendChild(overview);

  // Rating
  const rating = document.createElement('span');
  rating.className = "badge badge-success p-2";
  rating.textContent = `Rating: ${movie.vote_average}`;
  td.appendChild(rating);

  // Genres
  movie.genre_ids.forEach((id) => {
    const genre = document.createElement('span');
    genre.className = "badge badge-warning ml-2 p-2";
    genre.textContent = genres[id];
    td.appendChild(genre);
  });

  return row;
}