// Fonctions principales pour la gestion des podcasts
const podcastApp = {
    // Configuration
    config: {
        baseUrl: window.location.origin,
        audioStorageUrl: 'https://example-storage.com/audio/',
        podcastsPerPage: 12
    },
    
    // État de l'application
    state: {
        podcasts: [],
        currentPage: 1,
        totalPages: 1,
        searchQuery: ''
    },
    
    // Initialisation
    init: function() {
        // Déterminer la page actuelle
        const currentPath = window.location.pathname;
        
        // Charger les données des podcasts (simulé pour le moment)
        this.loadPodcasts();
        
        // Initialiser les fonctionnalités spécifiques à chaque page
        if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
            this.initHomePage();
        } else if (currentPath.endsWith('podcasts.html')) {
            this.initPodcastsPage();
        } else if (currentPath.endsWith('qr-codes.html')) {
            this.initQrCodesPage();
        } else if (currentPath.includes('/podcasts/')) {
            this.initPodcastDetailPage();
        }
    },
    
    // Charger les données des podcasts (simulé pour le moment)
    loadPodcasts: function() {
        // Dans une implémentation réelle, cela ferait un appel API ou chargerait un fichier JSON
        // Pour le moment, nous utilisons des données simulées
        this.state.podcasts = [
            {
                id: '2025-04-23-01',
                title: 'Exemple de podcast',
                date: '23 avril 2025',
                timestamp: new Date('2025-04-23').getTime(),
                duration: '15 minutes',
                description: 'Ceci est un exemple de description pour un podcast.',
                imageUrl: 'images/placeholder.jpg',
                audioUrl: this.config.audioStorageUrl + '2025-04-23-01/podcast.mp3',
                qrCodeUrl: 'images/qr/2025-04-23-01.png',
                qrCodeSvgUrl: 'images/qr/2025-04-23-01.svg',
                tags: ['Exemple', 'Podcast']
            },
            {
                id: '2025-04-22-01',
                title: 'Exemple de podcast 2',
                date: '22 avril 2025',
                timestamp: new Date('2025-04-22').getTime(),
                duration: '20 minutes',
                description: 'Ceci est un exemple de description pour un podcast.',
                imageUrl: 'images/placeholder.jpg',
                audioUrl: this.config.audioStorageUrl + '2025-04-22-01/podcast.mp3',
                qrCodeUrl: 'images/qr/2025-04-22-01.png',
                qrCodeSvgUrl: 'images/qr/2025-04-22-01.svg',
                tags: ['Exemple', 'Podcast']
            },
            {
                id: '2025-04-21-01',
                title: 'Exemple de podcast 3',
                date: '21 avril 2025',
                timestamp: new Date('2025-04-21').getTime(),
                duration: '18 minutes',
                description: 'Ceci est un exemple de description pour un podcast.',
                imageUrl: 'images/placeholder.jpg',
                audioUrl: this.config.audioStorageUrl + '2025-04-21-01/podcast.mp3',
                qrCodeUrl: 'images/qr/2025-04-21-01.png',
                qrCodeSvgUrl: 'images/qr/2025-04-21-01.svg',
                tags: ['Exemple', 'Podcast']
            },
            {
                id: '2025-04-20-01',
                title: 'Exemple de podcast 4',
                date: '20 avril 2025',
                timestamp: new Date('2025-04-20').getTime(),
                duration: '25 minutes',
                description: 'Ceci est un exemple de description pour un podcast.',
                imageUrl: 'images/placeholder.jpg',
                audioUrl: this.config.audioStorageUrl + '2025-04-20-01/podcast.mp3',
                qrCodeUrl: 'images/qr/2025-04-20-01.png',
                qrCodeSvgUrl: 'images/qr/2025-04-20-01.svg',
                tags: ['Exemple', 'Podcast']
            },
            {
                id: '2025-04-19-01',
                title: 'Exemple de podcast 5',
                date: '19 avril 2025',
                timestamp: new Date('2025-04-19').getTime(),
                duration: '22 minutes',
                description: 'Ceci est un exemple de description pour un podcast.',
                imageUrl: 'images/placeholder.jpg',
                audioUrl: this.config.audioStorageUrl + '2025-04-19-01/podcast.mp3',
                qrCodeUrl: 'images/qr/2025-04-19-01.png',
                qrCodeSvgUrl: 'images/qr/2025-04-19-01.svg',
                tags: ['Exemple', 'Podcast']
            },
            {
                id: '2025-04-18-01',
                title: 'Exemple de podcast 6',
                date: '18 avril 2025',
                timestamp: new Date('2025-04-18').getTime(),
                duration: '17 minutes',
                description: 'Ceci est un exemple de description pour un podcast.',
                imageUrl: 'images/placeholder.jpg',
                audioUrl: this.config.audioStorageUrl + '2025-04-18-01/podcast.mp3',
                qrCodeUrl: 'images/qr/2025-04-18-01.png',
                qrCodeSvgUrl: 'images/qr/2025-04-18-01.svg',
                tags: ['Exemple', 'Podcast']
            }
        ];
        
        // Calculer le nombre total de pages
        this.state.totalPages = Math.ceil(this.state.podcasts.length / this.config.podcastsPerPage);
    },
    
    // Initialiser la page d'accueil
    initHomePage: function() {
        // Afficher les podcasts récents sur la page d'accueil
        const recentPodcasts = this.state.podcasts.slice(0, 3);
        const podcastGrid = document.querySelector('.podcast-grid');
        
        if (podcastGrid) {
            podcastGrid.innerHTML = '';
            recentPodcasts.forEach(podcast => {
                podcastGrid.appendChild(this.createPodcastCard(podcast));
            });
        }
    },
    
    // Initialiser la page de liste des podcasts
    initPodcastsPage: function() {
        // Afficher tous les podcasts avec pagination
        this.renderPodcastList();
        
        // Initialiser la recherche
        const searchInput = document.getElementById('search-podcast');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.state.searchQuery = e.target.value.toLowerCase();
                this.state.currentPage = 1;
                this.renderPodcastList();
            });
        }
        
        // Initialiser la pagination
        const prevButton = document.querySelector('.pagination-btn:first-child');
        const nextButton = document.querySelector('.pagination-btn:last-child');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (this.state.currentPage > 1) {
                    this.state.currentPage--;
                    this.renderPodcastList();
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (this.state.currentPage < this.state.totalPages) {
                    this.state.currentPage++;
                    this.renderPodcastList();
                }
            });
        }
    },
    
    // Initialiser la page des QR codes
    initQrCodesPage: function() {
        // Afficher tous les QR codes
        const qrCodesGrid = document.getElementById('qr-codes-list');
        
        if (qrCodesGrid) {
            qrCodesGrid.innerHTML = '';
            this.state.podcasts.forEach(podcast => {
                qrCodesGrid.appendChild(this.createQrCodeCard(podcast));
            });
        }
    },
    
    // Initialiser la page de détail d'un podcast
    initPodcastDetailPage: function() {
        // Extraire l'ID du podcast de l'URL
        const pathParts = window.location.pathname.split('/');
        const podcastId = pathParts[pathParts.length - 1].replace('.html', '');
        
        // Trouver le podcast correspondant
        const podcast = this.state.podcasts.find(p => p.id === podcastId);
        
        if (podcast) {
            // Mettre à jour le titre de la page
            document.title = `${podcast.title} - Bibliothèque de Podcasts`;
            
            // Mettre à jour les éléments de la page avec les données du podcast
            const titleElement = document.querySelector('.podcast-header-info h2');
            const metaElement = document.querySelector('.podcast-meta');
            const imageElement = document.querySelector('.podcast-image img');
            const audioElement = document.querySelector('audio source');
            const descriptionElement = document.querySelector('.podcast-description p');
            const downloadButton = document.querySelector('.download-section .btn');
            const qrCodeImage = document.querySelector('.qr-code img');
            const qrCodeLinks = document.querySelectorAll('.download-links a');
            
            if (titleElement) titleElement.textContent = podcast.title;
            if (metaElement) metaElement.textContent = `Publié le ${podcast.date} • ${podcast.duration}`;
            if (imageElement) imageElement.src = `../${podcast.imageUrl}`;
            if (audioElement) audioElement.src = podcast.audioUrl;
            if (descriptionElement) descriptionElement.textContent = podcast.description;
            if (downloadButton) downloadButton.href = podcast.audioUrl;
            if (qrCodeImage) qrCodeImage.src = `../${podcast.qrCodeUrl}`;
            
            if (qrCodeLinks.length >= 2) {
                qrCodeLinks[0].href = `../${podcast.qrCodeUrl}`;
                qrCodeLinks[1].href = `../${podcast.qrCodeSvgUrl}`;
            }
        }
    },
    
    // Créer un élément de carte pour un podcast
    createPodcastCard: function(podcast) {
        const card = document.createElement('div');
        card.className = 'podcast-card';
        
        card.innerHTML = `
            <div class="podcast-thumbnail">
                <img src="${podcast.imageUrl}" alt="${podcast.title}">
            </div>
            <div class="podcast-info">
                <h4>${podcast.title}</h4>
                <p class="podcast-date">${podcast.date}</p>
                <a href="podcasts/${podcast.id}.html" class="podcast-link">Écouter</a>
            </div>
        `;
        
        return card;
    },
    
    // Créer un élément de carte pour un QR code
    createQrCodeCard: function(podcast) {
        const card = document.createElement('div');
        card.className = 'qr-code-card';
        
        card.innerHTML = `
            <img src="${podcast.qrCodeUrl}" alt="QR Code ${podcast.title}">
            <h4>${podcast.title}</h4>
            <p class="podcast-date">${podcast.date}</p>
            <a href="podcasts/${podcast.id}.html" class="podcast-link">Voir le podcast</a>
            <a href="${podcast.qrCodeUrl}" download class="download-link">Télécharger</a>
        `;
        
        return card;
    },
    
    // Afficher la liste des podcasts avec filtrage et pagination
    renderPodcastList: function() {
        const podcastList = document.getElementById('podcast-list');
        const paginationInfo = document.querySelector('.pagination-info');
        const prevButton = document.querySelector('.pagination-btn:first-child');
        const nextButton = document.querySelector('.pagination-btn:last-child');
        
        if (!podcastList) return;
        
        // Filtrer les podcasts si une recherche est en cours
        let filteredPodcasts = this.state.podcasts;
        if (this.state.searchQuery) {
            filteredPodcasts = this.state.podcasts.filter(podcast => 
                podcast.title.toLowerCase().includes(this.state.searchQuery) ||
                podcast.description.toLowerCase().includes(this.state.searchQuery) ||
                podcast.tags.some(tag => tag.toLowerCase().includes(this.state.searchQuery))
            );
        }
        
        // Calculer le nombre total de pages après filtrage
        this.state.totalPages = Math.ceil(filteredPodcasts.length / this.config.podcastsPerPage);
        
        // Ajuster la page courante si nécessaire
        if (this.state.currentPage > this.state.totalPages) {
            this.state.currentPage = Math.max(1, this.state.totalPages);
        }
        
        // Calculer les indices de début et de fin pour la pagination
        const startIndex = (this.state.currentPage - 1) * this.config.podcastsPerPage;
        const endIndex = Math.min(startIndex + this.config.podcastsPerPage, filteredPodcasts.length);
        
        // Obtenir les podcasts pour la page courante
        const paginatedPodcasts = filteredPodcasts.slice(startIndex, endIndex);
        
        // Vider et remplir la liste des podcasts
        podcastList.innerHTML = '';
        if (paginatedPodcasts.length > 0) {
            paginatedPodcasts.forEach(podcast => {
                podcastList.appendChild(this.createPodcastCard(podcast));
            });
        } else {
            podcastList.innerHTML = '<div class="no-results">Aucun podcast trouvé</div>';
        }
        
        // Mettre à jour l'information de pagination
        if (paginationInfo) {
            paginationInfo.textContent = `Page ${this.state.currentPage} sur ${this.state.totalPages || 1}`;
        }
        
        // Mettre à jour l'état des boutons de pagination
        if (prevButton) {
            prevButton.disabled = this.state.currentPage <= 1;
        }
        
        if (nextButton) {
            nextButton.disabled = this.state.currentPage >= this.state.totalPages;
        }
    }
};

// Initialiser l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    podcastApp.init();
});
