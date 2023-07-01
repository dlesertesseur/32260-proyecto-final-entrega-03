const inspectCart = async (id) => {
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
      console.log("addProductToCart -> ", data);
      if (data?.status && data?.status !== "created") {
        location.assign(`/api/carts/error/1`);
      } else {
        location.assign(`/api/carts/${cid}`);
      }
    })
    .catch((err) => {
      console.log("################", err);
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

const toLogin = () => {
  location.replace("/api/auth/login");
};

const toResetPassword = () => {
  location.replace("/api/auth/resetpassword");
};

const toBack = () => {
  history.back();
};

const createCart = async (uid) => {
  await fetch(`/api/users/addCart/${uid}`, {
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

const changeRole = async (uid) => {
  await fetch(`/api/users/premium/${uid}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("changeRole data -> ", data);
      if (data.status === "error") {
        const errorPanel = document.getElementById("errorPanel");
        const errorPanelText = document.getElementById("errorPanelText");
        const errorPanelDetail = document.getElementById("errorPanelDetail");
        errorPanel.visiblity = "visible";
        errorPanelText.innerHTML = data.message;
        // errorPanelDetail.innerHTML = `<ul>${data.unloadDocs.map((d) => {
        //   return(`<li>${d}</li>`)})}</ul>`;

        let list = "Unload documents:<br/><ul>"; 
        data.unloadDocs.forEach(d => {
          list += `<li>${d}</li>`;
        });
        list += "</ul>";
        errorPanelDetail.innerHTML=list;
      } else {
        location.reload();
      }
    })
    .catch((err) => {
      console.log("changeRole err -> ", err);
    });
};

const purchase = async (cid) => {
  await fetch(`/api/carts/${cid}/purchase`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      location.reload();

      // const url = location.href + "/tickets/" + data.ticket.id;
      // location.assign(url);
    });
};

const uploadDocumentsPage = () => {
  location.assign("/api/users/documents");
};
