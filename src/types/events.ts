import type { EventType } from "../constants/events";

export interface ExtensionEvent {
    type: EventType;
    platform: string;
    timestamp: number;
}