import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsEdit, News } from './news.interface';
import { CreateNewsDto } from './dto/create.news.dto';
import { renderNewsAll } from '../view/news/news-all';
import { renderTemplate } from '../view/template';
import { CommentsService } from './comments/comments.service';
import { renderNewsDetail } from '../view/news/news-detail';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  getNews() {
    return this.newsService.getAllNews();
  }

  @Get('/all')
  getAllView() {
    const news = this.newsService.getAllNews();
    const content = renderNewsAll(news);

    return renderTemplate(content, {
      title: 'Список новостей',
      description: 'Самые крутые новости на свете',
    });
  }

  @Get('/view/:id')
  getDetailView(@Param('id') id: string) {
    const news = this.newsService.find(id);
    const comments = this.commentsService.find(id);

    const content = renderNewsDetail(news, comments);

    return renderTemplate(content, {
      title: news.title,
      description: news.description,
    });
  }

  @Get('/:id')
  get(@Param('id') id: number) {
    const news = this.newsService.find(id);
    const comments = this.commentsService.find(id);
    return {
      ...news,
      comments,
    };
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
