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

export default interface IClientService {
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

  init: (baseUrl?: string) => void;
}
