import { injectable } from 'inversify';
import { BaseDocumentViewModel } from '@viewModel/modules/baseDocument';
import { ITaskViewModel } from '@viewModel/modules/task/interface';

@injectable()
export class TaskViewModel
  extends BaseDocumentViewModel
  implements ITaskViewModel
{
  constructor() {
    super();
    this.documentType = 'task';
  }
}
