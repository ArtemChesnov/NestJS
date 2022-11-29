import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseInterceptors,
  UploadedFile,
  Render,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsEdit, News } from './news.interface';
import { CreateNewsDto } from './dto/create.news.dto';
// import { renderNewsAll } from '../view/news/news-all';
// import { renderTemplate } from '../view/template';
import { CommentsService } from './comments/comments.service';
// import { renderNewsDetail } from '../view/news/news-detail';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoad } from '../utils/HelperFileLoad';

const PATH_NEWS = '/static/';
HelperFileLoad.path = PATH_NEWS;

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  @Render('news-list')
  getNews() {
    const news = this.newsService.getAllNews();
    return { news: news };
  }

  @Get('all')
  @Render('news-list')
  getAll() {
    const news = this.newsService.getAllNews();

    return { news };
  }

  @Get(':id/detail')
  @Render('news-detail')
  getDetailView(@Param('id') id: string) {
    const news = this.newsService.find(id);
    const comments = this.commentsService.find(id);

    return {
      news,
      comments,
    };
  }

  // @Get(':id')
  // get(@Param('id') id: number) {
  //   const news = this.newsService.find(id);
  //   const comments = this.commentsService.find(id);

  //   return {
  //     news,
  //     comments,
  //   };
  // }

  @Post('add')
  @UseInterceptors(
    FileInterceptor('cover', {
      fileFilter: HelperFileLoad.imageFileFilter,
      storage: diskStorage({
        destination: HelperFileLoad.destinationPath,
        filename: HelperFileLoad.customFileName,
      }),
    }),
  )
  create(
    @Body() news: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ) {
    if (cover?.filename) {
      news.cover = PATH_NEWS + cover.filename;
    }

    return this.newsService.create(news);
  }

  @Get('create/news')
  @Render('create-news')
  async createView() {
    return {};
  }

  @Patch(':id')

  edit(@Param('id') id: number, @Body() news: NewsEdit) {
    return this.newsService.edit(id, news);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const isRemoved = this.newsService.remove(id);

    return isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор!';
  }
}
