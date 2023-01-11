import { ParsedUrlQuery } from 'querystring';
import { IMaterialDTO } from '@model/material';

export interface IMaterialService {
  getMaterials: (
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IMaterialDTO[] | undefined>;
  getMaterial: (
    id?: string,
    query?: ParsedUrlQuery,
    token?: string | null
  ) => Promise<IMaterialDTO | undefined>;
  saveMaterial: (
    data: IMaterialDTO,
    token?: string | null
  ) => Promise<IMaterialDTO | undefined>;
  deleteMaterials: (
    ids: string[],
    token?: string | null
  ) => Promise<boolean | undefined>;
}
