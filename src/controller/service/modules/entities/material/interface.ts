import { ParsedUrlQuery } from 'querystring';
import { IMaterialDTO, IMaterialUserDTO } from '@model/entities/material';

export interface IMaterialService {
  getMaterials: (query?: ParsedUrlQuery) => Promise<IMaterialDTO[] | undefined>;
  getMaterial: (id?: string, query?: ParsedUrlQuery) => Promise<IMaterialDTO | undefined>;
  saveMaterial: (data: IMaterialDTO) => Promise<IMaterialDTO | undefined>;
  deleteMaterials: (ids: string[]) => Promise<boolean | undefined>;

  // --- user
  getMaterialsUser: (query?: ParsedUrlQuery) => Promise<IMaterialUserDTO[] | undefined>;
  getMaterialUser: (id?: string, query?: ParsedUrlQuery) => Promise<IMaterialUserDTO | undefined>;
  updateMaterialUser: (id: string) => Promise<boolean | undefined>;
}
