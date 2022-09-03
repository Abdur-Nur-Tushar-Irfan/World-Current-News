const loadData = (category_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(response => response.json())
        .then(data => setData(data.data.news_category))

}
const setData = (data) => {
    const header = document.getElementById('header');





    data.forEach(element => {
        console.log(element)
        const listDiv = document.createElement("li");
        listDiv.classList.add("nav-item");
        listDiv.innerHTML = `
        <a onclick="categoryNewsLoad('${element.category_id}')" class="nav-link active" aria-current="page">${element.category_name}</a>
        `;
        header.appendChild(listDiv);


    });
}
const categoryNewsLoad = (category_id) => {
    const spinnerSection = document.getElementById("loader");
    spinnerSection.classList.remove("d-none");

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => showCategoryNews(data.data));
};

const showCategoryNews = (categoryNews) => {
    console.log(categoryNews);
    const card = document.getElementById("category-news");

    card.textContent = "";

    const catagoryNumber = document.getElementById('category-number')
    catagoryNumber.innerHTML = `<h4 class=" text-success">Total ${categoryNews.length} news found ${name}</h4>`;



    categoryNews.forEach(element => {
        const { thumbnail_url, title, details, _id, author, total_view } = element;
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("col");
        cardDiv.innerHTML = `
        <div class="card mb-3 container" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img class="w-100 h-100" src="${thumbnail_url}" class="img-fluid rounded-start h-100" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.slice(0, 50) + '...'}</p >
                    <div class="d-flex justify-content-around" >
                    <div class="d-flex gap-3 ">

                    <img class='img'class="h-50 w-50 rounded-circle" src="${author.img}">
                    

                    
                    <p class="card-text"><small class="text-muted">${author.name === null ? "No author found" : author.name}</p>
                    <p class="mt-1">${total_view === null ? "No views" : total_view}</p>
                    
                    
                    </div>
                   <button onclick="showCategoryDetails('${_id}')" type="button" class="btn btn-primary justify-content-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Details
</button>
                    
                    
                    
                    
                    
                    </div>
                </div >
                
            </div >
            
        </div >
    </div >

    `
        card.appendChild(cardDiv);


        console.log(element);

    })
    const spinnerSection = document.getElementById("loader");
    spinnerSection.classList.add("d-none");




};
const showCategoryDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => categoryDetails(data.data[0]));
};
const categoryDetails = (details) => {
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = details.title;
    const detail = document.getElementById('details')
    detail.innerHTML = `
    <img class="w-100" src="${details.thumbnail_url}">
    
    
    `


    console.log(details);
};





categoryNewsLoad();
loadData();