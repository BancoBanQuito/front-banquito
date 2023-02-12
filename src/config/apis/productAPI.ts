import EnvManager from "../EnvManager";

//#region ASSOCIATED_SERVICE
export const PUT_ASSOCIATED_SERVICE = () =>
    `${EnvManager.PRODUCT_URL}/api/save-params-data`;

export const POST_ASSOCIATED_SERVICE = () =>
    `${EnvManager.PRODUCT_URL}/api/associatedService`;

export const GET_ASSOCIATED_SERVICE_BY_SERVICE_NAME = (associatedServiceName: string) =>
    `${EnvManager.PRODUCT_URL}/api/params/${associatedServiceName}`;

export const GET_ASSOCIATED_SERVICES = () =>
    `${EnvManager.PRODUCT_URL}/api/associatedServices`;
//#endregion

//#region REQUEST-SERVICE
export const PUT_REQUEST_SERVICE = (codeRequest: string, status: string) =>
    `${EnvManager.PRODUCT_URL}/api/request-service/${codeRequest}/${status}`;

export const GET_REQUEST_SERVICE = () =>
    `${EnvManager.PRODUCT_URL}/api/request-service`;

export const POST_REQUEST_SERVICE = () =>
    `${EnvManager.PRODUCT_URL}/api/request-service`;

export const GET_REQUEST_SERVICE_BY_CODE = (codeRequest: string) =>
    `${EnvManager.PRODUCT_URL}/api/request-service/${codeRequest}`;
//#endregion

//#region PRODUCT_CONTROLLER
export const PUT_PRODUCTS = () =>
    `${EnvManager.PRODUCT_URL}/api/products/product`;

export const POST_PRODUCTS = () =>
    `${EnvManager.PRODUCT_URL}/api/products/product`;

export const PUT_PRODUCTS_LINK = () =>
    `${EnvManager.PRODUCT_URL}/api/products/product-link-service`;

export const GET_PRODUCTS_STATUS = () =>
    `${EnvManager.PRODUCT_URL}/api/products/status-product`;

export const GET_PRODUCTS = () =>
    `${EnvManager.PRODUCT_URL}/api/products/products`;

export const GET_PRODUCT_NAME_PRODUCT = () =>
    `${EnvManager.PRODUCT_URL}/api/products/name-product`;

export const GET_PRODUCT_ID = () =>
    `${EnvManager.PRODUCT_URL}/api/products/id-product`;
//#endregion

//#region ASSOCIATED_SERVICE_PARAM
export const PUT_ASSOCIATED_SERVICE_PARAM = (code: string, name: string) =>
    `${EnvManager.PRODUCT_URL}/api/associatedServiceParam/updateparam/${code}/${name}`;

export const POST_ASSOCIATED_SERVICE_PARAM_ADD_PARAM = (id: string) =>
    `${EnvManager.PRODUCT_URL}/api/associatedServiceParam/addparam/${id}`;

export const POST_ASSOCIATED_SERVICE_PARAM_ADD_PARAM_ACCOUNT = (id: string) =>
    `${EnvManager.PRODUCT_URL}/api/associatedServiceParam/addparam-account/${id}`;

export const GET_ASSOCIATED_SERVICE_PARAM_BY_CODE = (code: string) =>
    `${EnvManager.PRODUCT_URL}/api/associatedServiceParam/associatedServicesParam/${code}`;
//#endregion

//#region PRODUCT_TYPE
export const GET_PRODUCT_TYPES = () =>
    `${EnvManager.PRODUCT_URL}/api/product-types/types`;

export const POST_PRODUCT_TYPES = () =>
    `${EnvManager.PRODUCT_URL}/api/product-types/types`;

export const GET_PRODUCT_TYPE = () =>
    `${EnvManager.PRODUCT_URL}/api/product-types/type`;
//#endregion