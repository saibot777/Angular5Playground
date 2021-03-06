import { BookModel } from './book.model';
import * as faker from 'faker';

describe('BookModel', () => {
  let image: string;
  let title: string;
  let description: string;
  let price: number;
  let upvotes: number;

  let book: BookModel;

  beforeEach(() => {
    image = faker.image.image();
    title = faker.lorem.sentence();
    description = faker.lorem.sentence();
    price = faker.commerce.price();
    upvotes = faker.random.number();
    this.book = new BookModel(image, title, description, price, upvotes);

    let storage = {};

    spyOn(window.localStorage, 'getItem').and.callFake((key: string): string => {
      return storage[key] || null;
    });

    spyOn(window.localStorage, 'removeItem').and.callFake((key: string): any => {
      delete storage[key];
    });

    spyOn(window.localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return storage[key] = <string>value;
    });

    spyOn(window.localStorage, 'clear').and.callFake(() => {
      storage = {};
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('is the save method working', () => {
    this.book.save();
    const bookFromStorage: BookModel = BookModel.find(this.book.title);
    expect(this.book).toEqual(bookFromStorage);
  });

  it('are the find and save methods working', () => {
    this.book.save();
    const bookFromStorage: BookModel = BookModel.find(this.book.title);
    expect(this.book).toEqual(bookFromStorage);
  });

  it('is the destroy method working', () => {
    this.book.save();
    this.book.destroy();
    const bookFromStorage: BookModel = BookModel.find(this.book.title);
    expect(bookFromStorage).not.toBeTruthy();
    expect(bookFromStorage).toEqual(null || undefined);
  });

  it('is localeStorage working', () => {
    expect(localStorage.setItem('key', 'value')).toBe('value');
    expect(localStorage.getItem('key')).toBe('value');
  });

  it('has a valid model', () => {
    expect(this.book.image).toEqual(image);
    expect(this.book.title).toEqual(title);
    expect(this.book.description).toEqual(description);
    expect(this.book.price).toEqual(price);
    expect(this.book.upvotes).toEqual(upvotes);
  });
});
