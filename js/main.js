import API from "./api.js";
import UI from "./ui.js";

// API clasının bir örneğini al
const api = new API();

// UI classının bir örneğini al
const ui = new UI();

// ! Sayfa yüklendiğinde
document.addEventListener("DOMContentLoaded", async () => {
  // Loader'ı render et
  ui.renderLoader();

  // Api'a istek at ve popüler müzikleri al
  const songs = await api.getPopularMusics();

  // Api'dan alınan şarkı verileri için birer card render edecek fonksiyon
  ui.renderCard(songs);
});

// ! Form gönderildiğinde
ui.form.addEventListener("submit", async (e) => {
  // Sayfa yenilemeyi engellee
  e.preventDefault();

  // Input'un değerine eriş ve erişilen değerin başında ve sonundaki boşlukları kaldır
  const query = e.target[0].value.trim();

  // Eğer query değeri yoksa kullanıcıya uyarı ver
  if (!query) {
    // Kullanıcıya bildirim gönder
    alert("Lütfen geçerli bir arama işlemi gerçekleştiriniz!!");

    // Fonksiyonu durdur
    return;
  }

  // ekrana loader bas
  ui.renderLoader();

  // sayfa başlığını güncelle
  ui.musicTitle.textContent = `${query} için sonuçlar`;

  // formun gönderilmesi sonucunda elde edilen query değeri ile api'a istek at
  const songs = await api.getSearchMusic(query);

  // api'dan gelen verileri ekrana bas
  ui.renderCard(songs);
});

// ! Oynat butonuna tıklandığında
ui.musicList.addEventListener("click", (e) => {
  if (e.target.className === "play") {
    // oynatılan şarkının id'sine eriş
    const id = e.target.dataset.id;

    // oynatılacak şarkının bütün verilerine eriş
    const music = api.musics.find((music) => music.key == id);

    // player arayüznü güncelle
    ui.renderPlayer(music);
  }
});