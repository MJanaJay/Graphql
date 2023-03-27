// export function sortData(data) {
//     let skills = {}
//     data.forEach(skill => {
//       if (!!skills[skill.type]) {
//           skills[skill.type] = {
//             name: skill.type,
//             skill_points: skill.amount + skills[skill.type].skill_points
//           }
    
//       } else {
//           skills[skill.type] = {
//             name: skill.type,
//             skill_points: skill.amount
//           }
//       }
//     });
//     return Object.values(skills);
// }
export function sortData(data) {
  const skills = {};
  data.forEach((skill) => {
    if (!!skills[skill.type]) {
      skills[skill.type].skill_points += skill.amount;
    } else {
      skills[skill.type] = {
        name: skill.type,
        skill_points: skill.amount,
      };
    }
  });

  const sortedSkills = Object.values(skills).sort((a, b) => b.skill_points - a.skill_points);
  const topSkills = sortedSkills.slice(0, 5); // Get the top 5 skills

  return topSkills;
}