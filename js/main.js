let newsList = [];
const apiKey = "8a9aeb002d724b2789a5c6d2d9f212e8";
const loadNews = async () => {
    let url = `https://newsapi.org/v2/everything?q=korea&apiKey=${apiKey}`
    let data = await fetch(url)
    let result = await data.json();
    newsList = result.articles
    let articles = newsList.map(articleData);
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = render(articles);
}

function render(articles) {
    return articles.reduce(function (result, article) {
        result += `
        <article>
            <h2><a class="article-header" href="${article.url}">${article.title}</a></h2>
            <div class="row">
                <div class="col-md-4">
                    <img class="img-fluid rounded mb-3" src="${article.img}"  />
                </div>
                <div class="col-md-8">
                    <p class="date">${article.date}</p>
                    <p class="author">by ${article.author}</p>
                    <div>${article.description}</div>
                    <a class="btn-more" href="${article.url}">Read More</a>
                </div>
            </div>
        </article>		
        `;
        return result;
    }, '');
}

function articleData(item) {
    return {
        url: item.url,
        title: item.title,
        author: item.author,
        date: item.publishedAt,
        img: item.urlToImage ? item.urlToImage : null,
        description: item.description
    };
}

loadNews();