const inspectCart = async (id) => {
  console.log(`/api/carts/${id}`);
  location.href = `/api/carts/${id}`;
};

const removeProductsCart = async (id) => {
  await fetch(`/api/carts/${id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      location.reload();
    });
};

const addProductToCart = async (cid, pid) => {
  await fetch(`/api/carts/${cid}/products/${pid}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      location.assign(`/api/carts/${cid}`);
    });
};

const removeProductCart = async (cid, pid) => {
  await fetch(`/api/carts/${cid}/products/${pid}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      location.reload();
    });
};

const toGithubLogin = () => {
  location.replace("/api/sessions/github");
};

const toRegister = () => {
  location.replace("/api/auth/register");
};

const logout = () => {
  location.replace("/api/auth/logout");
};

const createCart = async ( uid ) => {
  await fetch(`/api/user/addCart/${uid}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      location.reload();
    });
};