const filterContainer = () => {
    const header = document.getElementById('header');
    const contextHeight = (window.innerHeight - header.offsetHeight);
    const filtersBody = document.getElementById('filters-body');
    filtersBody.style.height = contextHeight + 'px';

    const filterView = document.getElementById('filterContainer');
    const templateFilter = document.getElementById('template-filter').text;
    for (let key in filtering_list) {
        if (filtering_list.hasOwnProperty(key)) {
            const element = document.createElement("div");
            element.classList += ' row';
            element.innerHTML = templateFilter;

            element.getElementsByClassName('filter-category')[0].getElementsByTagName('span')[0].innerHTML = key + ':';
            filterView.appendChild(element);

            filtering_list[key].forEach((elem) => {
                const button = document.createElement('button');
                button.classList += ' btn';
                button.classList += ' filer-btn';
                button.type = 'button';
                element.getElementsByClassName('filter-elements')[0].appendChild(button);

                if (key === 'color') {
                    button.classList += ' color-btn';
                    button.style.backgroundColor = elem;
                } else {
                    const span = document.createElement('span');
                    span.innerHTML = elem;
                    button.appendChild(span);

                    button.addEventListener('click', () => {
                        button.style.backgroundColor = '#66023c';
                        span.style.color = '#FFFFFF';
                    });
                }
            });
        }
    }
};

