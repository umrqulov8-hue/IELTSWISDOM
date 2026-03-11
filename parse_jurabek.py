import json
from bs4 import BeautifulSoup
import re

html_path = r"C:\Users\umrqu\Downloads\Telegram Desktop\IELTSwithJurabek FULL Reading 2.html"
with open(html_path, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

passages = []
for i in range(1, 4):
    content_div = soup.find("div", id=f"passage{i}")
    # clean up the content div, remove container specifics if any
    content = "".join(str(c) for c in content_div.contents).strip()
    passages.append(content)

# We know the answers from the script block in the HTML:
# Passage 1 – Clipper Races (Q1–13)
# q1: "FALSE", q2: "TRUE", q3: "TRUE", q4: "NOT GIVEN", q5: "FALSE", q6: "FALSE",
# q7: "sails", q8: "storms", q9: "Challenger", q10: "ports", q11: "paperwork", q12: "tugs", q13: "money",
# Passage 2 – Orientation of birds (Q14–26)
# q14: "visual memory", q15: "migration direction", q16: "destination", q17: "landmarks", q18: "albatross",
# q19: "C", q20: "B", q21: "C", q22: "G", q23: "C", q24: "F", q25: "A", q26: "D",
# Passage 3 – Accidents in business (Q27–40)
# q27: "YES", q28: "NO", q29: "NO", q30: "YES", q31: "NOT GIVEN",
# q32: "F", q33: "G", q34: "C", q35: "A",
# q36: "B", q37: "D", q38: "A", q39: "C", q40: "B"

answers = {
    1: "FALSE", 2: "TRUE", 3: "TRUE", 4: "NOT GIVEN", 5: "FALSE", 6: "FALSE",
    7: "sails", 8: "storms", 9: "Challenger", 10: "ports", 11: "paperwork", 12: "tugs", 13: "money",
    14: "visual memory", 15: "migration direction", 16: "destination", 17: "landmarks", 18: "albatross",
    19: "C", 20: "B", 21: "C", 22: "G", 23: "C", 24: "F", 25: "A", 26: "D",
    27: "YES", 28: "NO", 29: "NO", 30: "YES", 31: "NOT GIVEN",
    32: "F", 33: "G", 34: "C", 35: "A",
    36: "B", 37: "D", 38: "A", 39: "C", 40: "B"
}

# Instead of fully automated parsing of questions, I'll generate the TS code by printing it structured.
# Since there are only 40 questions, we can format them.

questions_ts = []

for p_idx in range(1, 4):
    q_panel = soup.find("div", id=f"p{p_idx}_questionsPanel")
    groups = q_panel.find_all("div", class_="question-group")
    
    for group in groups:
        title = group.find("div", class_="question-group-title").text.strip()
        
        # Determine base type
        base_type = ""
        if "TRUE / FALSE / NOT GIVEN" in title: base_type = "true-false"
        elif "YES / NO / NOT GIVEN" in title: base_type = "true-false"
        elif "ONE WORD" in title or "TWO WORDS" in title: base_type = "fill-blank"
        elif "Which paragraph" in title: base_type = "matching"
        elif "Match the bird" in title: base_type = "matching"
        elif "Complete the sentence" in title: base_type = "matching"
        elif "Choose the correct letter" in title: base_type = "multiple-choice"
        else: base_type = "unknown"
        
        # Extract questions
        qs = group.find_all("div", class_="question")
        if qs:
            for q in qs:
                q_id = int(q["data-question"])
                text_elem = q.find("div", class_="question-text")
                text = text_elem.text.strip() if text_elem else ""
                if not text:
                    # Sometimes text is implied, e.g. "32. The usual business environment …"
                    pass
                
                # Check for options
                options = []
                labels = q.find_all("label")
                if labels:
                    for l in labels:
                        # For true/false or multichoice
                        ipt = l.find("input")
                        if ipt and ipt.get("type") == "radio":
                            val = ipt.get("value")
                            if val:
                                if base_type == "multiple-choice":
                                    options.append(f"{val}: {l.text.strip().replace(val+'. ', '').strip()}")
                                else:
                                    options.append(val)
                selects = q.find_all("select")
                if selects:
                    for s in selects:
                        opts = [o.text.strip() for o in s.find_all("option") if o.text.strip() and o.text.strip() != "Select"]
                        if opts:
                            options.append(opts)
                
                # Correct Answer
                ans = answers[q_id]
                ans_idx = ans
                if base_type in ["true-false", "multiple-choice"]:
                    if options and isinstance(options[0], list): options = options[0]
                    # Find index
                    if options:
                        for idx, opt in enumerate(options):
                            if opt.startswith(ans) or opt == ans:
                                ans_idx = idx
                                break
                            
                q_obj = {
                    "id": q_id,
                    "type": base_type,
                    "text": text,
                    "options": options if base_type != "fill-blank" and options else None,
                    "correctAnswer": ans_idx if base_type in ["true-false", "multiple-choice"] else ans
                }
                questions_ts.append(q_obj)
        else:
            # Maybe it's paragraph embedded inputs
            # e.g. <span class="question-text">7</span> <input type="text" name="q7" maxlength="30">
            inputs = group.find_all("input", type="text")
            for ipt in inputs:
                name = ipt.get("name")
                if name and name.startswith("q"):
                    q_id = int(name[1:])
                    ans = answers[q_id]
                    # Try to extract context text
                    parent = ipt.parent
                    text = parent.text.strip()
                    # Clean up
                    text = re.sub(r'\\s+', ' ', text)
                    q_obj = {
                        "id": q_id,
                        "type": "fill-blank",
                        "text": text,
                        "correctAnswer": ans
                    }
                    questions_ts.append(q_obj)
                
            # Or selects embedded 
            selects = group.find_all("select")
            if selects and not qs:
                for s in selects:
                    name = s.get("name")
                    if name and name.startswith("q"):
                        q_id = int(name[1:])
                        ans = answers.get(q_id, "?")
                        opts = [o.text.strip() for o in s.find_all("option") if o.text.strip() and o.text.strip() != "Select"]
                        q_obj = {
                            "id": q_id,
                            "type": "matching",
                            "text": f"Question {q_id}",
                            "options": opts,
                            "correctAnswer": ans
                        }
                        questions_ts.append(q_obj)

# Manually fix a few questions
# Q32-Q35 have no inner .question-text but are inside group
q32_text = "The usual business environment …"
q33_text = "Geroski and Markides's book …"
q34_text = "Microsoft is an example of a company which …"
q35_text = "The origin of useful accidents …"
q32_35_opts = ["A", "B", "C", "D", "E", "F", "G", "H"]

# Generate Typescript
ts_out = f"""import {{ ReadingTest }} from "./reading-tests";

const p1: ReadingTest = {{
    id: "mock-1-p1",
    title: "The Clipper Races: an era of competition between cargo ships",
    timeLimit: 1200,
    content: `{passages[0].replace('`', '\\`')}`,
    questions: [
        // Manually place Q1-13 here based on {json.dumps(questions_ts[:13])}
    ]
}};

const p2: ReadingTest = {{
    id: "mock-1-p2",
    title: "Orientation of birds",
    timeLimit: 1200,
    content: `{passages[1].replace('`', '\\`')}`,
    questions: [
        // Manually place Q14-26 here
    ]
}};

const p3: ReadingTest = {{
    id: "mock-1-p3",
    title: "The role of accidents in business",
    timeLimit: 1200,
    content: `{passages[2].replace('`', '\\`')}`,
    questions: [
        // Manually place Q27-40 here
    ]
}};

const full: ReadingTest = {{
    id: "mock-test-1-reading",
    title: "IELTS Reading Mock Test 1",
    timeLimit: 3600,
    passages: [
        {{
            id: "p1",
            title: "Passage 1: The Clipper Races: an era of competition between cargo ships",
            content: p1.content!,
            questionRange: {{ start: 1, end: 13 }}
        }},
        {{
            id: "p2",
            title: "Passage 2: Orientation of birds",
            content: p2.content!,
            questionRange: {{ start: 14, end: 26 }}
        }},
        {{
            id: "p3",
            title: "Passage 3: The role of accidents in business",
            content: p3.content!,
            questionRange: {{ start: 27, end: 40 }}
        }}
    ],
    questions: [
        ...p1.questions,
        ...p2.questions,
        ...p3.questions,
    ]
}};

export const mockTest1Reading: ReadingTest[] = [p1, p2, p3, full];
"""

with open("parse_jurabek.py", "w", encoding="utf-8") as f:
    f.write(ts_out)
    
with open("questions.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(questions_ts, indent=2))
