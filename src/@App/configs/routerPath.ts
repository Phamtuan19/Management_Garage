import ROLES from './role';

interface RoutePathPropsType {
   [key: string]: {
      path: string;
      role: string[];
   };
}

const routePath: RoutePathPropsType = {
   home: {
      path: '/',
      role: [ROLES[2]],
   },
   login: {
      path: 'sign-in',
      role: [ROLES[2]],
   },
   register: {
      path: 'register',
      role: [ROLES[2]],
   },
};

export default routePath;
