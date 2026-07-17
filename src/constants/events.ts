export const EVENTS = {
    PLATFORM_CONNECTED: "PLATFORM_CONNECTED",
} as const;

export type EventType = typeof EVENTS[keyof typeof EVENTS];