export interface Page {
    id: number;
    parentId?: number;
    name: string;
    type?: string;
    url?: string;
    icon?: string;
    orderNo?: number;
    description?: string;
    roleChecked?: boolean;
    children: Page[];
}