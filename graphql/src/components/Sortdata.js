export function sortData(data) {
    let skills = {}
    data.forEach(skill => {
      if (!!skills[skill.type]) {
          skills[skill.type] = {
            name: skill.type,
            skill_points: skill.amount + skills[skill.type].skill_points
          }
    
      } else {
          skills[skill.type] = {
            name: skill.type,
            skill_points: skill.amount
          }
      }
    });
    return Object.values(skills);
}