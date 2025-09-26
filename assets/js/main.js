document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    // Otomatik slider
    setInterval(() => showSlide(currentSlide + 1), 5000);

    // Hizmet modali için veri
    const serviceData = {
        'sehirler-arasi': {
            image: 'assets/img/luxtas_arasokak_asansor.jpeg',
            title: 'Şehirler Arası Nakliyat',
            description: 'Türkiye\'nin her noktasına güvenli ve profesyonel taşımacılık hizmeti sunuyoruz. Modern araç filomuz ve deneyimli ekibimizle şehirler arası nakliyat hizmetinizde yanınızdayız.'
        },
        'evden-eve': {
            image: 'assets/img/luxtas_ev_asansor.jpeg',
            title: 'Evden Eve Nakliyat',
            description: 'Eşyalarınızı özenle paketliyor, yeni evinize güvenle taşıyoruz. Özel asansör sistemlerimiz ve uzman ekibimizle sorunsuz bir taşınma deneyimi yaşatıyoruz.'
        },
        'ofis-tasimaciligi': {
            image: 'assets/img/luxtas_ikinci_kat_asansor.jpeg',
            title: 'Ofis Taşımacılığı',
            description: 'İş yerinizi minimum kesinti ile yeni lokasyonunuza taşıyoruz. İş süreçlerinizi aksatmadan, planlı ve organize şekilde ofis taşıma hizmeti veriyoruz.'
        },
        'paketleme-hizmeti': {
            image: 'assets/img/luxtas_iki_arac.jpeg',
            title: 'Paketleme Hizmeti',
            description: 'Özel paketleme malzemeleri ile eşyalarınızı güvenle paketliyoruz. Her eşya türüne özel koruma ve paketleme çözümleri sunuyoruz.'
        },
        'parsiyel-tasimacilik': {
            image: 'assets/img/luxtas_kucuk_kamyon.jpeg',
            title: 'Parsiyel Taşımacılık',
            description: 'Küçük yükleriniz için ekonomik ve hızlı parsiyel taşıma çözümleri. Tek bir eşyadan komple ev eşyasına kadar her boyutta taşıma yapıyoruz.'
        },
        'depolama-hizmeti': {
            image: 'assets/img/luxtas_sari_kutu_depolama.jpeg',
            title: 'Depolama Hizmeti',
            description: 'Güvenli ve modern depolama tesislerimizde eşyalarınızı koruyoruz. Kısa ve uzun süreli depolama çözümleri ile eşyalarınız güvende.'
        }
    };

    // Modal işlemleri için gerekli elementleri seçelim
    const modal = document.getElementById('serviceModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.close-modal');

    // Modal açma fonksiyonu
    window.openModal = function(serviceId) {
        const data = serviceData[serviceId];
        if (data) {
            modalImg.src = data.image;
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.description;
            modal.style.display = 'block';
        }
    };

    // Modal kapatma işlemleri
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Modal dışına tıklandığında kapatma
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    function initTestimonialsSlider() {
        const cards = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.querySelector('.testimonials-slider .prev');
        const nextBtn = document.querySelector('.testimonials-slider .next');
        let currentIndex = 0;
        const visibleCount = 3; // bir seferde gösterilecek kart sayısı

        function showTestimonials(index) {
            cards.forEach(card => card.classList.add('hidden'));
            for (let i = 0; i < visibleCount; i++) {
                const cardIndex = (index + i) % cards.length; // döngüsel index
                cards[cardIndex].classList.remove('hidden');
                cards[cardIndex].style.animation = 'none';
                cards[cardIndex].offsetHeight; // trigger reflow
                cards[cardIndex].style.animation = null;
            }
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - visibleCount + cards.length) % cards.length;
            showTestimonials(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + visibleCount) % cards.length;
            showTestimonials(currentIndex);
        });

        // İlk gösterim
        showTestimonials(0);
    }

    // Testimonials slider'ı başlat
    initTestimonialsSlider();

    // Back to top functionality
    document.querySelector('.back-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.querySelectorAll('.nav-item.dropdown > .dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if(window.innerWidth <= 821) { 
                e.preventDefault();
                this.parentElement.classList.toggle('active');
            }
        });
    });

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            document.querySelector('.back-to-top').style.display = 'flex';
        } else {
            document.querySelector('.back-to-top').style.display = 'none';
        }
    });

    // Footer menü kontrolü
    // Mevcut kodların en altına ekleyin
    
    // Footer widget başlıklarına tıklama olayı ekle
    const widgetTitles = document.querySelectorAll('.widget-title');
    
    widgetTitles.forEach(title => {
        // İlk widget'ı (logo olan) hariç tut
        if (!title.parentElement.querySelector('img')) {
            title.addEventListener('click', function() {
                // Başlığın active class'ını toggle et
                this.classList.toggle('active');
                
                // İlgili menüyü bul ve toggle et
                const menu = this.nextElementSibling;
                if (menu && menu.classList.contains('footer-menu')) {
                    menu.classList.toggle('active');
                }
            });
        }
    });

});
