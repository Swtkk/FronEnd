export interface Todo{
    id: number;
    description: string;
    done: boolean;
    targetDate: Date;
}

export interface FormikValues{
    description: string;
    targetDate: string;
}