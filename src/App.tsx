import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import NewUsers from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyle from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to={"dashboard"} />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="accounts" element={<Account />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<NewUsers />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
export default App;
