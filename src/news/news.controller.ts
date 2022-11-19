import {Body, Controller, Delete, Get, Param, Post, Patch} from '@nestjs/common';
import {NewsService} from "./news.service";
import {NewsEdit, News} from "./news.interface";

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {
    }

    @Get()
    getNews() {
        return this.newsService.getAllNews();
    }

    @Get('/:id')
    get(@Param('id') id: number) {
        const news = this.newsService.find(id);
        return {
            ...news,
        }
    }

    @Post()
    create(@Body() createNewsDto: News) {
        return this.newsService.create(createNewsDto);
    }

    @Patch('/:id')
    edit(@Param('id') id: number, @Body() news: NewsEdit) {
        return this.newsService.edit(id, news);
    }


    @Delete('/:id')
    remove(@Param('id') id: string) {
        const isRemoved = this.newsService.remove(id);

        return isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор!';
    }
}


