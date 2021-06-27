/**
 * @file 存放schema的类
 */

export interface Schema {
    type: string
    children?: { [key: string]: Schema | string }
    comment: string 
    name: string
    attr: { 
        [key: string]: any;
    }
}

const schemas = {};

export function registerSchema(name: string, schema: string) {
    schemas[name] = schema;
}

export function getSchema(name: string): Schema {
    return schemas[name];
}