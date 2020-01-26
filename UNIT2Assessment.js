document.addEventListener("DOMContentLoaded", async () => {
    let select = document.querySelector("select");
    let form = document.querySelector("form");
    let userInput = document.querySelector("#userInput");
    let filmInfo = document.querySelector("#filmInfo");
    let ul = document.querySelector("#submittedReview");
    let errorMessage = document.createElement("p");

    const getMovies = async () => {
        try {
            filmInfo.innerHTML = "";
            let res = await axios.get("https://ghibliapi.herokuapp.com/films");
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }
    
    const setSelectOptions = async () => {
        let movieArr = await getMovies();
        movieArr.forEach((movie, i) => {
            let option = document.createElement("option");
            option.innerText = movie.title;
            option.value = i;
            // option.setAttribute("data-release-date", movie.release_date);
            // option.setAttribute("data-description", movie.description);
            select.appendChild(option);
        })
    }

    setSelectOptions();

    let movie;

    select.addEventListener("change", async (e) => {
        let movieArr = await getMovies();
        movie = movieArr[e.target.value];
        let title = document.createElement("h3");
        title.innerText = movie.title;
        filmInfo.appendChild(title);
        let releaseYear = document.createElement("p");
        releaseYear.innerText = movie.release_date;
        filmInfo.appendChild(releaseYear);
        let description = document.createElement("p");
        description.innerText = movie.description;
        filmInfo.appendChild(description);
        // ul.innerHTML = "";
    })

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (userInput.value && movie.title) {
            errorMessage.innerText = "";
            let review = document.createElement("li");
            review.innerText = `${movie.title}: ${userInput.value}`;
            userInput.value = "";
            ul.appendChild(review);
        } else {
            errorMessage.innerText = "Please enter a valid review!"
            ul.appendChild(errorMessage);

        }
        
    })

    // submit.addEventListener("click", () => {
    //     // select.value = e.currentTarget.value;
    //     // console.log(e.currentTarget);
    //     let review = document.createElement("li");
    //     review.innerText = `${movie.title}: ${userInput.value}`;
    //     ul.appendChild(review);
    //     userInput.value = "";
    // })
})