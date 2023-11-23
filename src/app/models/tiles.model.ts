export interface UserModel {
    fullName: string;
    IsSupervisor: boolean;
    userID: string;
    UserType?: string;

}

export interface ApiUserModel {
    fullName: string;
    IsSupervisor: boolean;
    userID: string;
    UserType?: string;
    state?: boolean;
    lastName?: string;
}


export interface NdoValuesModel {
    Range: string;
    Count: number
}

export interface FlagRuns {
    flagKey: number;
    flightCount: number;
    historyId: number
    processDate: string;
    flights?: any[];
}

export interface FlagList {
    flagKey: number;
    flagType: number;
    flightCount: number;
    name: string;
    priority: number;
    processDate: string;
    reviewed: boolean;
    flagRuns?: any;
}
