// let postTitle = document.getElementById('post-title');
// let postBody = document.getElementById('post-body');
// let postForm = document.getElementById('post-form');
// let newArray = [];

// postForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     createPost()
// })


// function getPosts() {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(response => response.json())
//   .then((data) => {
//       newArray = data
//       addedPosts()
//     })
// }

// function addedPosts() {
//     console.log(newArray)
//     let postLayout = document.getElementById('post-layout')
//       let html = "";
//       newArray.forEach((e, index) => {
//         html += `
//         <div class="pickedPosts col-md-4 mb-3">
//             <div class="card h-100">
//                 <div class="card-body">
//                     <div class=" d-flex justify-content-end">
//                         <h6 class="text-dark">${index + 1}</h6>
//                     </div>
//                     <h5 class="post-title mb-4">${e.title}</h5>
//                     <p class="post-body">${e.body}</p>
//                 </div>
//             </div>
//         </div>
//         `
//       })
//       postLayout.innerHTML = html
//       upPost()

// }


// function upPost() {
//     let pickedPosts = document.querySelectorAll('.pickedPosts')
//     console.log(pickedPosts)
//     pickedPosts.forEach((e, index) => {
//         e.addEventListener('click', () => {
//             console.log(index)
//             localStorage.setItem('postNumber', index + 1)
//             window.location.href = 'post.html';
//         })
//     })
// }

// getPosts()






// let countryArray = [];

// function getCountries () {
//     fetch('https://restcountries.com/v3.1/all')
//     .then(response => response.json())
// .then((data) =>{
//     countryArray = data
//     // console.log(data);
//     singleCountry()
// })
// }

// function singleCountry () {
//     // console.log(countryArray)
//     let countryName = document.getElementById('main--info')
//     let html = "";
//     countryArray.forEach((e, index) => {
//         html += `
//         <div>
//             <img src=${e.flags.png} alt=${e.name.common}/>
//             <div class="country-info">
//                 <p class="country">${e.name.common}</p>
//                 <p class="title"> Population: <span class="name">${e.population}</span></p>
//                 <p class="title">Region: <span class="name">${e.region}</span></p>
//                 <p class="title">Capital: <span class="name">${e.capital}</span></p>
//             </div>
//         </div>
//         `
//     })

//     countryName.innerHTML = html
// }

// getCountries()


// const darkModeToggle = document.querySelector('.nav--mode');
// const body = document.body;
// const nav = document.nav
// const darkModeIcon = document.getElementById('dark-mode-icon');
// const darkModeText = document.getElementById('dark-mode-text');

function getCountries() {
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then((data) => {
        countryArray = data;
        singleCountry(countryArray);  // Display all countries initially
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
            info.classList.add('dark-mode'); // Apply dark mode to all country info items
        });
    } else {
        countryInfo.forEach(info => {
            info.classList.remove('dark-mode'); // Remove dark mode if not active
        });
    }
}

// Event listener for region filtering
document.querySelector('select').addEventListener('change', function() {
    const selectedRegion = this.value;

    if (selectedRegion === "Filter by Region") {
        // Display all countries if no specific region is selected
        getCountries(); // Re-fetch all countries when no specific region is selected
    } else {
        // Fetch countries by region using the region-specific API
        fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
        .then(response => response.json())
        .then((data) => {
            singleCountry(data);  // Display the filtered countries
        })
        .catch(error => console.error('Error fetching region data:', error));
    }
});

getCountries();





// Get references to the DOM elements
const darkModeToggle = document.querySelector('.nav--mode');
const body = document.body;
const darkModeIcon = document.getElementById('dark-mode-icon');
// const darkModeText = document.getElementById('dark-mode-text');
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

    // Re-select countryInfo elements to ensure you get the updated DOM
    const countryInfo = document.querySelectorAll('.country-info');
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
    mainInput.classList.add('dark-mode');
    mainSelect.classList.add('dark-mode');
    input.classList.add('dark-mode');

    countryInfo.forEach(info => {
        info.classList.add('dark-mode'); // Apply dark mode to all country info items
    });
    
    darkModeIcon.classList.add('fa-solid');
    darkModeIcon.classList.remove('fa-regular');
    // darkModeText.textContent = 'Light Mode';
}

// Add event listener to the toggle button
darkModeToggle.addEventListener('click', toggleDarkMode);



// // Function to add click listeners to country elements
function addCountryClickListener() {
    let selectedCountries = document.querySelectorAll('.selected--country');
    
    selectedCountries.forEach((country) => {
        // country.addEventListener('click', () => {
        //     const countryName = country.querySelector('.country').textContent; // Get the country name from the clicked element
        //     console.log(countryName);
        //     localStorage.setItem('countryName', countryName); // Save the country name in localStorage
        //     window.location.href = '../html/singlePage.html'; // Redirect to the desired page
        // });

        country.addEventListener('click', () => {
            const countryName = country.querySelector('.country').textContent; // Get the country name from the clicked element
            console.log(countryName); // Check this console log
            localStorage.setItem('countryName', countryName); // Save the country name in localStorage
            window.location.href = '../html/singlePage.html'; // Redirect to the desired page
        });
    });
}


// Function to toggle dark mode
// function toggleDarkMode() {
//     body.classList.toggle('dark-mode');
//     nav.classList.toggle('dark-mode');
//     mainInput.classList.toggle('dark-mode');
//     mainSelect.classList.toggle('dark-mode');
//     input.classList.toggle('dark-mode');
    
//     countryInfo.forEach(info => {
//         info.classList.toggle('dark-mode'); // Ensure this affects all country info items
//     });

//     darkModeIcon.classList.toggle('fa-solid');
//     darkModeIcon.classList.toggle('fa-regular');

//     // Change the text accordingly
//     if (body.classList.contains('dark-mode')) {
//         // darkModeText.textContent = 'Light Mode';
//         localStorage.setItem('theme', 'dark'); // Save the preference to localStorage
//     } else {
//         // darkModeText.textContent = 'Dark Mode';
//         localStorage.setItem('theme', 'light'); // Save the preference to localStorage
//     }
// }

// function toggleDarkMode() {
//     body.classList.toggle('dark-mode');
//     nav.classList.toggle('dark-mode');
//     mainInput.classList.toggle('dark-mode');
//     mainSelect.classList.toggle('dark-mode');
//     input.classList.toggle('dark-mode');

//     // Re-select countryInfo elements to ensure you get the updated DOM
//     const countryInfo = document.querySelectorAll('.country-info');
//     countryInfo.forEach(info => {
//         info.classList.toggle('dark-mode'); // Ensure this affects all country info items
//     });

//     darkModeIcon.classList.toggle('fa-solid');
//     darkModeIcon.classList.toggle('fa-regular');

//     // Change the text accordingly
//     if (body.classList.contains('dark-mode')) {
//         localStorage.setItem('theme', 'dark'); // Save the preference to localStorage
//     } else {
//         localStorage.setItem('theme', 'light'); // Save the preference to localStorage
//     }
// }


// function clickCountry () {
//     let selectedCountry =document.querySelectorAll('.selected--country');
//     console.log(selectedCountry)
//     selectedCountry.forEach(country, name => {
//         country.addEventListener('clcik', () => {
//             console.log(name)
//             localStorage.setItem('countryName', name)
//             window.location.href = '../html/singlePage.html';
//         })
//     })
// }

// function clickCountry() {
//     let selectedCountries = document.querySelectorAll('.selected--country');
//     console.log(selectedCountries);

//     selectedCountries.forEach((country) => {
//         country.addEventListener('click', () => { // Fixed 'clcik' to 'click'
//             const countryName = country.textContent; // Get the country name from the element
//             console.log(countryName);
//             localStorage.setItem('countryName', countryName); // Save the country name in localStorage
//             window.location.href = '../html/singlePage.html'; // Redirect to the desired page
//         });
//     });
// }


// function singleCountry(countries) {
//     let countryName = document.getElementById('main--info');
//     let html = "";

//     countries.forEach((e) => {
//         html += `
//         <div class='selected--country'>
//             <img src=${e.flags.png} alt=${e.name.common}/>
//             <div class="country-info">
//                 <p class="country">${e.name.common}</p>
//                 <p class="title"> Population: <span class="name">${e.population}</span></p>
//                 <p class="title">Region: <span class="name">${e.region}</span></p>
//                 <p class="title">Capital: <span class="name">${e.capital}</span></p>
//             </div>
//         </div>
//         `;
//     });

//     countryName.innerHTML = html;

//     // Add click event listener for each country element
//     addCountryClickListener();

//     applyDarkMode();
// }




// // Function to toggle dark mode
// // function toggleDarkMode() {
// //     body.classList.toggle('dark-mode');
// //     darkModeIcon.classList.toggle('fa-solid');
// //     darkModeIcon.classList.toggle('fa-regular');

// //     // Change the text accordingly
// //     if (body.classList.contains('dark-mode')) {
// //         darkModeText.textContent = 'Light Mode';
// //         localStorage.setItem('theme', 'dark'); // Save the preference to localStorage
// //     } else {
// //         darkModeText.textContent = 'Dark Mode';
// //         localStorage.setItem('theme', 'light'); // Save the preference to localStorage
// //     }
// // }

// // Check for saved theme preference and apply it
// // const savedTheme = localStorage.getItem('theme');
// // if (savedTheme === 'dark') {
// //     body.classList.add('dark-mode');
// //     nav.classList.add('dark-mode');
// //     darkModeIcon.classList.add('fa-solid');
// //     darkModeIcon.classList.remove('fa-regular');
// //     darkModeText.textContent = 'Light Mode';
// // }

// Add event listener to the toggle button
// darkModeToggle.addEventListener('click', toggleDarkMode);