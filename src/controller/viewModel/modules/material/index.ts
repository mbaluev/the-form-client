import { injectable } from 'inversify';
import { IMaterialViewModel } from '@viewModel/modules/material/interface';
import { BaseDocumentViewModel } from '@viewModel/modules/baseDocument';

@injectable()
export class MaterialViewModel
  extends BaseDocumentViewModel
  implements IMaterialViewModel
{
  constructor() {
    super();
    this.documentType = 'material';
  }
}
