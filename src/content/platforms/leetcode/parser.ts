import { getQuestionData } from "./datasource";
import type { Problem } from "../../../types/problem";

// export function parseProblem(): Problem | null {
//     const question = getQuestionData();

//     if (!question) {
//         return null;
//     }

//     return {
//         title: question.title,
//         slug: question.titleSlug,
//         difficulty: question.difficulty,
//     };
// }
export function parseProblem(): Problem | null {
    const question = getQuestionData();

    console.log("Question:", question);

    if (!question) {
        console.log("❌ No question found");
        return null;
    }

    console.log("✅ Question found");

    return {
        title: question.title,
        slug: question.titleSlug,
        difficulty: question.difficulty,
    };
}