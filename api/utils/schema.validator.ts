import Ajv from 'ajv';

const ajv = new Ajv({ strict: false });

export function validateSchema(schema: object, data: any) {
  const validate = ajv.compile(schema);

  if (!validate(data)) {
    console.error('❌ Schema errors:', validate.errors);
    return false;
  }

  return true;
}
