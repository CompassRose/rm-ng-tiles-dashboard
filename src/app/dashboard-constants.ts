


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

export interface ColorObject {
    id?: number;
    key: string;
    value: string[];
}

export const ContinousColors: ColorObject[] = [
    { id: 0, key: 'Blue Green Red', value: ['#0000fd', '#004cfe', '#0292ff', '#01dbff', '#00ffdb', '#00ff95', '#01ff44', '#01ff02', '#48ff00', '#94ff00', '#dcff00', '#ffd302', '#ff9001', '#fc4a00', '#ff0000'] },
    { id: 1, key: 'Red Green Blue', value: ['#ff0000', '#fc4a00', '#ff9001', '#ffd302', '#dcff00', '#94ff00', '#48ff00', '#01ff02', '#01ff44', '#00ff95', '#00ffdb', '#01dbff', '#0292ff', '#004cfe', '#0000fd'] },
    { id: 2, key: 'Red Yellow Green', value: ['#ff3a3a', '#ff6537', '#ff863b', '#fda348', '#fbbd5e', '#f9d478', '#f9ea97', '#fbffb9', '#e1eda2', '#c6db8d', '#abc978', '#8fb865', '#72a752', '#549642', '#328532'] },
    { id: 3, key: 'Blues', value: ['#c4cdff', '#b7c2ff', '#abb7ff', '#9facff', '#93a1ff', '#8795ff', '#7c8aff', '#707eff', '#6472ff', '#5966ff', '#4c59ff', '#404cff', '#323dff', '#212cff', '#0714ff'] },
    { id: 4, key: 'Greens', value: ['#abe7ab', '#a0dc9f', '#94d093', '#89c587', '#7eba7b', '#74af70', '#69a465', '#5e9959', '#538f4e', '#498443', '#3e7a38', '#34702e', '#296523', '#1d5b18', '#10520c'] },
    { id: 5, key: 'Yellow To Green', value: ['#fafa6e', '#e5ec66', '#d0dd5f', '#bccf57', '#a9c050', '#96b249', '#84a442', '#73953b', '#628734', '#53792d', '#436c27', '#355e20', '#275119', '#194413', '#0b370c'] }
];

export const fareClasses = ['Y', 'D', 'B', 'A', 'Z', 'W', 'U', 'S', 'R', 'I', 'L', 'J', 'H', 'K', 'N', 'Q', 'T', 'O'];
export const days = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct'];

export const blueRamp16 = [
    '#d6dcff',
    '#a9b2fd',
    '#7d89f8',
    '#505ef0',
    '#0030e3',
];

