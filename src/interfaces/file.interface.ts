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

export interface FileInterface {
  e_list: IEmployee[];
}
