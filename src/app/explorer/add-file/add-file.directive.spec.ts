import { ViewContainerRefMock } from '../../../util/view-container-ref.mock';
import { AddFileDirective } from './add-file.directive';

describe('ExplorerAddFileDirective', () => {
  it('should create an instance', () => {
    const directive = new AddFileDirective(new ViewContainerRefMock());
    expect(directive).toBeTruthy();
  });
});
