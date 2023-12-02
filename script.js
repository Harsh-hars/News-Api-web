
const news = async (page, search_value) => {
    console.log("running");
    const result = await fetch(
        "https://newsapi.org/v2/everything?" +
        "&q=" + search_value +
        "&from=2023-11-09" +
        "&pageSize=20" +
        "&page=" + page +
        "&sortBy=popularity" +
        "&apiKey=4cc524fdd1f04af09235bba1d1eccd83"
    );

    const data = await result.json();
    // console.log(data);


    document.querySelector(".mera_card").innerHTML = data.articles.map((item) => {
        return `
   <div class="card" style="width: 18rem;">
   <img class="card-img-top" src="${item.urlToImage}" alt="Card image cap ">
   <div class="card-body">
     <h5 class="card-title">${item.title}</h5>
     <p class="card-text">${item.description.substr(0, 50)}</p>
     <a href="${item.url}" class="btn btn-primary d-flex justify-content-center">Read-more</a>
   </div>
   </div>
   `
    })


}

let page_value = 1;
news(page_value, "trending");

const prev = document.querySelector(".previous_btn");
const next = document.querySelector(".next_btn");

next.addEventListener('click', () => {
    console.log("running next");
    if (page_value >= 1 && page_value <= 5) {
        page_value++;
        news(page_value);
    }
})
prev.addEventListener('click', () => {
    console.log("previous running");
    if (page_value >= 2) {
        page_value--;
        news(page_value);
    }
})

// search value
const searchbtn = document.getElementById("search_btn");
const searchbox = document.getElementById("search_box");
let container = document.querySelector(".container");
searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("event running");
    // try {
    const search_input = searchbox.value.trim();
    console.log(search_input)

    //     container.innerHTML = news(page_value, search_input);
    //     console.log(news(page_value, search_input))

    // } catch (error) {
    //     console.log(error)
    // }
    news(page_value, search_input);
})

const business = document.getElementById("business");
const health = document.getElementById("health");
const science = document.getElementById("science");

const category_news = async (category) => {
    const result = await fetch("https://newsapi.org/v2/top-headlines/sources?category="+category+
    "&apiKey=4cc524fdd1f04af09235bba1d1eccd83");
   console.log("category news")
    const data = await result.json();
    console.log(data)
    document.querySelector(".mera_card").innerHTML = data.sources.map((item) => {
        return `
   <div class="card" style="width: 18rem;">
   <div class="card-body">
     <h5 class="card-title">${item.name}</h5>
     <p class="card-text">${item.description.substr(0, 50)}</p>
     <a href="${item.url}" class="btn btn-primary d-flex justify-content-center">Read-more</a>
   </div>
   </div>
   `
    })
}
business.addEventListener('click',()=>{
    category_news("business");
})
health.addEventListener('click',()=>{
    category_news("health");
})
science.addEventListener('click',()=>{
    category_news("science");
})