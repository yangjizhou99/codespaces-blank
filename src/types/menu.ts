export type Category = '飯類' | '麵類' | '小吃' | '飲品' | '套餐';

export interface MenuItem {
  id: string;
  nameCn: string;
  nameEn: string;
  category: Category;
  price: number; // TWD
  descCn?: string;
  descEn?: string;
  img?: string;     // /img/xxx
  spicy?: 0 | 1 | 2 | 3;
  vegan?: boolean;
  popular?: boolean;
}
