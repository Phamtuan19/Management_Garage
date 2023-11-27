import * as yup from 'yup';

const ROLES = ['ADMIN', 'USER', '*'] as const;

export const RolesSchema = yup.string().oneOf(ROLES);

export type RolePropsType = yup.InferType<typeof RolesSchema>;

export default ROLES;
