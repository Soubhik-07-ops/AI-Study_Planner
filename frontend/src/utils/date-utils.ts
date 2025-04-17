/**
 * Utility functions for date calculations and formatting
 */

/**
 * Calculates days remaining until a target date
 * @param dateString - Target date in ISO format (YYYY-MM-DD)
 * @returns Number of days remaining (rounded up)
 */
export const calculateDaysRemaining = (dateString: string): number => {
    const targetDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const diffTime = targetDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
};

/**
 * Formats a date string into a human-readable format
 * @param dateString - Date in ISO format (YYYY-MM-DD)
 * @returns Formatted date string (e.g., "Jan 1, 2023")
 */
export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

/**
 * Formats a date with weekday
 * @param dateString - Date in ISO format
 * @returns Formatted string (e.g., "Monday, Jan 1")
 */
export const formatDateWithWeekday = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });
};

/**
 * Calculates study hours between two times
 * @param startTime - Start time in "HH:MM" format
 * @param endTime - End time in "HH:MM" format
 * @returns Duration in hours (e.g., 1.5)
 */
export const calculateStudyHours = (startTime: string, endTime: string): number => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const startTotal = startHours * 60 + startMinutes;
    const endTotal = endHours * 60 + endMinutes;

    return (endTotal - startTotal) / 60;
};

/**
 * Checks if a date is today
 * @param dateString - Date in ISO format
 * @returns Boolean indicating if the date is today
 */
export const isToday = (dateString: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();

    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

/**
 * Gets the current time in "HH:MM" format
 * @returns Current time string
 */
export const getCurrentTime = (): string => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

/**
 * Adds minutes to a time string
 * @param time - Base time in "HH:MM" format
 * @param minutes - Minutes to add
 * @returns Resulting time string
 */
export const addMinutesToTime = (time: string, minutes: number): string => {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;

    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMins = totalMinutes % 60;

    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
};