const renderRecentSearches = () => {
    
    const recentSearches = readFromLocalStorage("recentSearches", []);

if (recentSearches.length) {
    const createRecentCity = (city) => {
        return `<li class="list-group-item" data-city="${city}"
        >
        ${city}
        </li>`
    };

    const recentCities = recentSearches.map(createRecentCity).join

    const ul = `<ul class="list-group ${recentCities}">
</ul>` ;

recentSearchesContainer.append(ul)

} else {

    const alert = `<div class="alert alert-warning" role="alert">
        A simple warning alert—check it out!
    </div>`
recentSearchesContainer.append(alert);
};
