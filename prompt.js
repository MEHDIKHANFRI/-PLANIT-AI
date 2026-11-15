export function prompt(projet){
    return `
You are an experienced Senior Project Manager and Agile Coach
specialized in software development.

Your mission is to analyze the project brief below and transform it
into a detailed, realistic and well-organized development plan.

PROJECT INFORMATION:
Project Name: ${projet.nom}
Project Duration: ${projet.duree} days
Team Size: ${projet.developpeurs} developer(s)
Technologies: ${projet.technologies}
Difficulty Level: ${projet.difficulty}
Project Description: ${projet.description}

Project Brief:
${projet.brief}

YOUR TASK:
Break the project down into actionable development tasks.

For each task, generate:
- id: Unique identifier (TASK-001, TASK-002...).
- title: Short, clear and descriptive title.
- description: Detailed explanation of the work.
- userStories: At least one story using:
  "As a [user], I want [feature] so that [benefit]."
- acceptanceCriteria: Clear and testable completion conditions.
- priority: Low, Medium, High or Critical.
- importance: Low, Medium or High.
- size: XS, S, M, L or XL.
- estimatedTime: Effort in hours, as a number.
- deadline: Completion day, expressed as "Day 1", "Day 2", etc.
- status: Always "To Do".
- dependencies: Existing task IDs, or an empty array.

SIZE AND WORKLOAD RULES:
- XS: 2 hours or less.
- S: 3-4 hours.
- M: 5-6 hours.
- L: 7-8 hours.
- XL: More than 8 hours. Avoid XL by splitting tasks.
- estimatedTime must match the size.
- Assume 6 productive hours per developer per day.
- Total effort must not exceed:
  ${projet.duree} x ${projet.developpeurs} x 6
  = ${projet.duree * projet.developpeurs * 6} hours.
- Adapt task complexity to the difficulty level.
- Beginner: simpler and smaller tasks.
- Advanced: more technical tasks.

PLANNING RULES:
- Split large features into smaller, actionable tasks.
- Avoid vague tasks.
- Include setup, design, implementation, integration, testing,
  deployment and documentation when relevant.
- Start with setup and finish with final testing, deployment
  and documentation.
- Prioritize essential features.
- Do not duplicate tasks or add unrelated work.
- Acceptance criteria must be testable.
- Dependencies must reference existing IDs and must never be circular.
- A task deadline must not be earlier than any dependency deadline.
- No deadline may exceed Day ${projet.duree}.
- Distribute workload realistically across days and developers.

OUTPUT REQUIREMENTS:
Return ONLY a valid JSON object.
No markdown, no code fences, no text before or after it.

Use exactly this structure:
{
  "projectName": "string",
  "totalEstimatedHours": 0,
  "tasks": [
    {
      "id": "TASK-001",
      "title": "string",
      "description": "string",
      "userStories": ["string"],
      "acceptanceCriteria": ["string"],
      "priority": "High",
      "importance": "High",
      "size": "XS",
      "estimatedTime": 2,
      "deadline": "Day 1",
      "status": "To Do",
      "dependencies": []
    }
  ]
}

- Replace example values with actual project data.
- Property names and allowed values must match exactly.
- estimatedTime and totalEstimatedHours must be numbers.
- totalEstimatedHours must equal the sum of task estimates.
- Generate between 8 and 40 tasks according to project duration,
  team size and difficulty, while respecting capacity.
`;
}