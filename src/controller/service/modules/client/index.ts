import { inject, injectable } from 'inversify';
import { API } from '@api/ids';
import type IAxiosApi from '@api/modules/axios/interface';
import type IClientService from '@service/modules/client/interface';
import {
  AzureResourcesClient,
  B2CSupportClient,
  BusinessPartnersClient,
  CacheClient,
  CountriesClient,
  CustomAttributesClient,
  DbMigrationClient,
  EntityTypesClient,
  FilesClient,
  ImportsClient,
  KubernetesClient,
  PriceListsClient,
  ProductsClient,
  ProductVariantsClient,
  SupplierPriceListItemsClient,
  TenantConfigsClient,
  MediaClient,
  TenantIntegrationsClient,
  TenantCspIntegrationsClient,
  TenantBusinessPartnersClient,
  T1TenantsClient,
} from '@service/modules/client/api';

@injectable()
export class ClientService implements IClientService {
  @inject(API.Axios) private axiosApi!: IAxiosApi;

  AzureResources: AzureResourcesClient;

  B2CSupport: B2CSupportClient;

  BusinessPartners: BusinessPartnersClient;

  Cache: CacheClient;

  Countries: CountriesClient;

  CustomAttributes: CustomAttributesClient;

  DbMigration: DbMigrationClient;

  EntityTypes: EntityTypesClient;

  Files: FilesClient;

  Imports: ImportsClient;

  Kubernetes: KubernetesClient;

  PriceLists: PriceListsClient;

  Products: ProductsClient;

  ProductVariants: ProductVariantsClient;

  SupplierPriceListItems: SupplierPriceListItemsClient;

  TenantConfigs: TenantConfigsClient;

  Media: MediaClient;

  TenantIntegrations: TenantIntegrationsClient;

  TenantCspIntegrations: TenantCspIntegrationsClient;

  TenantBusinessPartners: TenantBusinessPartnersClient;

  T1Tenants: T1TenantsClient;

  constructor() {
    this.AzureResources = new AzureResourcesClient();
    this.B2CSupport = new B2CSupportClient();
    this.BusinessPartners = new BusinessPartnersClient();
    this.Cache = new CacheClient();
    this.Countries = new CountriesClient();
    this.CustomAttributes = new CustomAttributesClient();
    this.DbMigration = new DbMigrationClient();
    this.EntityTypes = new EntityTypesClient();
    this.Files = new FilesClient();
    this.Imports = new ImportsClient();
    this.Kubernetes = new KubernetesClient();
    this.PriceLists = new PriceListsClient();
    this.Products = new ProductsClient();
    this.ProductVariants = new ProductVariantsClient();
    this.SupplierPriceListItems = new SupplierPriceListItemsClient();
    this.TenantConfigs = new TenantConfigsClient();
    this.Media = new MediaClient();
    this.TenantIntegrations = new TenantIntegrationsClient();
    this.TenantCspIntegrations = new TenantCspIntegrationsClient();
    this.TenantBusinessPartners = new TenantBusinessPartnersClient();
    this.T1Tenants = new T1TenantsClient();
  }

  init = (baseUrl?: string) => {
    this.AzureResources = new AzureResourcesClient(baseUrl, this.axiosApi.api);
    this.B2CSupport = new B2CSupportClient(baseUrl, this.axiosApi.api);
    this.BusinessPartners = new BusinessPartnersClient(
      baseUrl,
      this.axiosApi.api
    );
    this.Cache = new CacheClient(baseUrl, this.axiosApi.api);
    this.Countries = new CountriesClient(baseUrl, this.axiosApi.api);
    this.CustomAttributes = new CustomAttributesClient(
      baseUrl,
      this.axiosApi.api
    );
    this.DbMigration = new DbMigrationClient(baseUrl, this.axiosApi.api);
    this.EntityTypes = new EntityTypesClient(baseUrl, this.axiosApi.api);
    this.Files = new FilesClient(baseUrl, this.axiosApi.api);
    this.Imports = new ImportsClient(baseUrl, this.axiosApi.api);
    this.Kubernetes = new KubernetesClient(baseUrl, this.axiosApi.api);
    this.PriceLists = new PriceListsClient(baseUrl, this.axiosApi.api);
    this.Products = new ProductsClient(baseUrl, this.axiosApi.api);
    this.ProductVariants = new ProductVariantsClient(
      baseUrl,
      this.axiosApi.api
    );
    this.SupplierPriceListItems = new SupplierPriceListItemsClient(
      baseUrl,
      this.axiosApi.api
    );
    this.TenantConfigs = new TenantConfigsClient(baseUrl, this.axiosApi.api);
    this.Media = new MediaClient(baseUrl, this.axiosApi.api);
    this.TenantIntegrations = new TenantIntegrationsClient(
      baseUrl,
      this.axiosApi.api
    );
    this.TenantCspIntegrations = new TenantCspIntegrationsClient(
      baseUrl,
      this.axiosApi.api
    );
    this.TenantBusinessPartners = new TenantBusinessPartnersClient(
      baseUrl,
      this.axiosApi.api
    );
    this.T1Tenants = new T1TenantsClient(baseUrl, this.axiosApi.api);
  };
}
