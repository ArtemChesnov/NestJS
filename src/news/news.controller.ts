import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {News, NewsService} from "./news.service";

@Controller('news')
export class NewsController {
    constructor(private readonly newService: NewsService) {
    }

    @Get()
    getNews() {
        return this.newService.getAllNews();
    }

    @Get('/:id')
    get(@Param('id') id: string) {
        return this.newService.find(id);
    }


    @Post()
    create(@Body() creteNewsDto: News) {
        return this.newService.create(creteNewsDto);
    }


    @Delete('/:id')
    remove(@Param('id') id: string) {
        const isRemoved = this.newService.remove(id);

        return isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор!';
    }


}


