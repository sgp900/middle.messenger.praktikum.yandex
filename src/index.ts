import { Block } from "./utils/block";
import { Login } from "./pages/Login/login";
import { Registration } from "./pages/Registration/registration";
import { ProfilePage } from "./pages/Profile/profile";
import { ProfileEditPage } from "./pages/ProfileEdit/profileEdit";
import { ChangePasswordPage } from "./pages/ChangePassword/changePassword";
import Router from "./utils/router";
import AuthController from "./controllers/AuthController";
import { Messenger } from "./pages/Messenger/messenger";
import { ErrorPage } from "./pages/ErrorPage/errorPage";
import "./scss/style.scss";

enum Routes {
  Index = "/",
  Register = "/register",
  Profile = "/profile",
  ProfileEdit = "/profile/edit",
  PasswordChange = "/profile/password",
  Main = "/messenger",
  E404 = "/404",
  E500 = "/500",
}

document.addEventListener("DOMContentLoaded", async () => {
  Router.use(Routes.Index, Login as typeof Block)
    .use(Routes.Register, Registration as typeof Block)
    .use(Routes.Profile, ProfilePage as typeof Block)
    .use(Routes.ProfileEdit, ProfileEditPage as typeof Block)
    .use(Routes.PasswordChange, ChangePasswordPage as typeof Block)
    .use(Routes.Main, Messenger as typeof Block)
    .use(Routes.E404, ErrorPage as typeof Block, {
      code: "404",
      text: "Не туда попали",
    })
    .use(Routes.E500, ErrorPage as typeof Block, {
      code: "500",
      text: "Мы уже фиксим",
    });

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    if (!isProtectedRoute) {
      Router.start(true);
      Router.go(Routes.Main);
    } else {
      Router.start();
    }
  } catch (a) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
