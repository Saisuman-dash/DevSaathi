let sessionStart: number | null = null;
let currentProblem: string | null = null;

export function startSession(problemSlug: string) {
    sessionStart = Date.now();
    currentProblem = problemSlug;

    console.log("🟢 Session Started:", problemSlug);
}

export function endSession() {
    if (!sessionStart || !currentProblem) return;

    const duration = Math.floor((Date.now() - sessionStart) / 1000);

    console.log("🔴 Session Ended");

    console.table({
        problem: currentProblem,
        duration: `${duration}s`,
    });

    sessionStart = null;
    currentProblem = null;
}