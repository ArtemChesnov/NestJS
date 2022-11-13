import {Get, Injectable} from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';

export interface News {
    id?: string;
    title: string;
    description: string;
    author: string;
    countViews?: number;
}

@Injectable()
export class NewsService {
    private readonly news: News[] = [
        {
            id: '1',
            title: 'Наша первая новость',
            description: 'Ура! Наща первая новость!',
            author: 'Артём',
            countViews: 3,
        }
    ]

    getAllNews(): News[] {
        return this.news;
    }

    find(id: News['id']): News | undefined {
        return this.news.find(news => news.id === id)
    }

    create(news: News): News {
        const newId = uuidv4();

        const newNews = {
            ...news,
            id: newId,
        }
        this.news.push(newNews);
        return newNews;
    }

    remove(id: string) {
        const indexRemoveNews = this.news.findIndex((news => news.id === id))
        if (indexRemoveNews !== -1) {
            this.news.splice(indexRemoveNews, 1)
            return true
        }
        return false
    }
}



