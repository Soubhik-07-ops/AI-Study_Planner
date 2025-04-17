declare module '.../utils/date-utils' {
    export const calculateDaysRemaining: (dateString: string) => number;
    export const formatDate: (dateString: string) => string;
    export const formatDateWithWeekday: (dateString: string) => string;
    export const calculateStudyHours: (startTime: string, endTime: string) => number;
    export const isToday: (dateString: string) => boolean;
    export const getCurrentTime: () => string;
    export const addMinutesToTime: (time: string, minutes: number) => string;
}