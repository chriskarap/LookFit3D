const hamburgerAction = () => {

    let marginFilters = 0;

    const filters = document.getElementById('filters');
    const filtersBody = document.getElementById('filters-body');
    marginFilters = -filtersBody.offsetWidth;
    const filtersHamburger = document.getElementById('filters-hamburger');

    filtersHamburger.addEventListener('mouseup', () => {
        (marginFilters === 0) ? marginFilters = -filtersBody.offsetWidth : marginFilters = 0;
        filters.style.marginLeft = marginFilters + 'px';
        (+filters.style.zIndex == 13) ? filters.style.zIndex = '12' : filters.style.zIndex = '13';
    });

    let marginClothes = 0;

    const clothes = document.getElementById('clothes');
    const clothesBody = document.getElementById('clothes-body');
    marginClothes = -clothesBody.offsetWidth;
    const clothesHamburger = document.getElementById('clothes-hamburger');

    clothesHamburger.addEventListener('mouseup', () => {
        (marginClothes === 0) ? marginClothes = clothesBody.offsetWidth : marginClothes = 0;
        clothes.style.marginLeft = marginClothes + 'px';
        (+clothes.style.zIndex == 13) ? clothes.style.zIndex = '12' : clothes.style.zIndex = '13';
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 991) {
            if (marginFilters !== 0)
                filters.style.marginLeft = -filtersBody.offsetWidth + 'px';

            if (marginClothes !== 0)
                clothes.style.marginLeft = clothesBody.offsetWidth + 'px';
        } else {
            filters.style.marginLeft = 0 + 'px';
            clothes.style.marginLeft = 0 + 'px';
        }
    });

};