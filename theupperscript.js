let link = window.location.href
    .replace("/en/exams", "/qlearn/v1/schedule")
    .split("/questions")[0] + "/usage";

let headers = new Headers({
    "Authorization": "Token xd31sYEPWvR+ZWzJlLoMMqTr2XooH2uRZ5zKHDSkRyppdEB4116XvMRUp+RC3/6h1hbRzD/la4+pK6/4WeCVxw=="
});

let response = await fetch(link,
    {
        headers: headers,
        method: "GET"
    });

let u = await response.json();

console.log("[" + link + "]\n\n");

let unanswered = "un: ";
for (let i = 0; i < Object.keys(u[0].last_attempt_scores).length; i++) {
    console.log(i + 1, u[0].last_attempt_scores[i]);
    if (u[0].last_attempt_scores[i] == null) {
        unanswered = unanswered + (i + 1).toString() + ", ";
    }
}

console.log("\n%", u[0].correct_percent, ": a", u[0].questions_count, "/", u[0].questions_answered_count, ": c", u[0].questions_answered_count * (u[0].correct_percent / 100), "/", u[0].questions_count);
if (unanswered != "un: ") console.log(unanswered);
