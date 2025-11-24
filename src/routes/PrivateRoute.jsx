import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GADJEDTARIUM_LOGIN_INFO } from "../utils/constants/fetch";

const PrivateRoute = ({ Component, roles = [], fallbackPath = "/" }) => {
  const { isAuthenticated, data } = useSelector((state) => state.auth);

  // Получаем данные о пользователе из redux или localStorage
  const localData = JSON.parse(localStorage.getItem(GADJEDTARIUM_LOGIN_INFO));
  const role = data?.role || localData?.role;

  // Проверяем доступ
  const hasAccess = useMemo(() => {
    if (!roles.length) return true;
    if (!role) return false;
    return roles.map((r) => r.toUpperCase()).includes(role.toUpperCase());
  }, [role, roles]);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warn("Вы не авторизованы");
    } else if (!hasAccess) {
      toast.error("У вас нет доступа к этой странице");
    }
  }, [isAuthenticated, hasAccess]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!hasAccess) {
    return <Navigate to={fallbackPath} replace />;
  }

  return Component;
};

export default PrivateRoute;
