import { DateFormatPipe } from "./date-pipe.pipe";

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe('en-US');
  });

  it('should transform the date value into the expected format', () => {
    const value = '2023-05-17';
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toBe('May 17th');
  });

  it('should handle null values', () => {
    const value = null;
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toBeNull();
  });

  it('should handle empty values', () => {
    const value = '';
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toBeNull();
  });

  it('should handle undefined values', () => {
    const value = undefined;
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toBeNull();
  });

  it('should handle invalid date values', () => {
    const value = 'invalid-date';
    const transformedValue = pipe.transform(value);
    expect(transformedValue).toBeNull();
  });

  it('should handle different locales', () => {
    const value = '2023-05-17';
    const frenchPipe = new DateFormatPipe('fr-FR');
    const transformedValue = frenchPipe.transform(value);
    expect(transformedValue).toBe('mai 17th');
  });
});