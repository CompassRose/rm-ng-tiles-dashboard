


export enum ImagePath {
    devPathToAssets = '../../assets/images/',
    prodPathToAssets = ''
}


export const flagTypes = [
    { id: 0, name: 'All', metric: 'all' },
    { id: 1, name: 'Exception', metric: 'exception' },
    { id: 2, name: 'Alert', metric: 'alert' },
    { id: 3, name: 'Action', metric: 'action' },
];

export const priorityItems = [
    { id: 0, name: 'Priority', metric: 'priority' },
    { id: 1, name: 'Last Run', metric: 'processDate' },
    { id: 2, name: 'Reviewed', metric: 'reviewed' }
];

export const PathToAssets = ImagePath.devPathToAssets;


export const fareClasses = ['Y', 'D', 'B', 'A', 'Z', 'W', 'U', 'S', 'R', 'I', 'L', 'J', 'H', 'K', 'N', 'Q', 'T', 'O'];
export const days = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct'];

export const blueRamp16 = [
    '#d6dcff',
    '#a9b2fd',
    '#7d89f8',
    '#505ef0',
    '#0030e3',
];

