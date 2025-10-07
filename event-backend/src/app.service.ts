import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Benvenut* nel backend di Lombardia Events!';
  }
}
