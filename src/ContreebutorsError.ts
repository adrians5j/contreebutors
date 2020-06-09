export type ConstructorArgs = {
    message: string;
    type?: "warning" | "error";
    data?: any;
};

export class ContreebutorsError {
    message: string;
    type: "warning" | "error";
    data: any;
    constructor(args: ConstructorArgs) {
        this.message = args.message;
        this.type = args.type || "error";
        this.data = args.data;
    }
}
