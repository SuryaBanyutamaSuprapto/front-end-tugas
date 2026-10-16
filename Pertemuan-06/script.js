const API_KEY = '7ab92b63b627f25d4863f853b604d887'; // <-- MANDATORY

var genres = {};

// Saat dokumen selesai dimuat
$(document).ready(function () {
  $.getJSON(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    .done(function (r) {
      $.each(r.genres, function (i, genre) {
        genres[genre.id] = genre.name;
      });
    })
    .fail(function () {
      alert("Gagal mengambil data genre");
    });
});

// Event handler saat tombol search di-klik
$('#searchButton').on('click', function (e) {
  e.preventDefault(); // Mencegah form submit bawaan browser

  const $searchBtn = $(this);

  // Clear error message
  $('#error').text("");

  // Disabled search button & ubah text jadi loading
  $searchBtn
    .prop('disabled', true)
    .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');

  // Clear previous results
  $('#result').empty();

  // Ambil nilai input title
  const movieTitle = $('#title').val();
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieTitle)}&include_adult=false`;

  // Fetch data API
  $.getJSON(url)
    .done(function (r) {
      if (r.results.length === 0) {
        $('#error').text('!!! No movie with this title.');
      } else {
        $.each(r.results, function (i, movie) {
          $('#result').append(createCell(movie));
        });
      }
    })
    .fail(function () {
      $('#error').text('!!! Terjadi kesalahan pada server.');
    })
    .always(function () {
      // Re-enable search button
      $searchBtn.prop('disabled', false).text('Search');
    });
});

// Fungsi membuat baris tabel menggunakan jQuery
function createCell(movie) {
  // Row number
  const movieNo = $('#result tr').length + 1;

  // Poster
  const posterUrl = (movie.poster_path !== null)
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '';

  // Kolom nomor
  const $colNo = $('<td>').attr('width', 10).append(
    $('<h2>', { class: 'display-5', text: `#${movieNo}` })
  );

  // Kolom poster
  const $colPoster = $('<td>').attr('width', 100).append(
    $('<img>', { src: posterUrl }).attr('height', 200)
  );

  // Kolom informasi film
  const $colInfo = $('<td>')
    .append($('<h2>', { class: 'display-5', text: movie.title }))   // Title
    .append($('<p>', { text: movie.overview }))                     // Overview
    .append($('<span>', {                                           // Rating
      class: 'badge badge-success p-2',
      text: `Rating: ${movie.vote_average}`
    }));

  // Genres
  $.each(movie.genre_ids, function (i, id) {
    $colInfo.append(
      $('<span>', { class: 'badge badge-warning ml-2 p-2', text: genres[id] })
    );
  });

  return $('<tr>').append($colNo, $colPoster, $colInfo);
}