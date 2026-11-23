// Herda o comportamento de Error (função nativa do js para erros)
export class AppError extends Error {
    public readonly statusCode : number; // Modificador para apenas ler e define como publico (pode acessar fora da classe)
    public readonly isOperational : boolean;  // Modificador para apenas ler e define como publico (pode acessar fora da classe)

    constructor (
        message: string,
        statusCode: number,
        isOperational = true, // valor padrão 
        options?: ErrorOptions
    ) {
        super(message, options);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}