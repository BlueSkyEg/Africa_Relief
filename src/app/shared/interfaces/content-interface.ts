export interface IContent {
  type: 'heading' | 'paragraph' | 'list'|'image';
  body: string | string[] |any;
  order?: number;
}
