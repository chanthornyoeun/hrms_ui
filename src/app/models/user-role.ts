export interface UserRole {
    userId: number;
    roles: { id: number | null, roleId: number }[];
}
