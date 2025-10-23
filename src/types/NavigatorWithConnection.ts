export default interface NavigatorWithConnection extends Navigator {
    connection?: {
        effectiveType?: string;
        downlink?: number;
        rtt?: number;
        saveData?: boolean;
    };
    mozConnection?: NavigatorWithConnection['connection'];
    webkitConnection?: NavigatorWithConnection['connection'];
}
