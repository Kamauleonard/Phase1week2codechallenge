document.addEventListener('DOMContentLoaded', () => {
    const beerMenu = document.getElementById('beer-list');
    const beerDetails = document.querySelector('.beer-details');

    function displayBeerDetails(beerData) {
        const { name, image_url, description, reviews } = beerData;

        document.getElementById('beer-name').textContent = name;
        document.getElementById('beer-image').src = image_url;
        document.getElementById('beer-description').textContent = description;

        const reviewList = document.getElementById('review-list');
        reviewList.innerHTML = '';

        reviews.forEach((reviewText) => {
            const reviewItem = document.createElement('li');
            reviewItem.textContent = reviewText;
            reviewList.appendChild(reviewItem);
        });

        const descriptionForm = document.getElementById('description-form');
        descriptionForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const newDescription = document.getElementById('description').value.trim();
            if (newDescription !== '') {
                document.getElementById('beer-description').textContent = newDescription;
            }
        });
    }

    function fetchBeerDetails(beerId) {
        fetch(`http://localhost:3000/beers/${beerId}`)
            .then((response) => response.json())
            .then((data) => {
                displayBeerDetails(data);
            });
    }

    function fetchAllBeers() {
        fetch('http://localhost:3000/beers')
            .then((response) => response.json())
            .then((data) => {
                populateBeerMenu(data);
                if (data.length > 0) {
                    fetchBeerDetails(data[0].id);
                }
            });
    }

    function populateBeerMenu(beers) {
        beers.forEach((beer) => {
            const menuItem = document.createElement('li');
            menuItem.textContent = beer.name;
            menuItem.addEventListener('click', () => {
                fetchBeerDetails(beer.id);
            });
            beerMenu.appendChild(menuItem);
        });
    }

    function updateBeerDescription(beerId, newDescription) {
        // You can add the server update logic here if needed.
    }

    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const reviewText = document.getElementById('review').value.trim();
        if (reviewText !== '') {
            const reviewList = document.getElementById('review-list');
            const reviewItem = document.createElement('li');
            reviewItem.textContent = reviewText;
            reviewList.appendChild(reviewItem);
            document.getElementById('review').value = '';
        }
    });

    fetchAllBeers();
});
