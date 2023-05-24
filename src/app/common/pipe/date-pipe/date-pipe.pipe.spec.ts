// import { DateFormatPipe } from './date-pipe.pipe';

import { DateFormatPipe } from "./date-pipe.pipe";

describe('DateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatPipe(" "," ");
    expect(pipe).toBeTruthy();
  });
});
