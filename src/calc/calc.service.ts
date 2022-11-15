import {Injectable} from '@nestjs/common';

@Injectable()
export class CalcService {

    plus(firstNumber: number, lastNumber: number): number {
        return Number(firstNumber) + Number(lastNumber);
    }

    minus(firstNumber: number, lastNumber: number): number {
        return firstNumber - lastNumber;
    }

    multiply(firstNumber: number, lastNumber: number): number {
        return firstNumber * lastNumber;
    }

    divide(firstNumber: number, lastNumber: number): number {
        return firstNumber / lastNumber;
    }
}
