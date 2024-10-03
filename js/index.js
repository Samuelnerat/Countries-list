function getCountries() {
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then((data) => {
        countryArray = data;
        singleCountry(countryArray);  
    });
}

function singleCountry(countries) {
    let countryName = document.getElementById('main--info');
    let html = "";

    countries.forEach((e) => {
        html += `
        <div class='selected--country'>
            <img src=${e.flags.png} alt=${e.name.common}/>
            <div class="country-info">
                <p class="country">${e.name.common}</p>
                <p class="title"> Population: <span class="name">${e.population}</span></p>
                <p class="title">Region: <span class="name">${e.region}</span></p>
                <p class="title">Capital: <span class="name">${e.capital}</span></p>
            </div>
        </div>
        `;
    });

    countryName.innerHTML = html;


    addCountryClickListener();

    applyDarkMode()
}

function applyDarkMode() {
    const countryInfo = document.querySelectorAll('.country-info');

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

document.querySelector('select').addEventListener('change', function() {
    const selectedRegion = this.value;

    if (selectedRegion === "Filter by Region") {
        getCountries();
    } else {
        fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
        .then(response => response.json())
        .then((data) => {
            singleCountry(data); 
        })
        .catch(error => console.error('Error fetching region data:', error));
    }
});

getCountries();


const darkModeToggle = document.querySelector('.nav--mode');
const body = document.body;
const darkModeIcon = document.getElementById('dark-mode-icon');
const nav = document.querySelector('nav');
const mainInput = document.querySelector('.main--input');
const input = document.querySelector('.input')
const mainSelect = document.querySelector('.main--select select');
const countryInfo = document.querySelectorAll('.country-info');


function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    nav.classList.toggle('dark-mode');
    mainInput.classList.toggle('dark-mode');
    mainSelect.classList.toggle('dark-mode');
    input.classList.toggle('dark-mode');

    const countryInfo = document.querySelectorAll('.country-info');
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
    mainInput.classList.add('dark-mode');
    mainSelect.classList.add('dark-mode');
    input.classList.add('dark-mode');

    countryInfo.forEach(info => {
        info.classList.add('dark-mode');
    });
    
    darkModeIcon.classList.add('fa-solid');
    darkModeIcon.classList.remove('fa-regular');
}

darkModeToggle.addEventListener('click', toggleDarkMode);


function addCountryClickListener() {
    let selectedCountries = document.querySelectorAll('.selected--country');
    
    selectedCountries.forEach((country) => {

        country.addEventListener('click', () => {
            const countryName = country.querySelector('.country').textContent;
            console.log(countryName);
            localStorage.setItem('countryName', countryName); 
            window.location.href = "/repo/pages/singlePage.html"; 
        });
    });
}
