const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query.length < 3) {
        alert('Please enter at least 3 characters');
        return;
    }
    searchRepositories(query);
});

function searchRepositories(query) {
    const url = `https://api.github.com/search/repositories?q=${query}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            searchResults.innerHTML = '';
            if (data.items.length === 0) {
                searchResults.textContent = 'Nothing found';
            } else {
                data.items.slice(0, 10).forEach(item => {
                    const li = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = item.html_url;
                    link.target = '_blank';
                    link.textContent = item.full_name;
                    li.appendChild(link);
                    const description = document.createElement('p');
                    description.textContent = item.description || '';
                    li.appendChild(description);
                    const language = document.createElement('p');
                    language.textContent = `Language: ${item.language || 'Unknown'}`;
                    li.appendChild(language);
                    searchResults.appendChild(li);
                });
            }
        })
        .catch(error => console.error(error));
}