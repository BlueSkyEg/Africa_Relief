export interface IContent {
  type: 'heading' | 'paragraph' | 'list';
  body: string | string[] ;
  order?: number;
}
