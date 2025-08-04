import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({ user, setUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInEmail = localStorage.getItem("email");
        setUser(loggedInEmail);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{ color: "gold" }}>
                    <FontAwesomeIcon icon={faVideoSlash} /> Gold
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        {user && <NavLink className="nav-link" to="/watchList">Watch List</NavLink>}
                    </Nav>
                    {!user ? (
                        <>
                            <Button variant="outline-info" className="me-2" onClick={() => navigate("/login")}>
                                Login
                            </Button>
                            <Button variant="outline-info" onClick={() => navigate("/register")}>
                                Register
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline-danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;