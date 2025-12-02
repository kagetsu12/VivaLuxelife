// Articles Data
const articles = [
    {
        id: 1,
        title: "Timeless Elegance: The Art of Vintage Fashion",
        category: "fashion",
        date: "2025-01-15",
        excerpt: "Discover how vintage fashion pieces can transform your wardrobe into a collection of timeless elegance. From classic silhouettes to quality craftsmanship, explore the enduring appeal of well-chosen garments.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        content: "article1.html"
    },
    {
        id: 2,
        title: "Natural Skincare: Embracing Organic Beauty Routines",
        category: "health",
        date: "2025-03-22",
        excerpt: "Uncover the secrets of natural skincare and how organic ingredients can revolutionize your beauty routine. Learn about the benefits of plant-based products and sustainable beauty practices.",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop",
        content: "article2.html"
    },
    {
        id: 3,
        title: "Creating a Cozy Garden Sanctuary",
        category: "home",
        date: "2025-05-10",
        excerpt: "Transform your outdoor space into a peaceful retreat with our guide to creating a garden sanctuary. From plant selection to seating arrangements, discover how to design your perfect haven.",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
        content: "article3.html"
    },
    {
        id: 4,
        title: "Hidden Gems: Exploring European Countryside Retreats",
        category: "travel",
        date: "2025-06-18",
        excerpt: "Escape the tourist crowds and discover charming countryside retreats across Europe. From rustic farmhouses to elegant chateaus, explore accommodations that offer authentic local experiences.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        content: "article4.html"
    },
    {
        id: 5,
        title: "Smart Financial Planning for Modern Living",
        category: "finance",
        date: "2025-08-05",
        excerpt: "Navigate the complexities of modern finance with practical strategies for budgeting, saving, and investing. Learn how to build a secure financial future while enjoying life's pleasures today.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
        content: "article5.html"
    }
];

// Products Data
const products = {
    1: [
        {
            name: "Vintage Leather Handbag",
            description: "Handcrafted Italian leather handbag with timeless design and exceptional durability.",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
            rating: "★★★★★",
            price: "$299"
        },
        {
            name: "Classic Silk Scarf",
            description: "Luxurious silk scarf featuring elegant patterns, perfect for adding sophistication to any outfit.",
            image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
            rating: "★★★★☆",
            price: "$89"
        }
    ],
    2: [
        {
            name: "Natural Face Cleanser",
            description: "Gentle, plant-based cleanser suitable for all skin types, leaving skin soft and refreshed.",
            image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=300&fit=crop",
            rating: "★★★★☆",
            price: "$28"
        }
    ],
    3: [
        {
            name: "Garden Tool Set",
            description: "Premium stainless steel garden tools designed for comfort and durability in your garden sanctuary.",
            image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
            rating: "★★★★★",
            price: "$149"
        },
        {
            name: "Outdoor Seating Collection",
            description: "Weather-resistant wicker furniture set perfect for creating your peaceful garden retreat.",
            image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop",
            rating: "★★★★☆",
            price: "$599"
        }
    ],
    4: [
        {
            name: "Travel Guide: European Countryside",
            description: "Comprehensive guidebook featuring hidden gems and authentic experiences across Europe.",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
            rating: "★★★★★",
            price: "$24"
        },
        {
            name: "Luxury Travel Accessories Set",
            description: "Premium travel accessories including passport holder, luggage tags, and travel journal.",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
            rating: "★★★★☆",
            price: "$79"
        }
    ],
    5: [
        {
            name: "Financial Planning Workbook",
            description: "Comprehensive guide to personal finance with worksheets and practical strategies.",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop",
            rating: "★★★★★",
            price: "$19"
        },
        {
            name: "Investment Starter Kit",
            description: "Essential resources for beginning investors, including guides and planning tools.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
            rating: "★★★★☆",
            price: "$45"
        }
    ]
};

// Current state
let currentPage = 1;
let articlesPerPage = 6;
let currentCategory = 'all';
let currentSearch = '';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderArticles();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Category filtering
    const categoryLinks = document.querySelectorAll('[data-category]');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });
}

// Filter by category
function filterByCategory(category) {
    currentCategory = category;
    currentPage = 1;
    renderArticles();
    
    // Update active state
    document.querySelectorAll('[data-category]').forEach(link => {
        if (link.getAttribute('data-category') === category) {
            link.style.color = '#8B6F47';
            link.style.fontWeight = '600';
        } else {
            link.style.color = '';
            link.style.fontWeight = '';
        }
    });
}

// Perform search
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        currentSearch = searchInput.value.toLowerCase().trim();
        currentPage = 1;
        renderArticles();
    }
}

// Get filtered articles
function getFilteredArticles() {
    let filtered = articles;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(article => article.category === currentCategory);
    }
    
    // Filter by search
    if (currentSearch) {
        filtered = filtered.filter(article => 
            article.title.toLowerCase().includes(currentSearch) ||
            article.excerpt.toLowerCase().includes(currentSearch)
        );
    }
    
    return filtered;
}

// Render articles
function renderArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    if (!articlesGrid) return;
    
    const filteredArticles = getFilteredArticles();
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToShow = filteredArticles.slice(startIndex, endIndex);
    
    if (articlesToShow.length === 0) {
        articlesGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 3rem; font-size: 1.2rem; color: #8B6F47;">No articles found. Try adjusting your search or filter.</p>';
        document.getElementById('pagination').innerHTML = '';
        return;
    }
    
    articlesGrid.innerHTML = articlesToShow.map(article => `
        <a href="articles/${article.content}" class="article-card">
            <img src="${article.image}" alt="${article.title}" class="article-image">
            <div class="article-content">
                <span class="article-category">${article.category.replace('-', ' & ')}</span>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span>${formatDate(article.date)}</span>
                    <span>Read More →</span>
                </div>
            </div>
        </a>
    `).join('');
    
    renderPagination(filteredArticles.length);
}

// Render pagination
function renderPagination(totalArticles) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `<button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">← Previous</button>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span>...</span>`;
        }
    }
    
    // Next button
    paginationHTML += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Next →</button>`;
    
    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    currentPage = page;
    renderArticles();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Load article detail
function loadArticleDetail(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;
    
    // This would be used in article detail pages
    return article;
}

// Load products for article
function loadProductsForArticle(articleId) {
    return products[articleId] || [];
}

// Render products
function renderProducts(articleId) {
    const productSection = document.getElementById('productSection');
    if (!productSection) return;
    
    const articleProducts = loadProductsForArticle(articleId);
    
    if (articleProducts.length === 0) return;
    
    productSection.innerHTML = `
        <div class="product-section">
            <h2>Recommended Products</h2>
            <div class="products-grid">
                ${articleProducts.map(product => `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            <div class="product-rating">${product.rating}</div>
                            <div class="product-price">${product.price}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

