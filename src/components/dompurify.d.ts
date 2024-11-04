declare module 'dompurify' {
    export function sanitize(dirty: string, config?: any): string;
    export function setConfig(config: any): void;
    export const config: any;
}
