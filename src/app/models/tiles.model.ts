export interface UserModel {
    idx?: number;
    state?: boolean;
    FullName: string;
    IsSupervisor: boolean;
    UserId: string;
    UserType: string;
    UserInitials?: string;
}

export interface NdoValuesModel {
    Range: string;
    Count: number
}
