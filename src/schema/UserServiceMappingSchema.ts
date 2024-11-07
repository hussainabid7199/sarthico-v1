import * as Yup from "yup";
import UserServiceMappingModel from "../models/UserServiceMappingModel";

const UserServiceMappingSchema: Yup.ObjectSchema<UserServiceMappingModel> =
  Yup.object().shape({
    serviceId: Yup.number().required("Service is required"),
    userId: Yup.number().required("User is required"),
  });

export default UserServiceMappingSchema;
