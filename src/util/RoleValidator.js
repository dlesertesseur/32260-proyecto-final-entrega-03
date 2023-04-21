import config from "../config/config.js";

function getRoleByUser(user) {
  let role = null;

  try {
    if (
      user.email === config.ADMIN_EMAIL &&
      user.password === config.ADMIN_PASSWORD
    ) {
      role = "admin";
    } else {
      role = "user";
    }
  } catch (error) {
    console.log(error);
    role = "user";
  }

  return role;
}

export {getRoleByUser}
