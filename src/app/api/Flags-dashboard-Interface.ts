import { Injectable } from '@angular/core';
import { isRunningWebView } from "../shared/webview-checker";

//Interface you should be using: Taken from the example Travis is running on the WebInterop project
export interface IFlagsDashboardDotNet {
  //input: userId string simple type
  //output: A serialized JSON of a User object
  GetUser(userId: string): Promise<string>;
  //input: userId string simple type
  //output: A serialized JSON array of Flag objects
  GetAnalystFlags(userId: string): Promise<string>;
  //input: userId string simple type
  //output: A serialized JSON array of Flag objects
  GetSupervisorFlags(userId: string): Promise<string>;
  //input: flagKey numeric simple type
  //output: A serialized JSON array of FlagRun objects
  GetFlagRuns(flagKey: number): Promise<string>;
  //input: flagKey and historyId numeric simple types
  //output: A serialized JSON FlightList object
  GetFlightList(flagKey: number, historyId: number): Promise<string>;
  //input: flagKey numeric simple type
  //output: A serialized JSON array of Review objects
  GetReviews(flagKey: number): Promise<string>;
  //input: userId string simple type
  //output: A serialized JSON FlagChartData object
  GetAnalystFlagChartData(userId: string): Promise<string>;
  //input: userId string simple type
  //output: A serialized JSON FlagChartData object
  GetSupervisorFlagChartData(userId: string): Promise<string>;
  //output: A serialized JSON array of User objects
  GetAllAnalystUsers(): Promise<string>;
  //input: A serialized JSON FlightList object
  //output: True if successful, false if not succesful
  //Note: This method is not yet implemented, can be called, but it won't do anything
  ToOverview(fligtiList: string): Promise<boolean>;

}

@Injectable({
  providedIn: 'root'
})


//Implementation example: Taken from the demo Travis is running on the WebInterop project

export class FlagsDashboardDotNetWrapper implements IFlagsDashboardDotNet {

  private bridge: IFlagsDashboardDotNet = window.chrome.webview.hostObjects.flagsDashboard as IFlagsDashboardDotNet;


  public GetUser(userId: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const result = await this.bridge.GetUser(userId);
      resolve(result);
    });
  }


  public GetAnalystFlags(userId: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const result = await this.bridge.GetAnalystFlags(userId);
      resolve(result);
    });
  }

  public GetSupervisorFlags(userId: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const result = await this.bridge.GetSupervisorFlags(userId);
      resolve(result);
    });
  }

  public GetFlagRuns(flagKey: number): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const result = await this.bridge.GetFlagRuns(flagKey);
      resolve(result);
    });
  }
  public GetFlightList(flagKey: number, historyId: number): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const result = await this.bridge.GetFlightList(flagKey, historyId);
      resolve(result);
    });
  }

  public GetReviews(flagKey: number): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const result = await this.bridge.GetReviews(flagKey);
      resolve(result);
    });
  }
  public GetAnalystFlagChartData(userId: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const result = await this.bridge.GetAnalystFlagChartData(userId);
      resolve(result);
    });
  }
  public GetSupervisorFlagChartData(userId: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const result = await this.bridge.GetSupervisorFlagChartData(userId);
      resolve(result);
    });
  }

  public GetAllAnalystUsers(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const result = await this.bridge.GetAllAnalystUsers();
      resolve(result);
    });
  }


  public ToOverview(fligtList: string): Promise<boolean> {
    console.log('API ToOverview ', fligtList)
    return new Promise<boolean>(async (resolve, reject) => {

      const result = await this.bridge.ToOverview(fligtList);
      console.log('\n\nAPI Returned result ', result)

      resolve(result);
    });
  }
}