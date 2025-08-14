import { Route, Routes } from 'react-router-dom';
import { routes } from './router';
import { AuthRedirect } from './utils/redirect/auth.redirect';


function App() {


  return (
    <>
    <AuthRedirect/>
      <Routes>
  {routes.map((element, index) => (
    <Route key={index} path={element.path} element={element.element}>
      {element.children?.map((child, childIndex) => (
        <Route
          key={childIndex}
          path={child.path}
          element={child.element}
        >
          {child.children?.map((subChild, subIndex) => (
            <Route
              key={subIndex}
              index={!subChild.path}
              path={subChild.path}
              element={subChild.element}
            />
          ))}
        </Route>
      ))}
    </Route>
  ))}
</Routes>

    </>
  );
}


export default App
