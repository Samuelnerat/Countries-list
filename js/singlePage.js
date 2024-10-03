const countryName = localStorage.getItem('countryName');

if (countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayCountryData(data);
        })
        .catch(error => console.error('Error fetching country data:', error));
} 

        function displayCountryData(data) {
            const countryInfoDiv = document.getElementById('main--info');
            const country = data[0]; // Assuming you want the first country in the array
        
            // Display country details
            countryInfoDiv.innerHTML = `
                <div class='country--image'>
                    <img src="${country.flags.png}" alt="${country.name.common}" />
                </div>
        
                <div class="country--general">
                    <h1>${country.name.common}</h1>
                    <div class="country--info">
                        <div>
                            <p class="title">Native Name: <span class="name">${country.name.nativeName ? Object.values(country.name.nativeName).map(n => n.official).join(', ') : 'N/A'}</span></p>
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
                        <div id="border-country-list"></div>
                    </div>
                </div>
            `;
        
            const borderCountryList = document.getElementById('border-country-list');
            if (country.borders && country.borders.length > 0) {
                country.borders.forEach(border => {
                    const borderItem = document.createElement('p');
                    borderItem.classList.add('border--item');
                    borderItem.textContent = border;
                    borderItem.style.cursor = 'pointer';
                    borderItem.addEventListener('click', () => {
                        fetchBorderCountry(border); 
                    });
                    borderCountryList.appendChild(borderItem);
                });
            } else {
                borderCountryList.innerHTML = '<p>N/A</p>';
            }
        
            applyDarkMode();
        }

        function fetchBorderCountry(borderCountryCode) {
            fetch(`https://restcountries.com/v3.1/alpha/${borderCountryCode}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    displayCountryData(data); 
                })
                .catch(error => console.error('Error fetching border country data:', error));
        }

        


function applyDarkMode() {
    const countryInfo = document.querySelectorAll('.country--info');

    if (body.classList.contains('dark-mode')) {
        countryInfo.forEach(info => {
            info.classList.add('dark-mode'); 
        });
    } else {
        countryInfo.forEach(info => {
            info.classList.remove('dark-mode'); 
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

    const countryInfo = document.querySelectorAll('.country--info');
    countryInfo.forEach(info => {
        info.classList.toggle('dark-mode'); 
    });

    darkModeIcon.classList.toggle('fa-solid');
    darkModeIcon.classList.toggle('fa-regular');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    nav.classList.add('dark-mode');

    countryInfo.forEach(info => {
        info.classList.add('dark-mode'); 
    });
    
    darkModeIcon.classList.add('fa-solid');
    darkModeIcon.classList.remove('fa-regular');
}

darkModeToggle.addEventListener('click', toggleDarkMode);


document.getElementById("back-button").addEventListener("click", function() {
    window.location.href = "../index.html";
});