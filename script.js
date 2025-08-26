document.addEventListener('DOMContentLoaded', () => {

    // --- Data: Books with Indian Cultural Focus, real images, and Rupee prices ---
    const books = [
        { id: 1, title: "Bhagavad Gita: As It Is", price: 250.00, genre: "Indian Culture", imageURL: "https://m.media-amazon.com/images/I/51znFTXF4YL._SL500_.jpg" },
        { id: 2, title: "Ramayana", price: 350.00, genre: "Indian Culture", imageURL: "https://m.media-amazon.com/images/I/51iym1yM1nL._SL500_.jpg" },
        { id: 3, title: "Mahabharata", price: 450.00, genre: "Indian Culture", imageURL: "https://m.media-amazon.com/images/I/5105z0GBFBL._SL500_.jpg" },
        { id: 4, title: "The Discovery of India", price: 200.00, genre: "Indian Culture", imageURL: "https://m.media-amazon.com/images/I/41f9416TmKL._SX319_BO1,204,203,200_.jpg" },
        { id: 5, title: "The Story of My Experiments with Truth", price: 180.00, genre: "Indian Culture", imageURL: "https://m.media-amazon.com/images/I/41HFLJj64oL._SX317_BO1,204,203,200_.jpg" },
        { id: 6, title: "Concepts of Modern Physics", price: 550.00, genre: "Science & Technology", imageURL: "https://m.media-amazon.com/images/I/51DFL4JiyML._SX397_BO1,204,203,200_.jpg" },
        { id: 7, title: "Introduction to Algorithms", price: 600.00, genre: "Science & Technology", imageURL: "https://m.media-amazon.com/images/I/41vgHrmPJ+L._SX321_BO1,204,203,200_.jpg" },
        { id: 8, title: "Cosmos", price: 380.00, genre: "Science & Technology", imageURL: "https://m.media-amazon.com/images/I/51H8mN2jJQL._SY445_SX342_.jpg" },
        { id: 9, title: "The Selfish Gene", price: 280.00, genre: "Science & Technology", imageURL: "https://m.media-amazon.com/images/I/41O7j9x0-KL._SY346_.jpg" }
    ];

    // --- DOM Elements ---
    const signupOverlay = document.getElementById('signup-overlay');
    const signupForm = document.getElementById('signup-form');
    const userNameInput = document.getElementById('user-name');
    const userGreeting = document.getElementById('user-greeting');
    const booksContainer = document.getElementById('books-container');
    const searchInput = document.getElementById('search-input');

    // --- Signup Modal Logic ---
    signupForm.addEventListener('submit', (e) => {
        // THIS IS THE FIX: It prevents the form from reloading the page
        e.preventDefault(); 
        
        const userName = userNameInput.value;
        userGreeting.textContent = `Hello, ${userName}!`;
        signupOverlay.classList.remove('active');
        displayBooks(books); // Display books after signup
    });

    // --- Search Logic ---
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.genre.toLowerCase().includes(searchTerm)
        );
        displayBooks(filteredBooks);
    });

    // --- Book Display Logic ---
    function displayBooks(bookList) {
        booksContainer.innerHTML = "";

        const booksByGenre = bookList.reduce((acc, book) => {
            (acc[book.genre] = acc[book.genre] || []).push(book);
            return acc;
        }, {});

        const genreOrder = ["Indian Culture", "Science & Technology"];
        const isSearching = searchInput.value.length > 0;
        
        if (isSearching && bookList.length > 0) {
            const grid = document.createElement('div');
            grid.className = 'books-grid';
            bookList.forEach(book => grid.appendChild(createBookCard(book)));
            booksContainer.appendChild(grid);
            return;
        }

        genreOrder.forEach(genreName => {
            if (booksByGenre[genreName] && booksByGenre[genreName].length > 0) {
                const categorySection = document.createElement('div');
                categorySection.className = 'book-category';
                categorySection.innerHTML = `<h2>${genreName}</h2>`;

                const grid = document.createElement('div');
                grid.className = 'books-grid';
                booksByGenre[genreName].forEach(book => grid.appendChild(createBookCard(book)));
                categorySection.appendChild(grid);
                booksContainer.appendChild(categorySection);
            }
        });
    }
    
    function createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'book-card';
        // Updated to use the Rupee symbol ₹
        card.innerHTML = `
            <img src="${book.imageURL}" alt="Cover of ${book.title}">
            <div class="book-info">
                <div>
                    <h3 class="book-title">${book.title}</h3>
                </div>
                <div>
                    <p class="book-price">₹${book.price.toFixed(2)}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;
        return card;
    }
});