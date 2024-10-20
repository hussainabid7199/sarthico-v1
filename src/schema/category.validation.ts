import * as Yup from 'yup';
import CategoryValidationModel from '../models/categoryModel';

const CategoryValidationSchema: Yup.ObjectSchema<CategoryValidationModel> = Yup.object({
  categoryName: Yup.string().required('Category name is required'),
  isActive: Yup.boolean(),
  subCategories: Yup.array()
    .of(
      Yup.object({
        subCategoryName: Yup.string(),
        isActive: Yup.boolean()
      })
    )
});

export default CategoryValidationSchema;
