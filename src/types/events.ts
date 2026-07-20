export interface ExtensionEvent {

    type: string;

    platform: string;

    timestamp: number;

    result?: string;

    runtime?: string;

    memory?: number;

    totalCorrect?: number;

    totalTestcases?: number;

    submissionId?: string;
}