export interface Page {
    id: number;
    parentId: number;
    name: string;
    type: string;
    url: string;
    orderNo: number;
    description: string;
    children?: Page[];
}