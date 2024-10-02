const countryName = localStorage.getItem('countryName');

// Step 2: Fetch the country data from the API
if (countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayCountryData(data); // Step 3: Display the country data
        })
        .catch(error => console.error('Error fetching country data:', error));
} 

        function displayCountryData(data) {
            const countryInfoDiv = document.getElementById('main--info');
            const country = data[0]; // Assuming you want the first country in the array
        
            // Example of displaying country details
            countryInfoDiv.innerHTML = `
                <div class='country--image'>
                    <img src="${country.flags.png}" alt="${country.name.common}" />
                </div>
        
                <div class="country--general">
                    <h1>${country.name.common}</h1>
                    <div class="country--info">
                        <div>
                            <p class="title">Native Name: <span class="name">${country.name.nativeName ? Object.values(country.name.nativeName).join(', ') : 'N/A'}</span></p>
                            <p class="title">Population: <span class="name">${country.population}</span></p>
                            <p class="title">Region: <span class="name">${country.region}</span></p>
                            <p class="title">Sub Region: <span class="name">${country.subregion ? country.subregion : 'N/A'}</span></p>
                            <p class="title">Capital: <span class="name">${country.capital ? country.capital : 'N/A'}</span></p>
                        </div>
                        <div>
                            <p class="title">Top Level Domain: <span class="name">${country.tld ? country.tld.join(', ') : 'N/A'}</span></p>
                            <p class="title">Currencies: <span class="name">${country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</span></p>
                            <p class="title">Languages: <span class="name">${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</span></p>
                        </div>
                    </div>
                    <div class="border--countries">
                        <p class="title">Border Countries:</p>
                        <p class='border--list'>${country.borders ? country.borders.join(', ') : 'N/A'}</p>
                    </div>
                </div>
            `;

            applyDarkMode()
        }
        


function applyDarkMode() {
    const countryInfo = document.querySelectorAll('.country--info');

    if (body.classList.contains('dark-mode')) {
        countryInfo.forEach(info => {
            info.classList.add('dark-mode'); // Apply dark mode to all country info items
        });
    } else {
        countryInfo.forEach(info => {
            info.classList.remove('dark-mode'); // Remove dark mode if not active
        });
    }
}


const darkModeToggle = document.querySelector('.nav--mode');
const body = document.body;
const darkModeIcon = document.getElementById('dark-mode-icon');
const nav = document.querySelector('nav');



function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    nav.classList.toggle('dark-mode');

    // Re-select countryInfo elements to ensure you get the updated DOM
    const countryInfo = document.querySelectorAll('.country--info');
    countryInfo.forEach(info => {
        info.classList.toggle('dark-mode'); // Ensure this affects all country info items
    });

    darkModeIcon.classList.toggle('fa-solid');
    darkModeIcon.classList.toggle('fa-regular');

    // Save preference to localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}


// Check for saved theme preference and apply it
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    nav.classList.add('dark-mode');

    countryInfo.forEach(info => {
        info.classList.add('dark-mode'); // Apply dark mode to all country info items
    });
    
    darkModeIcon.classList.add('fa-solid');
    darkModeIcon.classList.remove('fa-regular');
    // darkModeText.textContent = 'Light Mode';
}

// Add event listener to the toggle button
darkModeToggle.addEventListener('click', toggleDarkMode);


document.getElementById("back-button").addEventListener("click", function() {
    window.location.href = "../index.html"; // Redirect to index.html
});