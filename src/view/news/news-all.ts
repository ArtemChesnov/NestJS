import { AllNews, News } from '../../news/news.interface';

export const renderNewsAll = (news: AllNews): string => {
  let newsListHtml: string = '';
  for (const newsItem in news) {
    newsListHtml += renderNewsBlock(news[newsItem]);
  }
  return `
    <h1 style="text-align: center">Список новостей</h1>
    <div class="row row-cols-3 m-2">
        ${newsListHtml}
    </div>
    `;
};

export const renderNewsBlock = (news: News) => {
  return `<div class="col-lg-4 mb-2">
        <div class="card">
             <img src=${news.cover} class="card-img-top" alt="cat" style="height: 200px; object-fit: cover" />
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${news.author}</h6>
                <p class="card-text">${news.description}</p>
            </div>
        </div>  
    </div>
    `;
};
