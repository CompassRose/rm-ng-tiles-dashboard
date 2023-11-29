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
    airlineCode: string;
    departureDate: string;
    flightLine: string;
    odMasterkey: number;
}

export interface FlagRuns {
    airlineCode: string;
    departureDate: string;
    flightLine: string;
    odMasterkey: number;
}


export interface FlagRunFlights {
    id: number;
    value: ApiFlightValues;
}

export interface ApiFlightValues {
    boxContents: BoxContent;
    flights: EachFlights[];
}

export interface ApiFlagRun {
    flagKey: number
    flightCount: number;
    historyId: number;
    processDate: string;
}

export interface FlagRunDev {
    flagKey: number
    flightCount: number;
    historyId: number;
    processDate: string;
    flights?: any;
}

export interface BoxContent {
    shortNames: string;
    suffixes: string;
}

export interface EachFlights {
    flagKey: number;
    flightCount: number;
    historyId: number
    processDate: string;
}

export interface FlightContents {
    airlineCode: string;
    departureDate: string;
    flightLine: string;
    odMasterkey: number;
}

export interface FlagList {
    flagKey: number;
    flagType: number;
    flagTypeName?: string;
    flightCount: number;
    name: string;
    priority: number;
    processDate: string;
    reviewed: boolean;
    flagRuns?: any;
}
