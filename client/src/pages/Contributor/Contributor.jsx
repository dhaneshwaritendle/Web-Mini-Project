import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getToken } from "../../utils/auth";
import { Link, useRouteLoaderData } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import Alert from "../../components/Alert";
import axios from "axios";

function Contributor() {

    const [displayAlert, setDisplayAlert] = useState(false);

    useEffect(() => {

        const user = localStorage.getItem('user');
        const username = JSON.parse(user).username;
        
        axios.get(`http://localhost:5000/api/contributor/${username}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }
        })
        .then((response) => {
            // console.log(response.data);
            const data = response.data;
            if (data.status === 'error' && data.message === 'Contributor not found') {
                setDisplayAlert(true);
                localStorage.setItem('isProfileComplete', false);
            } else if (data.status === 'ok') {
                setDisplayAlert(false);
                localStorage.setItem('isProfileComplete', true);
                localStorage.setItem('profileData', JSON.stringify(data.data));
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, [])

    const { isAuthenticated } = useRouteLoaderData('contributor');

    if (!isAuthenticated) {
        return (<div></div>);
    }

    return (
        <>
        <main id="main" className="main">
            <PageTitle title="Dashboard" />
            { displayAlert && <Alert message="complete your profile!" link="create_profile" link_text="click here to create profile" /> }
            {
                !displayAlert && (
                <>
                    <section class="section dashboard">
                        <div class="row">
                            
                        <div class="col-lg-8">
                            <div class="row">

                            <div class="col-xxl-20 col-md-">
                            <div class="card info-card sales-card">

                                <div class="card-body"><Link to="">
                                <h5 class="card-title">Get started with contributions</h5>

                                <div class="d-flex align-items-center">
                                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <Link to="create_course"><i class='fas fa-plus' style={{fontSize:'36px'}}></i></Link>
                                    </div>
                                    <div class="ps-3">
                                    <h6>  </h6>
                                    <span class="text-success small pt-1 fw-bold"></span> <span class="text-muted small pt-2 ps-1"></span>

                                    </div>
                                </div></Link>
                                </div>

                            </div>
                            </div>


                        <div class="col-xxl-20 col-md-">
                        <div class="card info-card sales-card">

                            <div class="card-body"><Link to="">
                            <h5 class="card-title">Review and rate others contribution </h5>

                            <div class="d-flex align-items-center">
                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">

                                <i class="fa fa-star checked"></i>
                                <span ></span>


                                </div>
                                <div class="ps-3">
                                <h6>  </h6>
                                <span class="text-success small pt-1 fw-bold"></span> <span class="text-muted small pt-2 ps-1"></span>

                                </div>
                            </div></Link>
                            </div>

                        </div>
                        </div>
                        </div>

                        <div class="col-lg-8">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">My Contributions</h5>
                                        <div class="card mb-3">
                                            <div class="row g-0">
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>

                        </div>

                        </div>
                        </section>
                </>
                )
            }
        </main>
        </>
    );
}

export default Contributor;

export async function loader({ request }) {
    const token = await getToken();
    // console.log('token:', token);

    if (token === 'EXPIRED') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expiration');
        window.location.href = '/login';
        return { isAuthenticated: false };
    }

    if (token !== null && token !== undefined) {
        const user = jwtDecode(token);
        // console.log('user:', user);
        if (user) {
            if (user.role === 'CONTRIBUTOR') {
                return { isAuthenticated: true };
            }
        }
    }
    window.location.href = '/login';
    return { isAuthenticated: false };
}