const hamburgerAction = () => {

    let marginFilters = 0;

    const filters = document.getElementById('filters');
    const filtersBody = document.getElementById('filters-body');
    marginFilters = -filtersBody.offsetWidth;
    const filtersHamburger = document.getElementById('filters-hamburger').children[0];

    filtersHamburger.addEventListener('mouseup', () => {
        if (window.innerWidth <= 991) {
            marginFilters ? marginFilters = 0 : marginFilters = -filtersBody.offsetWidth;
            filters.style.marginLeft = marginFilters + 'px';
            (+filters.style.zIndex == 13) ? filters.style.zIndex = '12' : filters.style.zIndex = '13';
        }
    });

    let marginClothes = 0;

    const clothes = document.getElementById('clothes');
    const clothesBody = document.getElementById('clothes-body');
    marginClothes = -clothesBody.offsetWidth;
    const clothesHamburger = document.getElementById('clothes-hamburger').children[0];

    clothesHamburger.addEventListener('mouseup', () => {
        if (window.innerWidth <= 991) {
            marginClothes ? marginClothes = 0 : marginClothes = clothesBody.offsetWidth;
            clothes.style.marginLeft = marginClothes + 'px';
            (+clothes.style.zIndex == 13) ? clothes.style.zIndex = '12' : clothes.style.zIndex = '13';
        }
    });
};