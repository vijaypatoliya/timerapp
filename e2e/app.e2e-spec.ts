import { TmwAppPage } from './app.po';

describe('tmw-app App', function() {
  let page: TmwAppPage;

  beforeEach(() => {
    page = new TmwAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
