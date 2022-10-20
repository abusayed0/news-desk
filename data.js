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



loadNewsCategories();