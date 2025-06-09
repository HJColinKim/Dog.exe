
const fetchLink = "https://api.thedogapi.com/v1/images/search?api_key="; //No requirement for specific Key, can fulfill the fetch request via general link 

const image = document.querySelector(".actualImage");
const breed = document.querySelector(".breed");
const generateButton = document.querySelector(".button");
const themeToggle = document.querySelector(".switch");
const toast = document.querySelector(".toast");

const header = document.getElementById("header");
let darkMode = false;
const body = document.querySelector('body');

const MAXRETRIES = 5;
let retryCount = 0;

function toastPopup(){
    toast.classList.add("show");
    toast.classList.remove("hidden");

    setTimeout (()=>{
        toast.classList.remove("show");
        toast.classList.add("hidden");
    }, 2000);
}

async function fetchDogDetails(){
    try {
        const response = await fetch(fetchLink);
        const data = await response.json();
        console.log(data[0].breeds[0].name);

        if (data[0].breeds[0].name === undefined){
            breed.textContent = "Breed Details are Unavailable for this Dog!"
        } else {
            breed.textContent = data[0].breeds[0].name; 
        }

        image.src = data[0].url;

        retryCount = 0;
        

    } catch (error){
        if (retryCount<MAXRETRIES){
            retryCount++;
            setTimeout(fetchDogDetails, 1000);
        } else {
            toastPopup();
            console.error("fatal error");
        }
        
    }   
}

generateButton.addEventListener('click', function(){
    fetchDogDetails();
})

themeToggle.addEventListener('change', function(){
    darkMode = !darkMode;
    //Toggle darkmode status 

    if (darkMode){
        body.classList.add("fade-in-colour-dark");
        body.classList.remove("fade-in-colour-light");

        breed.style.color = "white";
        header.style.color = "white";
    } else {
        body.classList.remove("fade-in-colour-dark");
        body.classList.add("fade-in-colour-light");

        breed.style.color = "black";
        header.style.color = "black";
    }


})


