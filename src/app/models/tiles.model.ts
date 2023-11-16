export interface UserModel {
    fullName: string;
    IsSupervisor: boolean;
    userId: string;
    UserType?: string;
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
