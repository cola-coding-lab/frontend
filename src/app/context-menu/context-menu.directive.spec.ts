import { ViewContainerRefMock } from '../../util/view-container-ref.mock';
import { ContextMenuDirective } from './context-menu.directive';

describe('ContextMenuDirective', () => {
  it('should create an instance', () => {
    const directive = new ContextMenuDirective(new ViewContainerRefMock());
    expect(directive).toBeTruthy();
  });
});
