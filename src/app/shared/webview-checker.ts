// needed to get the window.chrome.webview check to work
declare global {
  // noinspection JSUnusedGlobalSymbols
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chrome?: any;
  }
}

export function isRunningWebView(): boolean {
  console.log('isRunningWebView  ', window.chrome.webview)
  return (!!window.chrome && !!window.chrome.webview);
}
