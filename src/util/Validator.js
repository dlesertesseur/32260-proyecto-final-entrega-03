import config from "../config/config.js";

function getRoleByUser(user) {
  let role = null;

  try {
    if (
      user.email === config.ADMIN_EMAIL &&
      user.password === config.ADMIN_PASSWORD
    ) {
      role = config.ROLE_ADMIN;
    } else {
      role = config.USER_ROLE;
    }
  } catch (error) {
    console.log(error);
    role = config.USER_ROLE;
  }

  return role;
}

export {getRoleByUser}
