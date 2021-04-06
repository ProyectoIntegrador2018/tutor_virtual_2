export function setUserRoleFromTab(idx: number) {
  switch (idx) {
    case 0:
      return "SUPERADMIN";
    case 1:
      return "SUPERVISOR";
    case 2:
      return "TUTOR";
    case 3:
      return "ALLY";
    default:
      return "SUPERVISOR";
  }
}
