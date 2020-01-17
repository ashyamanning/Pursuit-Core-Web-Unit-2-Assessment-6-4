document.addEventListener("DOMContentLoaded", async () => {
    let select = document.querySelector("select");
    let form = document.querySelector("form");
    let userInput = document.querySelector("#userInput");
    let submit = document.querySelector("submit");
    let filmInfo = document.querySelector("#filmInfo");
    let ul = document.querySelector("#submittedReview");

    const getMovies = async () => {
        try {
            filmInfo.innerHTML = "";
            let res = await axios.get("https://ghibliapi.herokuapp.com/films");
            let movieArr = res.data;
            movieArr.forEach((movie, i) => {
                let option = document.createElement("option");
                option.innerText = movie.title;
                option.value = i;
                // option.setAttribute("data-release-date", movie.release_date);
                // option.setAttribute("data-description", movie.description);
                select.appendChild(option);
            })
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }
    
    getMovies();

    select.addEventListener("change", async (e) => {
        // select.value = e.target.value;
        console.log(e.target.value);
        let movieArr = await getMovies();
        let movie = movieArr[e.target.value];
        let title = document.createElement("h3");
        title.innerText = movie.title;
        filmInfo.appendChild(title);
        let releaseYear = document.createElement("p");
        releaseYear.innerText = movie.release_date;
        filmInfo.appendChild(releaseYear);
        let description = document.createElement("p");
        description.innerText = movie.description;
        filmInfo.appendChild(description);
    })

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    })

    submit.addEventListener("click", (e) => {
        let review = document.createElement("li");
        review.innerText = e.target.value;
        ul.appendChild(review);
    })
})