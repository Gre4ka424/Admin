import { Outlet } from 'react-router-dom';
import './app.css';

export default function Root() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
