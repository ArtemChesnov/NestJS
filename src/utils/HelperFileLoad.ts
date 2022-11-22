import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

const publicPath = './public';

let path: string = publicPath;

export class HelperFileLoad {
  static set path(_path: string) {
    path = publicPath + _path;
  }

  public static customFileName(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) {
    const originalName = file.originalname.split('.');

    const fileExtencion = originalName.at(-1);
    cb(null, `${uuidv4()}.${fileExtencion}`);
  }

  public static imageFileFilter(
    req: any,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      req.fileValidaion;
      return callback(new Error('только картинки'), false);
    }
    callback(null, true);
  }

  public static destinationPath(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) {
    cb(null, path);
  }
}
