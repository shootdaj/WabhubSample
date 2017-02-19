import { WabhubSamplePage } from './app.po';

describe('wabhub-sample App', () => {
  let page: WabhubSamplePage;

  beforeEach(() => {
    page = new WabhubSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
