import { Ng2RtlTreeviewPage } from './app.po';

describe('ng2-rtl-treeview App', function() {
  let page: Ng2RtlTreeviewPage;

  beforeEach(() => {
    page = new Ng2RtlTreeviewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
