export class AuthenticatedRequest extends Request {
    user?: {
        userId: number;
        username: string;
    };
}
