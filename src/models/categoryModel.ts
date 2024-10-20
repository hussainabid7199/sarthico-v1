export default interface CategoryValidationModel {
  categoryName: string;
  isActive?: boolean;
  subCategories?: SubCategoryValidationModel[];
}

export interface SubCategoryValidationModel {
  subCategoryName?: string;
  isActive?: boolean;
}
