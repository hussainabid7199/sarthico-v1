import * as Yup from 'yup';
import ServiceDataModel from '../models/ServiceDataModel';

const ServiceSchema: Yup.ObjectSchema<ServiceDataModel> = Yup.object().shape({ 
    serviceName: Yup.string().required("Service name is required."),
});

export default ServiceSchema;


