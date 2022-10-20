/* function for load news category  */
const loadNewsCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsCategories(data.data.news_category);
    }
    catch (err) {
        console.log(err);
    }
};

/* function for display news category  */
const displayNewsCategories = (allCategories) => {
    const categoriesContainer = document.getElementById("categories-container")
    allCategories.forEach(category => {
        const li = document.createElement("li");
        li.setAttribute("onclick", `loadCategoryNews(${category.category_id})`)
        li.innerText = `${category.category_name}`;
        categoriesContainer.appendChild(li)
    });
}
/* function for load any specific category news */
const loadCategoryNews = async (categoryId) => {
    document.getElementById("news-container").innerHTML = "";
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryNewes(data.data);
    }
    catch (err) {
        console.log(err)
    }
}
/* function for display news for a specific category */
const displayCategoryNewes = newses => {
    console.log(newses)
    const newsCount = document.getElementById("news-count");
    newsCount.innerHTML = `
                 <p class="py-2 ps-5 bg-secondary text-white">${newses.length > 0 ? `${newses.length} News Found` : "No News Found"}</p>
    `
    /* sort by and news type btn will not shown when no news found in this category */
    if (newses.length < 1) {
        document.getElementById("sort-and-type-btn").innerHTML = "";
    }

    /*  sort by and news type btn created dynamically,will shown only when have 1 or more have in this category */
    else {
        const sortAndTypeBtn = document.getElementById("sort-and-type-btn")
        sortAndTypeBtn.innerHTML = `
                    <div class="d-flex justify-content-evenly align-items-baseline">
                         <label for="disabled-option" class="form-label">Sort By View : </label>
                        <div class = "ms-md-2">
                        <select  id="disabled-option" class="form-select" aria-label="Disabled select example" disabled>
                            <option selected>Default</option>
                            </select>
                        </div>
                    </div>
                    <div class=" d-flex justify-content-between mt-4 mt-md-0">
                            <button type="button" class="btn btn-primary me-md-2 disabled">Today's Pick</button>
                            <button type="button" class="btn btn-outline-primary disabled">Trending</button>
                    </div
        
       
                 `
        newses.sort(function (a, b) {
            return b.total_view - a.total_view
        });
        newses.forEach(news => {
            console.log(news)
            const newsContainer = document.getElementById("news-container");
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
            
    <div class="card">
        <div class="row g-0">
            <div class="col-12 col-md-4">
                <img src=${news.thumbnail_url} class="w-100 h-100 rounded-start" alt="...">
            </div>
            <div class="col-12 col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    </div>
            
            `
        newsContainer.appendChild(div)
        })


    }

};


loadNewsCategories();