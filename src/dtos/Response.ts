export default interface Response<T>{
    message: string,
    statusCode: number,
    data: T
}