console.clear();

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

let wrong = "incorrectly answered questions: \n";
let unanswered = "unanswered questions: \n";
for (let i = 0; i < Object.keys(u[0].last_attempt_scores).length; i++) {
    console.log(i + 1, u[0].last_attempt_scores[i]);
    if (u[0].last_attempt_scores[i] == "incorrect") {
        wrong = wrong + (i + 1).toString() + "\n";
    }
    else if (u[0].last_attempt_scores[i] == null) {
        unanswered = unanswered + (i + 1).toString() + "\n";
    }
}


console.log(
    "\n| current %", u[0].correct_percent,
    "\n| answered questions", u[0].questions_answered_count, "/", u[0].questions_count,
    "\n| correctly answered questions", u[0].questions_answered_count * (u[0].correct_percent / 100), "/", u[0].questions_count);

if (wrong != "incorrectly answered questions: \n") console.log("\n" + wrong);
if (unanswered != "unanswered questions: \n") console.log("\n" + unanswered);
