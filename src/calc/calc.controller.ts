import {Controller, Query, Put, Headers, Patch} from '@nestjs/common';
import {CalcService} from "./calc.service";

@Controller('calc')
export class CalcController {
    constructor(private readonly calcService: CalcService) {
    }

    @Put()
    async calculate(
        @Query('firstNumber') firstNumber: number,
        @Query('lastNumber') lastNumber: number,
        @Headers('Type-Operation') operation: string,
    ): Promise<number | string> {
        console.log(firstNumber, lastNumber);
        if (operation && typeof operation === 'string') {
            if (['plus', 'minus', 'multiply', 'divide'].includes(operation)) {
                return this.calcService[operation](firstNumber, lastNumber)
            }
            return 'Передан не верный оператор!'
        }
        return 'Оператор не был передан!'
    }

    @Patch()
    async calc(
        @Headers('Type-Operation') operation: string,
        @Query('firstNumber') firstNumber: number,
        @Query('lastNumber') lastNumber: number,
    ): Promise<number | string> {
        console.log(firstNumber, lastNumber);
        if (operation && typeof operation === 'string') {
            if (['plus', 'minus', 'multiply', 'divide'].includes(operation)) {
                return this.calcService[operation](firstNumber, lastNumber)
            }
            return 'Передан не верный оператор!'
        }
        return 'Оператор не был передан!'
    }
}
