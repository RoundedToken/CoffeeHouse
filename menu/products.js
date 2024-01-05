import data from './products.json';
import addModal from './modal.js';

const grid = document.querySelector('.menu-grid');
const baseUrl = '/roundedtoken-JSFE2023Q4/coffee-house/dist/';
const tabs = document.querySelectorAll('.tab-item');
const moreButton = document.querySelector('.more-items');

moreButton.addEventListener('click', () => {
    for (const child of grid.childNodes) {
        child.style.display = 'flex';
    }
    moreButton.style.display = 'none';
});

for (const tab of tabs) {
    tab.addEventListener('click', (e) => {
        const category = e.currentTarget.id.split('-')[0];

        renderCategory(category);

        if (grid.childNodes.length > 4 && window.innerWidth <= 768) {
            moreButton.style.display = 'block';
        } else {
            moreButton.style.display = 'none';
        }

        for (const t of tabs) {
            t.classList.remove('tab-item-active');
            t.classList.remove('link-t');
        }

        tab.classList.add('tab-item-active');
        tab.classList.add('link-t');
    });
}

window.onresize = () => {
    if (window.innerWidth <= 768 && grid.childNodes.length > 4) {
        for (let i = 4; i < grid.childNodes.length; i++) {
            const child = grid.childNodes[i];
            child.style.display = 'none';
        }
        moreButton.style.display = 'block';
    } else {
        for (const child of grid.childNodes) {
            child.style.display = 'flex';
        }
        moreButton.style.display = 'none';
    }
};

function renderCategory(categoryName) {
    const category = data.filter((product) => product.category === categoryName);
    grid.innerHTML = '';

    for (const i in category) {
        const { name, description, price } = category[i];
        const preview = document.createElement('div');
        preview.classList.add('preview');
        preview.id = `${categoryName}-${i}`;
        preview.innerHTML = `
            <div class="box">
                <img src="${baseUrl}${categoryName}-${+i + 1}.png" alt="${name}" />
            </div>
            <div class="description">
                <div class="title">
                    <h3>${name}</h3>
                    <p class="medium">
                        ${description}
                    </p>
                </div>
                <h3>$${price}</h3>
            </div>`;

        grid.appendChild(preview);
    }

    addModal();
}

renderCategory('coffee');
