interface IDepartment {
  id: number;
  name: string;
}

export interface ITransaction<AmountType> {
  id: number;
  amount: AmountType;
  date: string;
}

interface IStatement {
  statement: ITransaction<number>;
}

interface IEmployee {
  employee: {
    id: number;
    name: string;
    surname: string;
    department: IDepartment;
    salary: IStatement[];
    [donation: string]: unknown | ITransaction<string>;
  };
}

interface IRate {
  rate: {
    date: string;
    sign: string;
    value: number;
  };
}

export interface FileInterface {
  e_list: IEmployee[];
  rates?: IRate[];
}
