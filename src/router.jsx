import { useEffect, useState } from "react";
import { RouterContext } from "./router-context";

export function Router({ children }) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to) => {
    if (to === path) return;
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function Link({ to, children, ...rest }) {
  return (
    <RouterContext.Consumer>
      {({ navigate }) => (
        <a
          href={to}
          onClick={(e) => {
            if (e.defaultPrevented) return;
            e.preventDefault();
            navigate(to);
          }}
          {...rest}
        >
          {children}
        </a>
      )}
    </RouterContext.Consumer>
  );
}