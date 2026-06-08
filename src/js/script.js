const courses = [
    {
        id: 1,
        title: "The Ultimate Google Ads Training Course",
        category: "marketing",
        price: 100,
        instructor: "Jerome Bell",
        image: "../../images/photo8.jpg"  // Мужчина в голубой рубашке с очками
    },
    {
        id: 2,
        title: "Product Management Fundamentals",
        category: "management",
        price: 480,
        instructor: "Marvin McKinney",
        image: "../../images/photo4.jpg"  // Мужчина в зелёной кофте
    },
    {
        id: 3,
        title: "HR Management and Analytics",
        category: "hr",
        price: 200,
        instructor: "Leslie Alexander Li",
        image: "../../images/photo3.jpg"  // Мужчина в белой поло
    },
    {
        id: 4,
        title: "Brand Management & PR Communications",
        category: "marketing",
        price: 530,
        instructor: "Kristin Watson",
        image: "../../images/photo9.jpg"  // Женщина с длинными волосами
    },
    {
        id: 5,
        title: "Graphic Design Basic",
        category: "design",
        price: 500,
        instructor: "Guy Hawkins",
        image: "../../images/photo2.jpg"  // Мужчина в голубой рубашке, руки скрещены
    },
    {
        id: 6,
        title: "Business Development Management",
        category: "management",
        price: 400,
        instructor: "Dianne Russell",
        image: "../../images/photo7.jpg"  // Женщина в зелёной футболке
    },
    {
        id: 7,
        title: "Highload Software Architecture",
        category: "development",
        price: 600,
        instructor: "Brooklyn Simmons",
        image: "../../images/photo5.jpg"  // Мужчина в серой футболке
    },
    {
        id: 8,
        title: "Human Resources - Selection and Recruitment",
        category: "hr",
        price: 150,
        instructor: "Kathryn Murphy",
        image: "../../images/photo1.jpg"  // Женщина с рыжими волосами
    },
    {
        id: 9,
        title: "User Experience. Human-centered Design",
        category: "design",
        price: 240,
        instructor: "Cody Fisher",
        image: "../../images/photo6.jpg"  // Мужчина в белой кофте с очками
    }
];

// DOM элементы
const coursesGrid = document.getElementById('coursesGrid');
const categoryBtns = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('searchInput');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let currentCategory = 'all';
let searchTerm = '';

document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
    setupEventListeners();
});

// Курсы рендеринга
function renderCourses() {
    coursesGrid.innerHTML = '';
    
    const filteredCourses = courses.filter(course => {
        const matchesCategory = currentCategory === 'all' || course.category === currentCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    filteredCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });

    // Кнопка Показать/Cкрыть дополнительную загрузку
    loadMoreBtn.parentElement.style.display = filteredCourses.length >= 9 ? 'block' : 'none';
}

// Создать элемент карточки курса
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.dataset.category = course.category;
    
    card.innerHTML = `
        <div class="course-image">
            <img src="${course.image}" alt="${course.title}" onerror="this.src='https://via.placeholder.com/400x300/ffd93d/ffffff?text=Course+Image'">
        </div>
        <div class="course-content">
            <span class="category-badge ${course.category}">${getCategoryName(course.category)}</span>
            <h3 class="course-title">${course.title}</h3>
            <div class="course-footer">
                <span class="course-price">$${course.price}</span>
                <span class="course-instructor"> | by <span>${course.instructor}</span></span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        alert(`Course: ${course.title}\nPrice: $${course.price}\nInstructor: ${course.instructor}`);
    });
    
    return card;
}

// Получить отображаемое название категории
function getCategoryName(category) {
    const names = {
        'marketing': 'Marketing',
        'management': 'Management',
        'hr': 'HR & Recruiting',
        'design': 'Design',
        'development': 'Development'
    };
    return names[category] || category;
}

function setupEventListeners() {
    // Фильтр категории
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderCourses();
        });
    });

    // Поиск
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderCourses();
    });

    // Загрузить больше
    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
            </svg>
            Loading...
        `;
        
        setTimeout(() => {
            loadMoreBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M23 4v6h-6M1 20v-6h6"></path>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
                Load more
            `;
            alert('Loading more courses...');
        }, 1000);
    });
}