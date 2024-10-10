export interface IContent {
  type: 'heading' | 'paragraph' | 'list' | 'image'|'sub-heading'|'sub-list';
  body: string | string[] | any;
  order?: number;
  beforeQuote?: any;
  quotedText?: any;
  afterQuote?:any;
}
