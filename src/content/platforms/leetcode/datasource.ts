import type { LeetCodeQuestion } from "../../../types/leetcode";
interface ReactQuery {
    queryKey: unknown[];
    state: {
        data: {
            question?: LeetCodeQuestion;
            
        };
    };
}

interface NextData {
    props?: {
        pageProps?: {
            questionData?: LeetCodeQuestion;
            question?: LeetCodeQuestion;
            dehydratedState?: {
                queries?: ReactQuery[];
            };
        };
    };
}

function isLeetCodeQuestion(value: unknown): value is LeetCodeQuestion {
    if (!value || typeof value !== "object") {
        return false;
    }

    const question = value as Partial<LeetCodeQuestion>;

    return (
        typeof question.title === "string" &&
        typeof question.titleSlug === "string" &&
        typeof question.difficulty === "string"
    );
}

function findQuestionData(value: unknown, visited = new Set<object>()): LeetCodeQuestion | null {
    if (!value || typeof value !== "object") {
        return null;
    }

    if (visited.has(value)) {
        return null;
    }

    visited.add(value);

    if (isLeetCodeQuestion(value)) {
        return value;
    }

    if (Array.isArray(value)) {
        for (const item of value) {
            const question = findQuestionData(item, visited);
            if (question) {
                return question;
            }
        }

        return null;
    }

    const record = value as Record<string, unknown>;

    if (isLeetCodeQuestion(record.question)) {
        return record.question;
    }

    for (const key of Object.keys(record)) {
        const question = findQuestionData(record[key], visited);
        if (question) {
            return question;
        }
    }

    return null;
}

function getNextData(): NextData | null {

    const script = document.getElementById("__NEXT_DATA__");

    if (!script?.textContent) {
        return null;
    }

    return JSON.parse(script.textContent) as NextData;
}


export function getQuestionData() {
    const nextData = getNextData();
    console.log("NEXT DATA OBJECT:", nextData);
    console.log("PAGE PROPS:", nextData?.props?.pageProps);

    console.log("NEXT DATA", nextData);

    if (!nextData) {
        return null;
    }

    const question = nextData.props?.pageProps?.questionData
        ?? nextData.props?.pageProps?.question
        ?? nextData.props?.pageProps?.dehydratedState?.queries?.map((query) => query.state.data.question).find(isLeetCodeQuestion)
        ?? findQuestionData(nextData);

    return question ?? null;
}