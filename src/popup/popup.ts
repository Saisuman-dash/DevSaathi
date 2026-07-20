const API = "http://127.0.0.1:8000";

async function loadTodayStats() {
    try {

        const response = await fetch(`${API}/analytics/today`);
        const data = await response.json();

        document.getElementById("problems")!.textContent = data.problems;
        document.getElementById("easy")!.textContent = data.easy;
        document.getElementById("medium")!.textContent = data.medium;
        document.getElementById("hard")!.textContent = data.hard;

        document.getElementById("solved")!.textContent = data.solved;
        document.getElementById("attempts")!.textContent = data.attempts;
        document.getElementById("accuracy")!.textContent = `${data.accuracy}%`;

        const minutes = Math.floor(data.time / 60000);

        document.getElementById("time")!.textContent = `${minutes} min`;

    } catch (err) {
        console.error(err);
    }
}

async function loadHistory() {

    try {

        const response = await fetch(`${API}/analytics/history`);

        const sessions = await response.json();

        const history = document.getElementById("history")!;

        history.innerHTML = "";

        if (sessions.length === 0) {

            history.innerHTML = `
                <div class="card">
                    No sessions yet.
                </div>
            `;

            return;
        }

        sessions.reverse().forEach((session: any) => {

            const mins = Math.floor(session.duration / 60000);

            const status = session.solved ? "✅" : "❌";

            history.innerHTML += `
                <div class="card">

                    <div>

                        <strong>${status} ${session.title}</strong>

                        <br>

                        <small>
                            ${session.difficulty}
                            • Attempts: ${session.attempts}
                        </small>

                    </div>

                    <div>
                        ${mins} min
                    </div>

                </div>
            `;
        });

    } catch (err) {
        console.error(err);
    }
}

async function refresh() {

    await loadTodayStats();

    await loadHistory();

}

refresh();

setInterval(refresh, 5000);