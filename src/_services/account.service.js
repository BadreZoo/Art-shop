
import axiosInstance from "../api/axiosInstance";

let login = (dataLogin) => {
  return axiosInstance.post("/login", dataLogin); //requete post vers le back
};

let profile = () => {
  const jwt = localStorage.getItem("token");
  return axiosInstance.get("/profile", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};


let saveToken = (token) => {
  localStorage.setItem("token", token); //servir a enregistrer le token il recois le token en argument,ca va le mettre dans le localstorage
};

let logout = () => {
  localStorage.removeItem("token"); // va servir a suprrimer le token ce qui va faire en sorte de deconecter
};

let isLogged = () => {
  let token = localStorage.getItem("token"); //permet de savoir si on est logged ou pas, il recupere le token qui est dans le localstorage
  return !!token; /* !!=qui permet de transformer nimporte quel variable en booléen*/
  // si il nya pas de token dans le localstorag ca va renvoyer null, mais ca va return false avec le return !!token,
  //au cas contraire si il trouve un token dans le localStorage ca va return true
};

let getToken = () => {
  return localStorage.getItem("token");
};

export const accountService = {
  login,
  profile,
  saveToken,
  logout,
  isLogged,
  getToken,

};
