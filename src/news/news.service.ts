import { Get, Injectable } from '@nestjs/common';
import { AllNews, News, NewsEdit } from './news.interface';
// import { CreateNewsDto } from './dto/create.news.dto';

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

@Injectable()
export class NewsService {
  private readonly news: AllNews = {
    1: {
      id: 1,
      title: 'Наша первая новость',
      description: 'Ура! Наша первая новость!',
      author: 'Артём',
      countView: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      cover:
        'https://i.pinimg.com/originals/c7/8a/1f/c78a1ff26086681a2712a0477504b785.jpg',
    },
    2: {
      id: 1,
      title: 'Наша вторая новость',
      description: 'Ура! Наша вторая новость!',
      author: 'Вася',
      countView: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      cover:
        'https://i.pinimg.com/originals/c7/8a/1f/c78a1ff26086681a2712a0477504b785.jpg',
    },
    3: {
      id: 1,
      title: 'Наша третья новость',
      description: 'Ура! Наша третья новость!',
      author: 'Тема',
      countView: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      cover:
        'https://i.pinimg.com/originals/c7/8a/1f/c78a1ff26086681a2712a0477504b785.jpg',
    },
  };

  getAllNews(): AllNews {
    return this.news;
  }

  find(id: number | string): News | undefined {
    return this.news[id];
  }

  create(news: News): News {
    const id = getRandomInt(0, 10000) as string | number;
    const newNews: News = {
      id: '1',
      ...news,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.news[id] = newNews;

    return newNews;
  }

  edit(id: number | string, newsEdit: NewsEdit): News | string {
    if (this.news[id]) {
      this.news[id] = {
        ...this.news[id],
        ...newsEdit,
      };

      return this.news[id];
    }

    return 'Новость не найдена!';
  }

  remove(id: number | string): boolean {
    if (this.news[id]) {
      delete this.news[id];

      return true;
    }

    return false;
  }
}
