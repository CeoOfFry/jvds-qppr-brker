let link = window.location.href
	.replace('/en/assignments', '/qlearn/v1/schedule')
	.replace('topics', 'topic')
	.split('/questions')[0] + '/contents';

let headers = new Headers({
	'Authorization': 'Token xd31sYEPWvR+ZWzJlLoMMqTr2XooH2uRZ5zKHDSkRyppdEB4116XvMRUp+RC3/6h1hbRzD/la4+pK6/4WeCVxw=='
});

let response = fetch(link, {
	headers: headers,
	method: 'GET'
});





let commits = await response.json();

for (let i = 0; i < commits.number_of_questions; i++) {

	let _q = commits.questions[i];

	console.log("\nQ", (i + 1), "(" + _q.answer_type + ")" + "\n> [" + _q.plain_text + "]");

	switch (_q.answer_type) {
		case "multiple_choice":
			{
				for (let j = 0; j < Object.keys(_q.choices).length; j++) {

					let _ch = _q.choices[j];

					if (_ch.correct)
						console.log("c	|", (j + 1), _ch.body[0].text);
					else
						console.log("w	|", (j + 1), _ch.body[0].text);
				}
			}
			break;

		case "exact_value":
			{
				let _ch = _q.choices[0]
				console.log("	|The text is \"" + _ch.body[0].text + "\"");
				console.log("	|(case sensitive: " + _q.case_sensitive + ")");
			}
			break;

		case "grouped_choices":
			{
				console.log("	Question type still unsupported.");
			}
			break;

		case "correct_order":
			{
				console.log("	Question type still unsupported.");
			}
			break;

		case "categorise":
			{
				for (let j = 0; j < Object.keys(_q.choices).length; j++) {

					let _ch = _q.choices[j];

					for (let z = 0; z < Object.keys(_q.answer_categories).length; z++) {

						let _cat = _q.answer_categories[z];
						if (_cat.id == _ch.answer_category_id) {
							console.log("	| " + _ch.body[0].text + ": " + _cat.section.text)
						}
					}
				}
			}
			break;

		default:
			{
				console.log("	Question type either invalid or unsupported.");
			}
			break;
	}
}

console.log("\n/!\\ NOTE: CHOICES MAY NOT BE IN ORDER /!\\");
console.log("cheat made with love by Javed");
