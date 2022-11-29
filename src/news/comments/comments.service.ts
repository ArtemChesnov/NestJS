import { Injectable } from '@nestjs/common';
import { Comments, Comment, CommentEdit } from './comments.interface';
import { getRandomInt } from '../news.service';

@Injectable()
export class CommentsService {
  private readonly comments: Comments = {
    1: [
      {
        id: 123,
        message: 'Мой первый комментарий',
        author: 'Вася',
        createdAt: new Date(),
        updatedAt: new Date(),
        cover:
          'https://i.pinimg.com/originals/c7/8a/1f/c78a1ff26086681a2712a0477504b785.jpg',
      },
    ],
    2: [
      {
        id: 114,
        message: 'Мой первый комментарий',
        author: 'Артем',
        createdAt: new Date(),
        updatedAt: new Date(),
        cover:
          'https://i.pinimg.com/originals/c7/8a/1f/c78a1ff26086681a2712a0477504b785.jpg',
      },
    ],
  };

  find(newsId: string | number): Comment[] | string {
    if (this.comments[newsId]) {
      return this.comments[newsId];
    }

    return 'Комменатрии не найдены';
  }

  create(newsId: string | number, comment: Comment): Comment {
    const id = getRandomInt(0, 10000) as string | number;

    if (!this.comments[newsId]) {
      this.comments[newsId] = [];
    }

    this.comments[newsId].push({
      id,
      ...comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return comment;
  }

  edit(
    newsId: string | number,
    commentId: string | number,
    comment: CommentEdit,
  ): boolean | Comment | string {
    if (!this.comments[newsId]) {
      return false;
    }
    const indexComment = this.comments[newsId].findIndex(
      (comment) => comment.id === +commentId,
    );
    if (commentId === -1) {
      return false;
    }

    if (this.comments[newsId][indexComment]) {
      this.comments[newsId][indexComment] = {
        ...this.comments[newsId][indexComment],
        ...comment,
      };

      return 'Комментарий изменен!';
    }

    return 'Комментарий не найден!';
  }

  remove(
    newsId: string | number,
    commentId: string | number,
  ): null | Comment[] {
    if (!this.comments[newsId]) {
      return null;
    }

    const indexComment = this.comments[newsId].findIndex(
      (comment) => comment.id === +commentId,
    );
    if (commentId === -1) {
      return null;
    }

    return this.comments[newsId].splice(indexComment, 1);
  }
}
