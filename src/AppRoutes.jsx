import React, { useContext, useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// import AllTraining from "./pages/AllTraining";
// import EmployeeTraining from "./pages/EmployeeTraining";
// import AllFuncionarios from "./pages/AllFuncionarios";
// import NotFound from "./pages/NotFound";
// import Login from "./pages/Login";

import { AuthProvider, AuthContext } from "./contexts/auth";
import IconSpinner from './componentes/Spinner';

const AllTraining = lazy(() => import('./pages/AllTraining'));
const EmployeeTraining = lazy(() => import('./pages/EmployeeTraining'));
const AllFuncionarios = lazy(() => import('./pages/AllFuncionarios'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));


const AppRoutes = () => {

    const [itensPerPage, setItensPerPage] = useState(2);//itens que aparecem na página
    const [itensPerPageTreina, setItensPerPageTreina] = useState(2);//itens que aparecem na página


    useEffect(() => {



    }, [itensPerPage, itensPerPageTreina]);

    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        // console.log(itensPerPage)


        if (loading) {
            return <IconSpinner />
        }

        if (!authenticated) {
            return <Navigate to="/login" />;
        }

        return children;

    }


    // user != null
    // authenticated = true

    // user === null
    // authenticated = false

    const renderLoader = () => <p>Carregando...</p>;

    class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false };
        }

        static getDerivedStateFromError(error) {
            return { hasError: true };
        }

        render() {
            if (this.state.hasError) {
                return <p>Falha ao carregar. Por favor atualize a página</p>;
            }

            return this.props.children;
        }
    }



    return (
        <ErrorBoundary>
            <Suspense fallback={renderLoader()}>
                <Router>
                    <AuthProvider>
                        <Routes>
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/" element={<Private><AllTraining itensPerPageTreina={itensPerPageTreina} setItensPerPageTreina={setItensPerPageTreina} /></Private>} />
                            <Route exact path="/treinamentos" element={<Private><AllTraining itensPerPageTreina={itensPerPageTreina} setItensPerPageTreina={setItensPerPageTreina} /></Private>} />
                            <Route exact path="/funcionarios" element={<Private><AllFuncionarios itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} /></Private>} />
                            <Route exact path="/funcionario/:id" element={<Private><EmployeeTraining /></Private>} />
                            <Route path='*' element={<Private><NotFound /></Private>} />
                        </Routes>
                    </AuthProvider>
                </Router>
            </Suspense>
        </ErrorBoundary>
    )
}

export default AppRoutes
