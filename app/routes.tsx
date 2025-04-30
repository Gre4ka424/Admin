import React from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';
import AdminLayout from './routes/admin';
import AdminUsers from './routes/admin.users';
import AdminContent from './routes/admin.content';
import UserProfile from './routes/profile';
import EventsPage from './routes/events';
import CalendarPage from './routes/calendar';
import InterestsPage from './routes/interests';
import GroupsPage from './routes/groups';
import AdminDashboard from './routes/admin.dashboard';
import AdminGroups from './routes/admin.groups';
import AdminEvents from './routes/admin.events';
import AdminProfiles from './routes/admin.profiles';

export const routes = createRoutesFromElements(
  <>
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="profiles" element={<AdminProfiles />} />
      <Route path="groups" element={<AdminGroups />} />
      <Route path="events" element={<AdminEvents />} />
      <Route path="content" element={<AdminContent />} />
      <Route path="stats" element={<div>Statistics coming soon...</div>} />
    </Route>
    <Route path="/profile" element={<UserProfile />} />
    <Route path="/interests" element={<InterestsPage />} />
    <Route path="/groups" element={<GroupsPage />} />
    <Route path="/events" element={<EventsPage />} />
    <Route path="/calendar" element={<CalendarPage />} />
  </>
); 