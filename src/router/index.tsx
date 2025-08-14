import { SignIn } from "../pages/auth/signIn/singnIn";
import { SignUp } from "../pages/auth/signUp/signUp";
import Dashboard from "../components/dashboard/dashboard";
import type { IRoutes } from "../utils/interface/routes.interface";
import { HomePage } from "../pages/home/home-page";
import QuestionCreate from "../pages/questions/create-question/create-question";
import { GetAllQuestions } from "../pages/questions/get-all-questions/get-all-questions";
import GetOneQuestion from "../pages/questions/get-one-question/get-one-question";
import EditQuestion from "../pages/questions/edit-question/edit-question";
import TestPage from "../pages/Test/test-page";
import ResultPage from "../pages/result/result-page";
import { AdminRoute } from "../utils/redirect/admin.role.redirect";

export const routes: IRoutes[] = [
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/signIn",
      element: <SignIn />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "home",
          element: <HomePage />,
        },
        {
            path: "question/create",
            element: <AdminRoute element={<QuestionCreate />} />,
          },
          {
            path: "question/edit/:id",
            element: <AdminRoute element={<EditQuestion />} />,
          },
          {
            path: "question/get",
            element: <AdminRoute element={<GetAllQuestions />} />,
          },
          {
            path: "question/get/:id",
            element: <AdminRoute element={<GetOneQuestion />} />,
          },
        {
            path:"test",
            element:<TestPage/>
        }
      ],
    },
    {
        path:"result",
        element:<ResultPage/>
    }
  ];
  

  
