
export interface News {
    id: string | number;
    title: string;
    description: string;
    author: string;
    countView?: number;
}

export type AllNews = Record<string | number, News>;

export type NewsEdit = Partial<Omit<News, 'id'>>;