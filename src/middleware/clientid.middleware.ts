import UnauthorizedError from '../exceptions/unauthorized-error';

export default class ClientIdMiddleware {
  verify(req:any, res: any, next: any) {
    const clientId: string = req.headers['clientid'];
    const _clientId = process.env.CLIENT_ID;

    if (!clientId) {
      throw new UnauthorizedError('ClientId header is missing');
    }

    if (clientId !== _clientId) {
      throw new UnauthorizedError('Invalid Client Id');
    }

    req.clientId = clientId;

    // Call next to pass control to the next middleware or route handler
    next();
  }
}
