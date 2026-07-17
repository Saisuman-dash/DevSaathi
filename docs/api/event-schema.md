# Event Schema

Version 0.1

Every event follows the same structure.

{
id,
timestamp,
platform,
sessionId,
type,
payload
}

Example

{
id: "...",

    timestamp: "...",

    platform: "leetcode",

    sessionId: "...",

    type: "PROBLEM_OPENED",

    payload: {
        title: "Two Sum",
        difficulty: "Easy"
    }

}
