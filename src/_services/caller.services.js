import axios from "axios";
import { accountService } from "./account.service";

const axiosInstanceProfile = axios.create({
  baseURL: "https://artshopback.up.railway.app",
});

// Intercepteur pour la mise en place du token dans la requête
axiosInstanceProfile.interceptors.request.use((request) => {
  if (accountService.isLogged()) {
    console.log("Token récupéré :", token); // Vérifiez que le token est correctement récupéré
    request.headers.Authorization = "Bearer " + accountService.getToken();
  }

  console.log("Intercepteur activé"); // Affiche un message lorsque l'intercepteur est déclenché

  return request;
});


