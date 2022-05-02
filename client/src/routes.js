import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage";
import DetailPage from "./pages/DetailPage";
import CreatePage from "./pages/CreatePage";
import PostsPage from "./pages/PostsPage";

export const useRoutes = isAuth => {
    if (isAuth) {
        return (

            <Routes>

                {/*<Route path="links" />*/}

                <Route
                    path="create"
                    element={<CreatePage />} />

                <Route
                    path="posts"
                    element={<PostsPage />} />

                <Route
                    path="detail/:id/"
                    element={<DetailPage />} />

                <Route
                    path='*'
                    element={<Navigate to="create" element={<CreatePage />}  />} />

            </Routes>

            )
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route
                path='*'
                element={<Navigate to="/" element={<AuthPage />}  />} />
        </Routes>
    )
}