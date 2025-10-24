export class AppError extends Error {
  constructor(
    public message: string,
    public status = 400,
    public code = 'BAD_REQUEST'
  ) { super(message); }
}
