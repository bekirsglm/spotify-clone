// Ui işlemleri için oluşturulan UI classı
class UI {
  // Kurucu metot
  constructor() {
    // Html'den Js'e elemanları çekme
    this.musicList = document.querySelector(".music-list");
    this.form = document.querySelector("form");
    this.musicTitle = document.querySelector("#music-title");
    this.player = document.querySelector(".player");
  }

  // Şarkı kartlarını renderlayacak fonksiyon
  renderCard(songs) {
    // Bu fonksiyondan beklentimiz api'dan alınan her şarkı elemanı için arayüze bir şarkı kartı render etmesi

    // musicList'in html içeriği sıfırla
    this.musicList.innerHTML = "";

    // Parametre olarak verilen songs'u dön ve içerisindeki her şarkı elemanı için bir card html'i oluştur
    songs.forEach((song) => {
      // Bir tane card elemanı oluştur
      const card = document.createElement("div");

      // Oluşturulan card elemanına "card" classı ekle
      //   card.classList.add("card");
      card.className = "card";

      // Oluşturulan,classı belirlenen card elemanın Html içeriğini belirle
      card.innerHTML = `
              <figure>
                <img
                  src="${song.images.coverarthq}"
                  alt="music-image"
                />

                <div class="play" data-id="${song.key}">
                  <i class="bi bi-play-fill"></i>
                </div>
              </figure>

              <div class="music-info">
                <h4>${song.title}</h4>
                <h4>${song.subtitle}</h4>
              </div>
            `;

      // Oluşturulan,class eklemesi yapılan ve Html içeriği belirlenen card'ları arayüze ekle
      this.musicList.appendChild(card);
    });
  }

  // Loader render edecek fonksiyon
  renderLoader() {
    // Bu fonksiyondan beklentimiz music list kısmında bir loader render etmesi

    // musicList kısmında bir loader render et
    this.musicList.innerHTML = `

 <div class="loader-wrapper">
<div class="loader">
  <div class="cell d-0"></div>
  <div class="cell d-1"></div>
  <div class="cell d-2"></div>

  <div class="cell d-1"></div>
  <div class="cell d-2"></div>
  
  
  <div class="cell d-2"></div>
  <div class="cell d-3"></div>
  
  
  <div class="cell d-3"></div>
  <div class="cell d-4"></div>

  
</div>
</div>

`;
  }

  // player alanını dinamik olarak ekrana basıcak fonksiyon
  renderPlayer(music) {
    // player arayüzünü ekrana bas
    this.player.innerHTML = `
      <div class="info">
        <img
          id="music-image"
          src="${music.images.coverart}"
          alt="music-image"
        />

        <div>
          <h5 title="${music.title}">${music.title}</h5>
          <p>${music.subtitle}</p>
        </div>
      </div>

      <div class="audio-wrapper">
      <audio
       volume
        src="${music.hub.actions[1].uri}"
        controls
      ></audio>
      </div>

      <div class="icons">
        <i class="bi bi-apple-music"></i>
        <i class="bi bi-music-note-list"></i>
        <i class="bi bi-pc-display"></i>
      </div>
    `;

    // audio elementine eriş
    const audioElement = document.querySelector("audio");

    // ses seviyesini düşür
    audioElement.volume = 0.05;
    // otomatik oynatmayı aç
    audioElement.autoplay = true;

    // müzik oynatıldığına animasyonu çalıştır
    audioElement.addEventListener("play", () => {
      // playerdaki resme eriş
      const image = document.querySelector("#music-image");

      // resme animasyonu başlatan class'ı ekle
      image.classList.add("animate");
    });

    // müzik durdurulduğunda animasyonu durdur
    audioElement.addEventListener("pause", () => {
      // playerdaki resme eriş
      const image = document.querySelector("#music-image");

      // resimden animayonu başlatan class'ı kaldır
      image.classList.remove("animate");
    });
  }
}

export default UI;