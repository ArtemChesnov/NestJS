import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment, CommentEdit } from './comments.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { HelperFileLoad } from '../../utils/HelperFileLoad';
import { diskStorage } from 'multer';

const PATH_NEWS = '/static/';
HelperFileLoad.path = PATH_NEWS;

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/:newsId')
  get(@Param('newsId') newsId: string | number) {
    return this.commentsService.find(newsId);
  }

  @Post('/:newsId')
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
    @Param('newsId') newsId: string | number,
    @Body() comment: Comment,
    @UploadedFile() cover: Express.Multer.File,
  ) {
    if (cover?.filename) {
      comment.cover = PATH_NEWS + cover.filename;
    }
    return this.commentsService.create(newsId, comment);
  }

  @Patch('/:newsId/:commentId')
  edit(
    @Param('newsId') newsId: string | number,
    @Param('commentId') commentId: string | number,
    @Body() comment: CommentEdit,
  ) {
    return this.commentsService.edit(newsId, commentId, comment);
  }

  @Delete('/:newsId/:commentId')
  remove(
    @Param('newsId') newsId: string | number,
    @Param('commentId') commentId: string | number,
  ) {
    return this.commentsService.remove(newsId, commentId);
  }
}
