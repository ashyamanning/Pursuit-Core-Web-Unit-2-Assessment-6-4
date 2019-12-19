document.addEventListener("DOMContentLoaded", async () => {
    let select = document.querySelector("select");
    let form = document.querySelector("form");
    let userInput = document.querySelector("#userInput");
    let submit = document.querySelector("submit");
    let filmInfo = document.querySelector("#filmInfo");
    let ul = document.querySelector("#submittedReview");

    const getMovie = async () => {
        try {
            filmInfo.innerHTML = "";
            let res = await axios.get("https://ghibliapi.herokuapp.com/films");
            let movieArr = res.data;
            movieArr.forEach(movie => {
                let option = document.createElement("option");
                option.innerText = movie.title;
                select.appendChild(option);
            })
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }
    
    getMovie();

    select.addEventListener("change", async (e) => {
        // select.value = e.target.value;
        let movie = await getMovie();
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
        // let review = document.createElement("li");
        // review.innerText = e.target.value;
        // ul.appendChild(review);
    })
})