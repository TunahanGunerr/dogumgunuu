document.addEventListener('DOMContentLoaded', () => {

    // --- AYARLAR BÖLÜMÜ ---
    const CANDLE_COUNT = 16;
    
    // BURAYI DEĞİŞTİR: 'images/foto1.jpg' gibi kendi fotoğraf yollarını ekle.
    const PHOTO_URLS = [
        'images/foto1.jpg',
        'images/foto2.jpg',
        'images/foto3.jpg',
        'images/foto4.jpg',
        'images/foto5.jpg',
        'images/foto6.jpg',
        'images/foto7.jpg',
        'images/foto8.jpg',
        'images/foto9.jpg',
        'images/foto10.jpg'
    ];

    // --- ELEMENTLER ---
    const instructions = document.getElementById('instructions');
    const candlesContainer = document.getElementById('candlesContainer');
    const cakeWrapper = document.getElementById('cakeWrapper');
    const messageContainer = document.getElementById('messageContainer');
    const photosContainer = document.getElementById('photosContainer');
    
    let extinguishedCount = 0;
    let instructionsHidden = false;

    // 1. Mumları oluştur
    function createCandles() {
        for (let i = 0; i < CANDLE_COUNT; i++) {
            const candle = document.createElement('div');
            candle.className = 'candle';
            
            const flame = document.createElement('div');
            flame.className = 'flame';
            
            candle.appendChild(flame);
            candle.addEventListener('click', handleCandleClick);
            candlesContainer.appendChild(candle);
        }
    }

    // 2. Muma tıklanma olayı
    function handleCandleClick(event) {
        const candle = event.currentTarget;

        // Mumun sönük olup olmadığını kontrol et
        if (candle.classList.contains('extinguished')) {
            return; // Zaten sönmüşse bir şey yapma
        }

        // İlk muma tıklandığında talimatı gizle
        if (!instructionsHidden) {
            instructions.classList.add('hidden');
            instructionsHidden = true;
        }
        
        candle.classList.add('extinguished');
        extinguishedCount++;

        // Tüm mumlar söndü mü?
        if (extinguishedCount === CANDLE_COUNT) {
            // Final animasyonunu başlat
            setTimeout(triggerFinalSequence, 1000); // Duman efektinin bitmesi için bekle
        }
    }
    
    // 3. Final animasyon akışı
    function triggerFinalSequence() {
        // Pastayı ayır
        cakeWrapper.classList.add('split');
        
        // Mesajı göster
        setTimeout(() => {
            messageContainer.classList.add('visible');
        }, 1200);

        // Fotoğrafları göster
        setTimeout(showPhotos, 2500);
    }

    // 4. Fotoğrafları rastgele yerlerde göster
    function showPhotos() {
        PHOTO_URLS.forEach((url, index) => {
            setTimeout(() => {
                const photo = document.createElement('img');
                photo.src = url;
                photo.className = 'photo';

                const vpWidth = window.innerWidth;
                const vpHeight = window.innerHeight;
                
                // Fotoğrafların ekranın kenarlarından taşmamasını sağla
                photo.style.top = `${Math.random() * (vpHeight - 200)}px`;
                photo.style.left = `${Math.random() * (vpWidth - 200)}px`;
                
                // Rastgele bir dönüş açısı ver
                const rotation = (Math.random() - 0.5) * 30; // -15 ile +15 derece arası
                photo.style.setProperty('--rotation', `${rotation}deg`);

                photosContainer.appendChild(photo);
                
                // CSS animasyonunun başlaması için küçük bir gecikme
                setTimeout(() => photo.classList.add('show'), 50);

            }, index * 500); // Her fotoğraf 0.5 saniye arayla belirir
        });
    }

    // Programı başlat
    createCandles();
});