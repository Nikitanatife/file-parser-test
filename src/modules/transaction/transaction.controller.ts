import { Controller, Get, HttpCode } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly _transactionService: TransactionService) {}

  // нарахувати працівникам, які відправили на благодійність понад 100$, винагорода одноразово еквівалентна їхньому вкладу, з пулу в 10,000$.
  //  (якщо працівник відправив 200 $ з загальної суми пожертвувань в 1000 $, він повинен отримати 20% від 10,000 $)
  //  (внески працівників у сумі менше 100$ враховуються у загальну суму, але самі працівники не отримують винагороду)
  //  - додати по 100 $ працівникам з відділу з найбільшою сумою пожертв на людину
  @Get('/donations')
  @HttpCode(200)
  async getDonations() {
    return this._transactionService.getDonations();
  }
}
